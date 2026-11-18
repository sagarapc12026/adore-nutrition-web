import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  pulse?: boolean;
  className?: string;
};

export function PillBadge({ children, pulse = false, className = '' }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-pill bg-peach-100 px-3.5 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-peach-700 ring-1 ring-peach-200/70 ${className}`}
    >
      {pulse && (
        <span aria-hidden="true" className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-peach-400" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-peach-500" />
        </span>
      )}
      {children}
    </span>
  );
}
