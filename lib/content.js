import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const CONTENT_DIR = path.join(process.cwd(), 'content');

function readJson(relativePath) {
  const fullPath = path.join(CONTENT_DIR, relativePath);
  const raw = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(raw);
}

function readCollection(collectionName) {
  const dir = path.join(CONTENT_DIR, collectionName);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  const items = files.map((filename) => {
    const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
    const { data, content } = matter(raw);
    return { ...data, body: content, filename };
  });
  return items;
}

export async function markdownToHtml(markdown) {
  const result = await remark().use(remarkHtml).process(markdown || '');
  return result.toString();
}

export function getSiteSettings() {
  return readJson('site/settings.json');
}

export function getHomeContent() {
  return readJson('site/home.json');
}

export function getQuienesSomosContent() {
  return readJson('site/quienes-somos.json');
}

export function getFaqContent() {
  return readJson('site/faq.json');
}

export function getContactoContent() {
  return readJson('site/contacto.json');
}

export function getPracticeAreas() {
  return readCollection('practice-areas').sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getPracticeAreaBySlug(slug) {
  return getPracticeAreas().find((item) => item.slug === slug) || null;
}

export function getCaseStudies() {
  return readCollection('case-studies').sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getCaseStudyBySlug(slug) {
  return getCaseStudies().find((item) => item.slug === slug) || null;
}

export function getBlogPosts() {
  return readCollection('blog').sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getBlogPostBySlug(slug) {
  return getBlogPosts().find((item) => item.slug === slug) || null;
}

export function getBlogCategories() {
  const posts = getBlogPosts();
  const categories = new Set(posts.map((post) => post.category).filter(Boolean));
  return Array.from(categories);
}
