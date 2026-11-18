export const site = {
  name: 'Adore Nutrition',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://adorenutrition.app').replace(/\/$/, ''),
  domain: 'adorenutrition.app',
  tagline: 'For the love of every little bite.',
  description:
    'Two taps to log what your little one ate, real-time nutrition you actually understand, and a gentle coach for the small-hours questions. Join the Adore Nutrition waitlist.',
  email: 'hello@adorenutrition.app',
  social: {
    instagram: 'https://www.instagram.com/adorenutrition',
    tiktok: 'https://www.tiktok.com/@adorenutrition',
    pinterest: 'https://www.pinterest.com/adorenutrition',
  },
} as const;
