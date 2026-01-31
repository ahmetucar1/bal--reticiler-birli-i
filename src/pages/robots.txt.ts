import { siteConfig } from '../config/site';

export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: ${siteConfig.url}/sitemap.xml
`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
