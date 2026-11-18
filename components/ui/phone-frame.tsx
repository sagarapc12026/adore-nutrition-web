import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

// Screens are rendered at 600×1298 (iPhone 14 proportions).
export const SCREEN_W = 600;
export const SCREEN_H = 1298;

export function PhoneFrame({
  src,
  alt,
  priority = false,
  sizes = '(min-width: 1024px) 280px, 60vw',
  className = '',
}: Props) {
  return (
    <div
      className={`relative rounded-[2.6rem] bg-ink p-[3.2%] shadow-hero ring-1 ring-black/10 ${className}`}
      style={{ aspectRatio: `${SCREEN_W + 40} / ${SCREEN_H + 40}` }}
    >
      {/* side buttons */}
      <span aria-hidden="true" className="absolute -left-[3px] top-[18%] h-[7%] w-[3px] rounded-l bg-ink" />
      <span aria-hidden="true" className="absolute -right-[3px] top-[24%] h-[11%] w-[3px] rounded-r bg-ink" />
      <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-cream">
        <Image
          src={src}
          alt={alt}
          width={SCREEN_W}
          height={SCREEN_H}
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className="h-full w-full object-cover"
        />
        {/* dynamic island */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[1.6%] h-[3.4%] w-[30%] -translate-x-1/2 rounded-pill bg-ink"
        />
        {/* glass sheen */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
        />
      </div>
    </div>
  );
}
