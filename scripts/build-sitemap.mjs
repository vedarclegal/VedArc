import { writeFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE = 'https://vedarclegal.in';
const programs = JSON.parse(
  readFileSync(resolve(process.cwd(), 'src/content/programs.json'), 'utf8'),
);

const routes = [
  '/',
  '/about',
  '/programs',
  '/partnerships',
  '/contact',
  '/legal/terms',
  '/legal/privacy',
  '/legal/refund',
  '/legal/cookies',
  ...programs.map((p) => `/programs/${p.slug}`),
];

const today = new Date().toISOString().split('T')[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE}${r}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${r === '/' ? '1.0' : '0.7'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(process.cwd(), 'dist/sitemap.xml'), xml);
console.log('Wrote sitemap.xml with', routes.length, 'routes');
