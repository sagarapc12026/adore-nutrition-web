import { PillBadge } from './ui/pill-badge';
import { PhoneFrame } from './ui/phone-frame';
import { WaitlistForm } from './waitlist-form';

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Layered warm background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-bg bg-[radial-gradient(120%_80%_at_85%_10%,#FCD2B6_0%,rgba(244,194,176,0.55)_35%,rgba(255,233,218,0.4)_60%,transparent_80%),radial-gradient(90%_70%_at_0%_100%,#FFE9DA_0%,transparent_70%)]"
      />
      <div aria-hidden="true" className="absolute -left-32 top-24 -z-10 h-80 w-80 rounded-full bg-peach-100 blur-3xl" />
      <div
        aria-hidden="true"
        className="absolute -right-20 bottom-0 -z-10 h-96 w-96 rounded-full bg-blush/50 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-10 sm:px-8 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-24 lg:pt-20">
        <div className="max-w-[580px]">
          <PillBadge pulse>Now accepting beta mamas</PillBadge>

          <h1 id="hero-title" className="display-xl mt-6 text-balance text-ink">
            For the love
            <br />
            of every <span className="accent">little bite</span>.
          </h1>

          <p className="mt-6 max-w-[540px] text-pretty text-[clamp(1.0625rem,1rem+0.3vw,1.25rem)] leading-relaxed text-ink-mid">
            It’s 11pm and you’re still wondering if she’s getting enough iron. We built Adore for that exact feeling —
            two taps to log what she ate, real-time nutrition you actually understand, and a coach in your pocket for
            the small-hours questions Google can’t answer.
          </p>

          <WaitlistForm variant="hero" className="mt-8" />
        </div>

        {/* Phone composition */}
        <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[540px]">
          <div className="group relative aspect-[560/640] transition-transform duration-[400ms] ease-out hover:-translate-y-1.5 motion-reduce:transform-none">
            <div aria-hidden="true" className="absolute inset-[8%] -z-10 rounded-full bg-peach-300/40 blur-3xl" />

            <div className="absolute left-[2%] top-[6%] z-[1] w-[38%] -rotate-[7deg]">
              <PhoneFrame
                src="/screens/onboarding.webp"
                alt="Adore onboarding: entering a child’s name and age, and choosing what matters most"
                sizes="(min-width: 1024px) 210px, 38vw"
              />
            </div>
            <div className="absolute left-[31%] top-[29%] z-[2] w-[36%] -rotate-[2deg]">
              <PhoneFrame
                src="/screens/meal-logging.webp"
                alt="Logging a lunch by photo: tofu, egg and corn recognised in the bowl"
                sizes="(min-width: 1024px) 200px, 36vw"
              />
            </div>
            <div className="absolute right-[2%] top-0 z-[3] w-[43%] rotate-[5deg]">
              <PhoneFrame
                src="/screens/dashboard.webp"
                alt="Adore dashboard showing today’s nutrition score of 82 and nutrient progress"
                sizes="(min-width: 1024px) 240px, 43vw"
                priority
              />
            </div>

            <figure className="absolute bottom-[4%] left-0 z-[5] max-w-[62%] -rotate-[3deg] rounded-card bg-white p-4 shadow-warm ring-1 ring-peach-100 sm:max-w-[250px] sm:p-5">
              <blockquote className="font-display text-[15px] leading-snug text-ink sm:text-[17px]">
                “Logged her lunch in 8 seconds. I almost cried.”
              </blockquote>
              <figcaption className="mt-2 text-[12px] font-medium text-ink-soft">— Sarah, mama of 2</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
