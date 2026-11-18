import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { getAllArticles } from '@/lib/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    ...getAllArticles()
      .filter((a) => a.published)
      .map((a) => ({
        url: `${site.url}/blog/${a.slug}`,
        lastModified: new Date(a.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${site.url}/credits`, lastModified: now, changeFrequency: 'yearly', priority: 0.1 },
    { url: `${site.url}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
