import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { PillBadge } from '@/components/ui/pill-badge';
import { ArticleCard, ArticleCover, tints } from '@/components/article-card';
import { WaitlistForm } from '@/components/waitlist-form';
import { categories } from '@/content/articles';
import { getAllArticles, getFeaturedArticle } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'The Journal',
  description:
    'Honest, warm reading for tired mamas — toddler nutrition, picky eaters, growth and allergies, in plain words.',
  alternates: { canonical: '/blog' },
  openGraph: { url: '/blog', title: 'The Journal · Adore Nutrition' },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export default function JournalPage() {
  const featured = getFeaturedArticle();
  const rest = getAllArticles().filter((a) => a.slug !== featured?.slug);

  return (
    <>
      <Nav />
      <main id="main">
        {/* Header */}
        <section className="relative overflow-hidden pb-12 pt-16 sm:pb-16 sm:pt-24">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_80%_0%,#FCD2B6,rgba(255,233,218,0.5)_50%,transparent_80%)]"
          />
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <PillBadge>The Journal</PillBadge>
            <h1 className="display-xl mt-6 max-w-[820px] text-balance text-ink">
              Honest, warm reading
              <br />
              for <span className="accent">tired mamas</span>.
            </h1>
            <p className="mt-6 max-w-[560px] text-[18px] leading-relaxed text-ink-mid">
              Small, practical reads on feeding your little one — written for the minutes between naps, not for a
              textbook.
            </p>

            {/* Category chips — visual only in v1; each routes to /blog with a ?category= param we'll wire up later. */}
            <nav aria-label="Story categories" className="mt-10">
              <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
                {categories.map((c) => {
                  const active = c.slug === 'all';
                  return (
                    <li key={c.slug} className="shrink-0">
                      <Link
                        href={c.slug === 'all' ? '/blog' : `/blog?category=${c.slug}`}
                        aria-current={active ? 'page' : undefined}
                        className={`inline-flex h-10 items-center rounded-pill px-4 text-[14px] font-semibold transition-colors ${
                          active
                            ? 'bg-ink text-white'
                            : 'bg-white text-ink-mid ring-1 ring-peach-200 hover:bg-peach-100 hover:text-ink'
                        }`}
                      >
                        {c.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </section>

        {/* Featured */}
        {featured && (
          <section aria-label="Featured story" className="mx-auto max-w-6xl px-5 sm:px-8">
            <article className="group relative grid overflow-hidden rounded-xl bg-white shadow-warm ring-1 ring-peach-100 transition-shadow duration-300 hover:shadow-lift md:grid-cols-2">
              <div
                className={`relative flex min-h-[280px] items-center justify-center overflow-hidden ${tints[featured.tint]}`}
              >
                <ArticleCover
                  article={featured}
                  sizes="(min-width: 768px) 560px, 100vw"
                  emojiClass="text-[110px]"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <p className="eyebrow">Featured · {featured.kicker}</p>
                <h2 className="mt-4 font-display text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-[1.1] tracking-tight text-ink">
                  <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0 after:rounded-xl">
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-4 text-[16.5px] leading-relaxed text-ink-mid">{featured.excerpt}</p>
                <p className="mt-6 text-[13px] font-medium text-ink-soft">
                  {formatDate(featured.date)} <span aria-hidden="true">·</span> {featured.readingTime}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-peach-700"
                >
                  Read the story{' '}
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </article>
          </section>
        )}

        {/* Grid */}
        <section aria-labelledby="all-stories" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <h2 id="all-stories" className="display-md text-ink">
            All stories
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        </section>

        {/* Newsletter */}
        <section
          aria-labelledby="newsletter-title"
          className="bg-gradient-to-br from-peach-100 via-peach-200 to-blush py-20"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 id="newsletter-title" className="display-md text-ink">
                New stories <span className="accent">every Sunday</span>.
              </h2>
              <p className="mt-3 max-w-[440px] text-[16.5px] leading-relaxed text-ink-mid">
                One calm, useful read for the week ahead — straight to your inbox.
              </p>
            </div>
            <WaitlistForm variant="newsletter" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
