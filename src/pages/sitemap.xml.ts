import { getCollection } from 'astro:content';
import { siteConfig } from '../config/site';

export async function GET() {
  const pages = await getCollection('pages', ({ data }) => !data.draft);
  const activities = await getCollection('activities', ({ data }) => !data.draft);

  const urls = new Set([
    '',
    'faaliyetler/',
    ...pages.map((page) => `${page.slug}/`),
    ...activities.map((item) => `faaliyetler/${item.slug}/`)
  ]);

  const now = new Date().toISOString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(urls)
  .map((path) => {
    const loc = new URL(`/${path}`, siteConfig.url).toString();
    return `<url><loc>${loc}</loc><lastmod>${now}</lastmod></url>`;
  })
  .join('')}
</urlset>`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
