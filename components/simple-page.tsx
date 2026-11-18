import type { ReactNode } from 'react';
import { Nav } from './nav';
import { Footer } from './footer';

export function SimplePage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-[720px] px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-lg mt-4 text-ink">{title}</h1>
        {updated && <p className="mt-4 text-[13.5px] text-ink-soft">Last updated {updated}</p>}
        <div className="prose-article prose-plain mt-10">{children}</div>
      </main>
      <Footer />
    </>
  );
}
