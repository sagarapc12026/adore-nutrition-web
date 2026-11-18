export function FounderStory() {
  return (
    <section id="story" aria-labelledby="story-title" className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,#FFE9DA,rgba(252,210,182,0.55),transparent)] blur-[60px]"
      />
      <div className="mx-auto max-w-[760px] px-5 text-center sm:px-8">
        <p className="eyebrow">A note from the founder</p>
        <h2 id="story-title" className="display-lg mt-5 text-balance text-ink">
          You feed them with your hands.
          <br />
          We’ll feed them with <span className="accent">our heart</span>.
        </h2>

        <div className="mx-auto mt-10 max-w-[680px] space-y-6 text-left text-[18px] leading-[1.7] text-ink-mid">
          <p>
            Adore Nutrition started in <em>a quiet 2am kitchen</em>, with a baby on one hip and a phone in the other
            hand, googling “how much iron does a 14-month-old need?” for what felt like the hundredth time.
          </p>
          <p>
            I knew I wasn’t alone. Every mama I asked was running the same anxious math in her head —{' '}
            <em>is she eating enough? am I doing this right? should I be worried?</em> The information was scattered
            across forums, baby books, and well-meaning advice that never quite fit. The clinical apps felt cold. The
            “wellness” ones felt fake.
          </p>
          <p>
            So we built something different. Adore is <em>the warm, intelligent friend</em> you wish you had in those
            small hours — one that takes a photo of your little one’s plate and gently tells you what’s good, what’s
            missing, and what to try next. No judgment. No noise. <em>Just gentle, useful clarity.</em>
          </p>
        </div>

        <p className="mt-10 font-display text-[18px] italic text-peach-700">— with love, the Adore team</p>
      </div>
    </section>
  );
}
