import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { tints } from '@/components/article-card';
import { WaitlistForm } from '@/components/waitlist-form';
import { getAllArticles, getArticle } from '@/lib/articles';
import { site } from '@/lib/site';

type Params = { params: { slug: string } };

// Only known slugs are built; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    robots: article.published ? undefined : { index: false, follow: true },
    openGraph: {
      type: 'article',
      url: `/blog/${article.slug}`,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export default async function ArticlePage({ params }: Params) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  if (!article.published) return <ComingSoon title={article.title} emoji={article.emoji} tint={article.tint} />;

  const { default: Body } = (await import(`@/content/blog/${article.slug}.mdx`)) as { default: React.ComponentType };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { '@type': 'Organization', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: `${site.url}/icon.svg` },
    },
    mainEntityOfPage: `${site.url}/blog/${article.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main id="main">
        <article>
          <header className="relative overflow-hidden pb-12 pt-14 sm:pt-20">
            <div
              aria-hidden="true"
              className={`absolute inset-x-0 top-0 -z-10 h-[78%] opacity-60 ${tints[article.tint]}`}
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-bg"
            />
            <div className="mx-auto max-w-[720px] px-5 sm:px-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 rounded-pill text-[14px] font-semibold text-ink-mid transition-colors hover:text-ink"
              >
                <span aria-hidden="true">←</span> The Journal
              </Link>
              <p className="eyebrow mt-10">{article.kicker}</p>
              <h1 className="mt-4 text-balance font-display text-[clamp(2.25rem,1.6rem+2.6vw,3.5rem)] font-normal leading-[1.05] tracking-tight text-ink">
                {article.title}
              </h1>
              <p className="mt-6 text-pretty text-[19px] leading-relaxed text-ink-mid">{article.excerpt}</p>
              <p className="mt-8 flex flex-wrap items-center gap-x-2 text-[13.5px] font-medium text-ink-soft">
                <span>{article.author}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={article.date}>{formatDate(article.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{article.readingTime}</span>
              </p>
            </div>
          </header>

          <div className="prose-article mx-auto max-w-[720px] px-5 pb-24 sm:px-8">
            <Body />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

function ComingSoon({ title, emoji, tint }: { title: string; emoji: string; tint: keyof typeof tints }) {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-[720px] px-5 py-24 text-center sm:px-8 sm:py-32">
        <div className={`mx-auto flex h-28 w-28 items-center justify-center rounded-full ${tints[tint]} shadow-warm`}>
          <span aria-hidden="true" className="text-[52px]">
            {emoji}
          </span>
        </div>
        <p className="eyebrow mt-10">Coming soon</p>
        <h1 className="mt-4 text-balance font-display text-[clamp(2rem,1.5rem+2vw,3rem)] font-normal leading-[1.08] tracking-tight text-ink">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-[480px] text-[17px] leading-relaxed text-ink-mid">
          This story is still being written, <em>gently</em>. Leave your email and we’ll send it the Sunday it’s ready.
        </p>
        <div className="mt-10 flex justify-center">
          <WaitlistForm variant="newsletter" />
        </div>
        <Link
          href="/blog"
          className="mt-12 inline-flex items-center gap-1.5 text-[15px] font-semibold text-peach-700 underline decoration-peach-300 decoration-2 underline-offset-[6px]"
        >
          <span aria-hidden="true">←</span> Back to the Journal
        </Link>
      </main>
      <Footer />
    </>
  );
}
