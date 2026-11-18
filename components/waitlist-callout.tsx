import { LogoMark } from './logo';
import { WaitlistForm } from './waitlist-form';

/** End-of-article call to action. */
export function WaitlistCallout() {
  return (
    <aside
      aria-labelledby="article-cta-title"
      className="not-prose !mt-16 overflow-hidden rounded-xl bg-[radial-gradient(120%_120%_at_100%_0%,#FCD2B6,#FFE9DA_45%,#FFF8F2)] p-8 shadow-warm ring-1 ring-peach-200/70 sm:p-10"
    >
      <LogoMark size={40} />
      <h2
        id="article-cta-title"
        className="!mt-5 font-display text-[28px] font-normal leading-tight tracking-tight text-ink"
      >
        Less googling. <span className="accent">More knowing.</span>
      </h2>
      <p className="!mt-3 text-[16px] leading-relaxed text-ink-mid">
        Adore keeps track of iron and everything else, quietly, in the background — so you can stop doing the math at
        11pm.
      </p>
      <WaitlistForm variant="article" className="!mt-6" />
    </aside>
  );
}
