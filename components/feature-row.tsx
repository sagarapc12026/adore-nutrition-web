import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { PhoneFrame } from './ui/phone-frame';
import { FadeUp } from './motion';

type Props = {
  emoji: string;
  tag: string;
  title: ReactNode;
  body: ReactNode;
  bullets: ReactNode[];
  image: { src: string; alt: string };
  reverse?: boolean;
};

export function FeatureRow({ emoji, tag, title, body, bullets, image, reverse = false }: Props) {
  return (
    <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
      <div className={reverse ? 'md:order-2' : ''}>
        <span className="inline-flex items-center gap-2 rounded-pill bg-peach-100 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-peach-700">
          <span aria-hidden="true" className="text-[13px] tracking-normal">
            {emoji}
          </span>
          {tag}
        </span>
        <h3 className="display-md mt-5 text-balance text-ink">{title}</h3>
        <p className="mt-4 text-pretty text-[17px] leading-relaxed text-ink-mid">{body}</p>
        <ul className="mt-7 space-y-4">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-[15.5px] leading-relaxed text-ink-mid">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-peach-100 text-peach-700">
                <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <FadeUp className={`relative mx-auto w-full max-w-[300px] ${reverse ? 'md:order-1' : ''}`}>
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(248,180,138,0.55),rgba(255,233,218,0.5)_55%,transparent)]"
        />
        <PhoneFrame src={image.src} alt={image.alt} sizes="(min-width: 768px) 300px, 75vw" />
      </FadeUp>
    </div>
  );
}
