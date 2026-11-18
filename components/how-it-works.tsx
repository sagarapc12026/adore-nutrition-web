import { FadeUp } from './motion';

const steps = [
  {
    title: 'Set up in 90 seconds',
    body: 'Tell us your little one’s name, age, and what matters most to you. We’ll personalize everything from there.',
  },
  {
    title: 'Snap her meals',
    body: 'Photo of the plate. We do the work — recognizing the food, estimating portions, calculating nutrition.',
  },
  {
    title: 'See the picture build',
    body: 'Daily score, weekly trends, gentle nudges — and a coach to chat with whenever you need her.',
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-title"
      className="bg-gradient-to-b from-peach-50 via-peach-100 to-peach-200 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <header className="mx-auto max-w-[640px] text-center">
          <p className="eyebrow">The whole flow</p>
          <h2 id="how-title" className="display-lg mt-5 text-balance text-ink">
            Three small steps. <span className="accent">Big peace of mind.</span>
          </h2>
        </header>

        <ol className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <FadeUp as="li" key={s.title} delay={i * 0.1} className="rounded-xl bg-white p-8 shadow-warm">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_25%,#F8B48A,#E07A4D_60%,#C45F36)] font-display text-[22px] font-medium text-white shadow-warm"
              >
                {i + 1}
              </span>
              <h3 className="mt-6 font-display text-[22px] leading-snug text-ink">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-mid">{s.body}</p>
            </FadeUp>
          ))}
        </ol>
      </div>
    </section>
  );
}
