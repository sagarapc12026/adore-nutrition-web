import Link from 'next/link';
import { siInstagram, siTiktok, siPinterest } from 'simple-icons';
import { Logo } from './logo';
import { TrackedLink } from './tracked-link';
import { site } from '@/lib/site';

const columns = [
  {
    title: 'Adore',
    links: [
      { href: '/#story', label: 'Our story' },
      { href: '/#how-it-works', label: 'How it works' },
      { href: '/blog', label: 'Journal' },
      { href: '/#waitlist', label: 'Join waitlist' },
    ],
  },
  {
    title: 'For mamas',
    links: [
      { href: '/blog?category=nutrition-basics', label: 'Toddler nutrition' },
      { href: '/blog?category=picky-eaters', label: 'Picky eater help' },
      { href: '/blog/why-we-built-adore', label: 'Founder notes' },
      { href: '/blog?category=growth-milestones', label: 'Pediatric guides' },
    ],
  },
  {
    title: 'Get in touch',
    links: [
      { href: `mailto:${site.email}`, label: site.email },
      { href: '/privacy', label: 'Privacy policy' },
      { href: '/terms', label: 'Terms of service' },
      { href: `mailto:${site.email}?subject=Press%20kit`, label: 'Press kit' },
    ],
  },
];

const socials = [
  { href: site.social.instagram, label: 'Instagram', icon: siInstagram },
  { href: site.social.tiktok, label: 'TikTok', icon: siTiktok },
  { href: site.social.pinterest, label: 'Pinterest', icon: siPinterest },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-12 pt-20 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo tone="dark" />
          <p className="mt-5 text-balance font-display text-[22px] italic leading-snug text-white">
            For the love of every little bite.
          </p>
          <p className="mt-3 max-w-[280px] text-[14px] leading-relaxed text-white/65">
            Made with care, for the way mamas actually live.
          </p>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-peach-300">{col.title}</h2>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => {
                const cls =
                  'text-[14.5px] text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline';
                return (
                  <li key={l.label}>
                    {l.href === '/#waitlist' ? (
                      <TrackedLink href={l.href} location="footer" className={cls}>
                        {l.label}
                      </TrackedLink>
                    ) : (
                      <Link href={l.href} className={cls}>
                        {l.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mx-auto flex max-w-6xl flex-col-reverse items-start justify-between gap-6 border-t border-white/10 px-5 py-8 sm:flex-row sm:items-center sm:px-8">
        <p className="text-[13px] text-white/60">
          © {new Date().getFullYear()} Adore Nutrition. Made with love <span aria-hidden="true">🍑</span>
        </p>
        <ul className="flex gap-3">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Adore Nutrition on ${s.label}`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.07] text-peach-300 ring-1 ring-white/10 transition-colors hover:bg-peach-500 hover:text-white"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                  <path d={s.icon.path} />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
