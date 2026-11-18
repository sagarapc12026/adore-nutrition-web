import type { ReactNode } from 'react';

export function PullQuote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <figure className="!my-12 border-l-[3px] border-peach-300 py-1 pl-6 sm:-mx-10 sm:pl-10">
      <blockquote className="font-display text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] italic leading-[1.3] tracking-tight text-ink">
        {children}
      </blockquote>
      {cite && <figcaption className="mt-3 text-[13px] font-semibold text-ink-soft">— {cite}</figcaption>}
    </figure>
  );
}
