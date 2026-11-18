import { Timer, Sprout, Heart, Lock } from 'lucide-react';
import { FadeUp } from './motion';

const items = [
  { icon: Timer, label: 'Log a meal in 2 taps' },
  { icon: Sprout, label: 'Built on pediatric nutrition guidelines' },
  { icon: Heart, label: 'Tested with real mamas before launch' },
  { icon: Lock, label: 'Your data, yours alone — never sold' },
];

export function TrustStrip() {
  return (
    <section aria-label="Why mamas trust Adore" className="border-y border-peach-500/[0.12] bg-white">
      <FadeUp className="mx-auto max-w-6xl px-5 py-7 sm:px-8">
        <ul className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-peach-100 text-peach-700">
                <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <span className="text-[14px] font-medium leading-snug text-ink-mid">{label}</span>
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}
