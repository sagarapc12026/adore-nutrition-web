// Article metadata for the Journal. Any article with a matching
// content/blog/<slug>.mdx file is published; the rest render a "coming soon" page.
// MDX frontmatter overrides these fields, and an MDX file with no entry here is
// picked up automatically — so adding an article only needs the .mdx file.

export const categories = [
  { slug: 'all', label: 'All stories' },
  { slug: 'nutrition-basics', label: 'Nutrition basics' },
  { slug: 'picky-eaters', label: 'Picky eaters' },
  { slug: 'growth-milestones', label: 'Growth & milestones' },
  { slug: 'allergies', label: 'Allergies' },
  { slug: 'from-the-founder', label: 'From the founder' },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];

export type ArticleMeta = {
  slug: string;
  title: string;
  excerpt: string;
  /** Short label shown on cards, e.g. "Nutrition" */
  kicker: string;
  category: Exclude<CategorySlug, 'all'>;
  readingTime: string;
  emoji: string;
  /** Cover tint: 'peach' | 'blush' | 'sage' | 'cream' */
  tint: 'peach' | 'blush' | 'sage' | 'cream';
  date: string; // ISO
  author: string;
  featured?: boolean;
};

export const articles: ArticleMeta[] = [
  {
    slug: 'the-truth-about-iron',
    title: 'The truth about iron — what every toddler mama should know',
    excerpt:
      'Iron is the nutrient most toddlers run short on, and the one most of us worry about at 11pm. Here’s what actually matters, in plain words.',
    kicker: 'Nutrition',
    category: 'nutrition-basics',
    readingTime: '6 min read',
    emoji: '🥬',
    tint: 'peach',
    date: '2026-11-02',
    author: 'The Adore team',
    featured: true,
  },
  {
    slug: 'why-toddlers-stop-eating',
    title: 'She used to eat everything. Why toddlers suddenly stop.',
    excerpt:
      'The sudden switch from enthusiastic eater to “absolutely not” is one of the most normal things in the world. Here’s why it happens.',
    kicker: 'Picky eaters',
    category: 'picky-eaters',
    readingTime: '4 min read',
    emoji: '🥄',
    tint: 'blush',
    date: '2026-11-09',
    author: 'The Adore team',
  },
  {
    slug: 'why-we-built-adore',
    title: 'Why we built Adore Nutrition',
    excerpt: 'A 2am kitchen, a baby on one hip, and the question every mama keeps asking herself.',
    kicker: 'From the founder',
    category: 'from-the-founder',
    readingTime: '3 min read',
    emoji: '🍑',
    tint: 'cream',
    date: '2026-11-16',
    author: 'The Adore team',
  },
  {
    slug: 'percentiles-explained-gently',
    title: 'Percentiles, explained gently',
    excerpt: 'Why a 25th-percentile baby is a perfectly healthy baby — and what pediatricians actually look for.',
    kicker: 'Growth',
    category: 'growth-milestones',
    readingTime: '5 min read',
    emoji: '📏',
    tint: 'sage',
    date: '2026-11-23',
    author: 'The Adore team',
  },
  {
    slug: 'introducing-allergens-calmly',
    title: 'Introducing allergens, calmly',
    excerpt: 'A simple, unhurried way to think about first tastes of peanut, egg and the rest.',
    kicker: 'Allergies',
    category: 'allergies',
    readingTime: '6 min read',
    emoji: '🥜',
    tint: 'blush',
    date: '2026-11-30',
    author: 'The Adore team',
  },
  {
    slug: 'iron-rich-lunches-toddlers-eat',
    title: 'Five iron-rich lunches toddlers actually eat',
    excerpt: 'Tested at real tables, with real refusals. Lentils have never looked so friendly.',
    kicker: 'Nutrition',
    category: 'nutrition-basics',
    readingTime: '4 min read',
    emoji: '🍲',
    tint: 'peach',
    date: '2026-12-07',
    author: 'The Adore team',
  },
];
