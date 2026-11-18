import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import { ArticleCard } from './article-card';

const TEASER_SLUGS = ['the-truth-about-iron', 'why-toddlers-stop-eating', 'why-we-built-adore'];

export function BlogTeaser() {
  const all = getAllArticles();
  const picks = TEASER_SLUGS.map((s) => all.find((a) => a.slug === s)).filter((a) => a !== undefined);

  return (
    <section aria-labelledby="journal-title" className="bg-bg-warm py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="journal-title" className="display-lg text-ink">
            From the <span className="accent">journal</span>
          </h2>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-peach-700 underline decoration-peach-300 decoration-2 underline-offset-[6px] transition-colors hover:decoration-peach-600"
          >
            Read all stories
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {picks.map((a) => (
            <li key={a.slug}>
              <ArticleCard article={{ ...a, published: undefined }} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
