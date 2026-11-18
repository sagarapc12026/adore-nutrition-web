import Link from 'next/link';

export function LogoMark({ size = 30, className = '' }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-block shrink-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,#F8B48A,#E07A4D_58%,#C45F36)] shadow-warm ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        className="absolute rounded-full bg-white/75 blur-[0.5px]"
        style={{
          width: size * 0.28,
          height: size * 0.2,
          left: size * 0.2,
          top: size * 0.18,
          transform: 'rotate(-30deg)',
        }}
      />
      <span className="absolute inset-0 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(154,72,37,0.35)]" />
    </span>
  );
}

export function Wordmark({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <span
      className={`font-display text-[24px] leading-none tracking-tight ${tone === 'dark' ? 'text-white' : 'text-ink'}`}
    >
      Adore <span className={`italic ${tone === 'dark' ? 'text-peach-300' : 'text-peach-600'}`}>Nutrition</span>
    </span>
  );
}

export function Logo({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5 rounded-pill" aria-label="Adore Nutrition — home">
      <LogoMark />
      <Wordmark tone={tone} />
    </Link>
  );
}
