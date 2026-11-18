import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { articles as registry, type ArticleMeta, type CategorySlug } from '@/content/articles';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export type Article = ArticleMeta & { published: boolean };

function readMdxFrontmatter(): Map<string, Partial<ArticleMeta>> {
  const map = new Map<string, Partial<ArticleMeta>>();
  if (!fs.existsSync(BLOG_DIR)) return map;
  for (const file of fs.readdirSync(BLOG_DIR)) {
    if (!file.endsWith('.mdx')) continue;
    const slug = file.replace(/\.mdx$/, '');
    const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, file), 'utf8'));
    map.set(slug, { ...(data as Partial<ArticleMeta>), slug });
  }
  return map;
}

const DEFAULTS: Omit<ArticleMeta, 'slug' | 'title'> = {
  excerpt: '',
  kicker: 'Journal',
  category: 'nutrition-basics',
  readingTime: '5 min read',
  emoji: '🍑',
  tint: 'peach',
  date: new Date(0).toISOString(),
  author: 'The Adore team',
};

/** Every article (registry ∪ MDX files), newest first. */
export function getAllArticles(): Article[] {
  const mdx = readMdxFrontmatter();
  const bySlug = new Map<string, Article>();
  for (const meta of registry) {
    bySlug.set(meta.slug, { ...meta, ...mdx.get(meta.slug), published: mdx.has(meta.slug) });
  }
  for (const [slug, fm] of mdx) {
    if (bySlug.has(slug)) continue;
    bySlug.set(slug, { ...DEFAULTS, title: slug, ...fm, slug, published: true });
  }
  // Published stories first, then newest first.
  return [...bySlug.values()].sort(
    (a, b) => Number(b.published) - Number(a.published) || +new Date(b.date) - +new Date(a.date),
  );
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getFeaturedArticle(): Article | undefined {
  const all = getAllArticles();
  return all.find((a) => a.featured && a.published) ?? all.find((a) => a.published);
}

/** Category filter — stubbed for v1 (the chips link to /blog); wire to ?category= later. */
export function filterArticles(list: Article[], category: CategorySlug = 'all'): Article[] {
  return category === 'all' ? list : list.filter((a) => a.category === category);
}
