import fs from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { execFile } from 'node:child_process';

const exec = promisify(execFile);

const SOURCE_DIR = path.join(process.cwd(), 'Sunum - Merkez Birliği');
const OUTPUT_IMG_DIR = path.join(process.cwd(), 'public', 'assets', 'presentation');
const ACTIVITIES_DIR = path.join(process.cwd(), 'src', 'content', 'activities');
const REVIEW_PATH = path.join(process.cwd(), 'content', 'ocr_review.md');

const ensureDirs = async () => {
  await fs.mkdir(OUTPUT_IMG_DIR, { recursive: true });
  await fs.mkdir(ACTIVITIES_DIR, { recursive: true });
  await fs.mkdir(path.dirname(REVIEW_PATH), { recursive: true });
};

const naturalSort = (a, b) => {
  const numA = parseInt(a.match(/(\d+)/)?.[0] || '0', 10);
  const numB = parseInt(b.match(/(\d+)/)?.[0] || '0', 10);
  return numA - numB;
};

const ocrImage = async (filePath) => {
  const { stdout } = await exec('tesseract', [filePath, 'stdout', '-l', 'tur+eng', '--psm', '3']);
  return stdout;
};

const normalizeText = (raw) => {
  const lines = raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const joined = lines.join(' ').replace(/\s+/g, ' ').trim();
  return joined;
};

const splitParagraphs = (text) => {
  if (!text) return [];
  const sentences = text.split(/(?<=[.!?])\s+/);
  const paragraphs = [];
  let buffer = [];
  sentences.forEach((sentence) => {
    buffer.push(sentence);
    if (buffer.join(' ').length > 260) {
      paragraphs.push(buffer.join(' '));
      buffer = [];
    }
  });
  if (buffer.length) paragraphs.push(buffer.join(' '));
  if (paragraphs.length === 0 && text) paragraphs.push(text);
  return paragraphs.slice(0, 6);
};

const deriveTitle = (text, index) => {
  if (!text) return `Slayt ${String(index).padStart(2, '0')}`;
  const sentence = text.split(/(?<=[.!?])\s+/)[0];
  if (sentence.length > 6) return sentence.slice(0, 120);
  return `Slayt ${String(index).padStart(2, '0')}`;
};

const deriveSummary = (text) => {
  if (!text) return 'OCR içeriği doğrulama bekliyor.';
  const summary = text.split(/(?<=[.!?])\s+/).slice(0, 2).join(' ');
  return summary.slice(0, 240);
};

const extractDate = (text) => {
  const match = text.match(/(\d{1,2})[./](\d{1,2})[./](\d{2,4})/);
  if (!match) return null;
  let [_, d, m, y] = match;
  if (y.length === 2) y = `20${y}`;
  const iso = `${y.padStart(4, '0')}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  return iso;
};

const deriveTags = (text) => {
  const tags = new Set(['faaliyet', 'sunum']);
  const lower = text.toLowerCase();
  const map = [
    ['eğitim', 'egitim'],
    ['proje', 'proje'],
    ['destek', 'destek'],
    ['finans', 'finans'],
    ['yönetim', 'yonetim'],
    ['temsil', 'temsil'],
    ['birlik', 'birlik'],
    ['arı', 'ari'],
    ['bal', 'bal'],
    ['kooperatif', 'kooperatif']
  ];
  map.forEach(([kw, tag]) => {
    if (lower.includes(kw)) tags.add(tag);
  });
  return Array.from(tags);
};

const processImage = async (sourcePath, baseName) => {
  const large = path.join(OUTPUT_IMG_DIR, `${baseName}-1600.webp`);
  const medium = path.join(OUTPUT_IMG_DIR, `${baseName}-900.webp`);
  await exec('magick', [sourcePath, '-resize', '1600x', '-strip', '-quality', '82', large]);
  await exec('magick', [sourcePath, '-resize', '900x', '-strip', '-quality', '82', medium]);
  return {
    large: `/assets/presentation/${path.basename(large)}`,
    medium: `/assets/presentation/${path.basename(medium)}`
  };
};

const writeActivity = async (meta) => {
  const fm = [
    '---',
    `title: "${meta.title.replace(/"/g, '\\"')}"`,
    meta.date ? `date: ${meta.date}` : '',
    `summary: "${meta.summary.replace(/"/g, '\\"')}"`,
    `tags: [${meta.tags.map((t) => `"${t}"`).join(', ')}]`,
    `source_slide: "${meta.source}"`,
    `featured_image: "${meta.images.large}"`,
    'draft: false',
    '---'
  ]
    .filter(Boolean)
    .join('\n');

  const body = meta.paragraphs.length ? meta.paragraphs.join('\n\n') : '[DOGRULAMA_GEREKLI] İçerik okunamadı.';
  const content = `${fm}\n\n${body}\n`;
  const target = path.join(ACTIVITIES_DIR, `${meta.slug}.md`);
  await fs.writeFile(target, content, 'utf8');
};

const run = async () => {
  await ensureDirs();
  const files = (await fs.readdir(SOURCE_DIR)).filter((f) => f.toLowerCase().endsWith('.png')).sort(naturalSort);
  const review = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const slideNumber = i + 1;
    const slug = `slide-${String(slideNumber).padStart(2, '0')}`;
    const sourcePath = path.join(SOURCE_DIR, file);

    console.log(`OCR ${slug}`);
    let rawText = '';
    try {
      rawText = await ocrImage(sourcePath);
    } catch (err) {
      console.error(`OCR error for ${file}:`, err.message);
    }

    const normalized = normalizeText(rawText);
    const paragraphs = splitParagraphs(normalized);
    const title = deriveTitle(normalized, slideNumber);
    const summary = deriveSummary(normalized);
    const date = extractDate(normalized);
    const tags = deriveTags(normalized);
    const images = await processImage(sourcePath, slug);

    const uncertain = normalized.length < 40 || paragraphs.length === 0;
    if (uncertain) {
      review.push(`- ${slug}: İçerik düşük güven. Özet: "${summary.slice(0, 120)}"`);
    }

    await writeActivity({
      slug,
      title,
      summary,
      date,
      tags,
      source: file,
      images,
      paragraphs: paragraphs.length ? paragraphs : ['[DOGRULAMA_GEREKLI] Metin çıkarımı yetersiz.']
    });
  }

  const reviewLines = ['# OCR Doğrulama Listesi', `- Tarih: ${new Date().toISOString()}`, ''];
  if (review.length === 0) {
    reviewLines.push('- İncelenmesi gereken özel bir slayt yok. Otomatik OCR yeterli görünüyor.');
  } else {
    reviewLines.push('## Kontrol Gereken Slaytlar');
    reviewLines.push(...review);
  }
  await fs.writeFile(REVIEW_PATH, reviewLines.join('\n'), 'utf8');
  console.log(`OCR tamamlandı. ${files.length} slayt işlendi.`);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
