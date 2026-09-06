import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = 'https://frenzyinteriors.com';

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/services',
    '/products',
    '/portfolio',
    '/gallery',
    '/blog',
    '/faq',
    '/privacy-policy',
    '/terms-conditions',
    '/disclaimer',
    '/cookie-policy',
    '/refund-policy',
    '/service-policy',
    '/advertising-disclosure',
    '/editorial-policy',
    '/community-guidelines',
    '/accessibility',
    '/sitemap',
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map((page) => `  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
