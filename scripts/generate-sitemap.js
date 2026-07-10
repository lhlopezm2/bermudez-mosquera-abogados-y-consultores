const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bermudezmosquera.example.com';
const OUT_DIR = path.join(process.cwd(), 'out');
const CONTENT_DIR = path.join(process.cwd(), 'content');

function readSlugs(collection) {
  const dir = path.join(CONTENT_DIR, collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

function buildUrls() {
  const staticRoutes = [
    '/',
    '/quienes-somos/',
    '/areas-de-practica/',
    '/casos-de-exito/',
    '/blog/',
    '/preguntas-frecuentes/',
    '/contacto/',
  ];

  const practiceAreas = readSlugs('practice-areas').map((slug) => `/areas-de-practica/${slug}/`);
  const caseStudies = readSlugs('case-studies').map((slug) => `/casos-de-exito/${slug}/`);
  const blogPosts = readSlugs('blog').map((slug) => `/blog/${slug}/`);

  return [...staticRoutes, ...practiceAreas, ...caseStudies, ...blogPosts];
}

function main() {
  const urls = buildUrls();
  const body = urls
    .map((url) => `  <url><loc>${SITE_URL}${url}</loc></url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }
  fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), xml);
  console.log(`Sitemap generado con ${urls.length} URLs en out/sitemap.xml`);
}

main();
