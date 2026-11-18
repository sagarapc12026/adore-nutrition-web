import Image from 'next/image';
import Link from 'next/link';
import type { ArticleMeta } from '@/content/articles';

export const tints: Record<ArticleMeta['tint'], string> = {
  peach: 'bg-[radial-gradient(circle_at_30%_20%,#FFE9DA,#FCD2B6_45%,#F8B48A)]',
  blush: 'bg-[radial-gradient(circle_at_70%_20%,#FFE9DA,#F4C2B0_50%,#E89B89)]',
  sage: 'bg-[radial-gradient(circle_at_30%_25%,#EEF3EC,#C9DACA_50%,#A6C2A8)]',
  cream: 'bg-[radial-gradient(circle_at_50%_30%,#FFF8F2,#FFE9DA_50%,#FCD2B6)]',
};

type CoverProps = {
  article: Pick<ArticleMeta, 'emoji' | 'tint' | 'image' | 'imageAlt' | 'imagePosition' | 'imageOnWhite'>;
  sizes: string;
  emojiClass?: string;
  /** Card covers sit next to the linked title, so they're decorative by default. */
  decorative?: boolean;
  priority?: boolean;
};

/** Food photo when the article has one, otherwise the emoji on a soft tint. */
export function ArticleCover({
  article,
  sizes,
  emojiClass = 'text-[64px]',
  decorative = true,
  priority = false,
}: CoverProps) {
  if (article.image) {
    return (
      <Image
        src={article.image}
        alt={decorative ? '' : (article.imageAlt ?? '')}
        fill
        sizes={sizes}
        priority={priority}
        style={article.imagePosition ? { objectPosition: article.imagePosition } : undefined}
        className={`object-cover transition-transform ${article.imageOnWhite ? 'mix-blend-multiply' : ''} duration-700 ease-out group-hover:scale-[1.03]`}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`drop-shadow-[0_8px_16px_rgba(154,72,37,0.18)] transition-transform duration-500 group-hover:scale-105 ${emojiClass}`}
    >
      {article.emoji}
    </span>
  );
}

type Props = {
  article: Pick<
    ArticleMeta,
    | 'slug'
    | 'title'
    | 'kicker'
    | 'readingTime'
    | 'emoji'
    | 'tint'
    | 'image'
    | 'imageAlt'
    | 'imagePosition'
    | 'imageOnWhite'
  > & {
    published?: boolean;
  };
  headingLevel?: 'h2' | 'h3';
};

export function ArticleCard({ article, headingLevel: H = 'h3' }: Props) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-peach-100 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift">
      <div
        className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden ${tints[article.tint]}`}
      >
        <ArticleCover article={article} sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw" />
        {article.published === false && (
          <span className="absolute right-4 top-4 z-[1] rounded-pill bg-white/85 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-mid backdrop-blur">
            Coming soon
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[12px] font-semibold text-ink-soft">
          <span className="text-peach-700">{article.kicker}</span> <span aria-hidden="true">·</span>{' '}
          {article.readingTime}
        </p>
        <H className="mt-3 font-display text-[21px] leading-snug tracking-tight text-ink">
          <Link
            href={`/blog/${article.slug}`}
            className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none group-focus-within:underline group-focus-within:decoration-peach-300"
          >
            {article.title}
          </Link>
        </H>
      </div>
    </article>
  );
}
