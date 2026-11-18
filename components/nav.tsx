'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { MenuIcon, XIcon } from './icons';
import { Logo } from './logo';
import { track } from '@/lib/analytics';

const links = [
  { href: '/#story', label: 'Our story' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#voices', label: 'For mamas' },
  { href: '/blog', label: 'Journal' },
] as const;

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on route change
  useEffect(() => setOpen(false), [pathname]);

  // Scroll lock, Escape to close, focus management
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab' && panelRef.current) {
        const items = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>('a')].filter(
          Boolean,
        ) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href: string) => href === '/blog' && pathname.startsWith('/blog');

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-peach-500/[0.12] bg-bg/85 backdrop-blur-xl">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-pill focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-warm"
        >
          Skip to content
        </a>
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Logo />

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  onClick={() => track('nav_link_click', { label: l.label })}
                  className={`rounded-pill px-4 py-2 text-[14.5px] font-medium transition-colors duration-200 hover:bg-peach-100/70 hover:text-ink ${
                    isActive(l.href) ? 'bg-peach-100 text-ink' : 'text-ink-mid'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/#waitlist"
              onClick={() => track('cta_click', { location: 'nav' })}
              className="group hidden h-10 items-center gap-1.5 rounded-pill bg-gradient-to-b from-peach-600 to-peach-700 px-5 text-[14px] font-semibold text-white shadow-warm transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-lift sm:inline-flex"
            >
              Join the waitlist
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-peach-100 md:hidden"
            >
              {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay menu — a sibling of <header>, because backdrop-filter
          would otherwise turn the header into the containing block for position:fixed. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex h-[100dvh] flex-col bg-bg px-6 pb-10 pt-24 transition-[opacity,visibility] duration-300 md:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-peach-200/60 blur-3xl"
        />
        <ul className="relative flex flex-col gap-1">
          {links.map((l, i) => (
            <li key={l.href}>
              <Link
                href={l.href}
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  track('nav_link_click', { label: l.label });
                  setOpen(false);
                }}
                className={`block py-3 font-display text-[40px] leading-tight tracking-tight text-ink transition-all duration-500 ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                }`}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="relative mt-auto">
          <Link
            href="/#waitlist"
            tabIndex={open ? 0 : -1}
            onClick={() => {
              track('cta_click', { location: 'nav' });
              setOpen(false);
            }}
            className="flex h-16 w-full items-center justify-center gap-2 rounded-pill bg-gradient-to-b from-peach-600 to-peach-700 text-[17px] font-semibold text-white shadow-lift"
          >
            Join the waitlist <span aria-hidden="true">→</span>
          </Link>
          <p className="mt-4 text-center text-[13px] text-ink-soft">
            No spam. Just a quiet note when we open early access.
          </p>
        </div>
      </div>
    </>
  );
}
