import fs from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const START_URL = 'https://www.balmerkezbirligi.org';
const MAX_PAGES = 15;
const DOMAIN = 'balmerkezbirligi.org';

const visited = new Set();
const queue = [START_URL];
const pages = [];
const audit = {
  brokenPages: [],
  missingImages: []
};

const toAbsolute = (href, base) => {
  try {
    return new URL(href, base).toString().split('#')[0];
  } catch (_err) {
    return null;
  }
};

const isInternal = (url) => {
  try {
    const parsed = new URL(url);
    return parsed.hostname.includes(DOMAIN);
  } catch (_err) {
    return false;
  }
};

const extractContacts = ($) => {
  const contacts = [];
  const phonesFromLinks = [];
  const emailsFromLinks = [];
  const text = $.text();

  $('a[href^="tel:"]').each((_, el) => {
    const value = $(el).attr('href').replace('tel:', '').trim();
    if (value) phonesFromLinks.push({ type: 'phone', value });
  });
  $('a[href^="mailto:"]').each((_, el) => {
    const value = $(el).attr('href').replace('mailto:', '').trim();
    if (value) emailsFromLinks.push({ type: 'email', value });
  });

  const phoneMatches = text.match(/\+?\d[\d\s()/-]{6,18}/g);
  if (phoneMatches) {
    phoneMatches.forEach((p) => contacts.push({ type: 'phone', value: p.trim() }));
  }

  const emailMatches = text.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b/gi);
  if (emailMatches) {
    emailMatches.forEach((e) => contacts.push({ type: 'email', value: e.trim() }));
  }

  const normalizePhones = (list) =>
    list
      .map((item) => {
        const digitsOnly = item.value.replace(/\D/g, '');
        if (digitsOnly.startsWith('90') && digitsOnly.length === 12) {
          return { ...item, value: formatPhone(digitsOnly.slice(2)) };
        }
        if (digitsOnly.startsWith('0') && digitsOnly.length === 11) {
          return { ...item, value: formatPhone(digitsOnly.slice(1)) };
        }
        return { ...item, value: formatPhone(digitsOnly) };
      })
      .filter((item) => {
        const digits = item.value.replace(/\D/g, '');
        if (digits.length < 10 || digits.length > 11) return false;
        const startsWell = digits.startsWith('0') || digits.startsWith('90');
        return startsWell;
      });

  const noiseDomains = ['wixpress', 'parastorage', 'sentry'];
  const normalizeEmails = (list) =>
    list.filter((item) => {
      const domain = item.value.split('@')[1]?.toLowerCase() || '';
      return domain && !noiseDomains.some((d) => domain.includes(d));
    });

  const phones = normalizePhones(phonesFromLinks.length ? phonesFromLinks : contacts);
  const emails = normalizeEmails(emailsFromLinks.length ? emailsFromLinks : contacts.filter((c) => c.type === 'email'));

  return dedupeContacts([...phones, ...emails]);
};

const formatPhone = (digits) => {
  const cleaned = digits.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `0${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
  }
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
  }
  return cleaned;
};

const dedupeContacts = (contacts) => {
  const seen = new Set();
  return contacts.filter((item) => {
    const key = `${item.type}:${item.value}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const extractSections = ($) => {
  const sections = [];
  $('h2').each((_, el) => {
    const heading = $(el).text().trim();
    const texts = $(el)
      .parent()
      .find('p, span, li')
      .map((_, node) => $(node).text().trim())
      .get()
      .filter(Boolean);
    const uniqueTexts = Array.from(new Set(texts));
    if (heading || uniqueTexts.length) {
      sections.push({ heading, content: uniqueTexts });
    }
  });

  if (sections.length === 0) {
    const fallback = $('p, span')
      .map((_, p) => $(p).text().trim())
      .get()
      .filter((txt) => txt && txt.length > 15);
    if (fallback.length) sections.push({ heading: 'Genel', content: Array.from(new Set(fallback)) });
  }
  return sections;
};

const extractImages = ($, baseUrl) => {
  const images = [];
  $('img').each((_, el) => {
    const rawSrc = $(el).attr('src') || '';
    const alt = ($(el).attr('alt') || '').trim();
    const src = toAbsolute(rawSrc, baseUrl);
    if (!src) {
      audit.missingImages.push({ baseUrl, src: rawSrc || '[empty src]' });
      return;
    }
    images.push({ src, alt, hasAlt: Boolean(alt) });
    if (!alt) {
      audit.missingImages.push({ baseUrl, src, reason: 'missing alt' });
    }
  });
  return images;
};

const crawl = async () => {
  while (queue.length && pages.length < MAX_PAGES) {
    const current = queue.shift();
    if (!current || visited.has(current)) continue;
    visited.add(current);
    console.log(`Crawling ${current}`);

    let res;
    try {
      res = await fetch(current, {
        headers: { 'User-Agent': 'ContentInventoryBot/1.0' }
      });
    } catch (err) {
      audit.brokenPages.push({ url: current, reason: err.message });
      continue;
    }

    if (!res.ok) {
      audit.brokenPages.push({ url: current, status: res.status });
      continue;
    }

    const html = await res.text();
    const $ = load(html);

    const title = $('title').first().text().trim();
    const h1 = $('h1').first().text().trim() || title;
    const sections = extractSections($);
    const contacts = extractContacts($);
    const images = extractImages($, current);

    pages.push({
      url: current,
      title,
      h1,
      sections,
      contacts,
      images
    });

    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
      const absolute = toAbsolute(href, current);
      if (!absolute || !isInternal(absolute)) return;
      if (!visited.has(absolute) && !queue.includes(absolute)) {
        queue.push(absolute);
      }
    });
  }
};

const writeOutputs = async () => {
  const inventoryPath = path.join(process.cwd(), 'content', 'site_inventory.json');
  await fs.writeFile(inventoryPath, JSON.stringify(pages, null, 2), 'utf8');

  const auditPath = path.join(process.cwd(), 'content', 'audit.md');
  const lines = [];
  lines.push(`# İçerik Taraması Denetimi\n`);
  lines.push(`- Tarih: ${new Date().toISOString()}`);
  lines.push(`- Taranan sayfa sayısı: ${pages.length}`);
  lines.push('');

  lines.push(`## Kırık Sayfa İstekleri`);
  if (audit.brokenPages.length === 0) {
    lines.push('- Kırık sayfa isteği bulunamadı.');
  } else {
    audit.brokenPages.forEach((item) => {
      lines.push(`- ${item.url} (${item.status || item.reason})`);
    });
  }

  lines.push(`\n## Eksik veya Alt Metni Olmayan Görseller`);
  if (audit.missingImages.length === 0) {
    lines.push('- Eksik görsel veya alt metin bulunamadı.');
  } else {
    audit.missingImages.forEach((img) => {
      lines.push(`- ${img.baseUrl} -> ${img.src} ${img.reason ? `(${img.reason})` : ''}`);
    });
  }

  await fs.writeFile(auditPath, lines.join('\n'), 'utf8');
  console.log(`Saved inventory to ${inventoryPath}`);
  console.log(`Saved audit to ${auditPath}`);
};

const ensureContentDir = async () => {
  await fs.mkdir(path.join(process.cwd(), 'content'), { recursive: true });
};

const main = async () => {
  await ensureContentDir();
  await crawl();
  await writeOutputs();
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
