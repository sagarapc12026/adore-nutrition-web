import { FeatureRow } from './feature-row';

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <header className="mx-auto max-w-[680px] text-center">
          <p className="eyebrow">What we built</p>
          <h2 id="features-title" className="display-lg mt-5 text-balance text-ink">
            Built for the way
            <br />
            mamas <span className="accent">actually live</span>.
          </h2>
          <p className="mt-5 text-[18px] leading-relaxed text-ink-mid">
            Spoon in one hand. Phone in the other. We designed every screen for that exact moment.
          </p>
        </header>

        <div className="mt-20 space-y-28 sm:mt-24 sm:space-y-36">
          <FeatureRow
            emoji="📸"
            tag="Snap & go"
            title={
              <>
                Two taps to log a meal. <span className="accent">That’s it.</span>
              </>
            }
            body={
              <>
                Point your camera at the plate. Our AI recognizes the foods, estimates portions, and figures out the
                nutrition — all before your little one starts the next round of “absolutely not.”
              </>
            }
            bullets={[
              'AI food recognition tuned for toddler plates (mixed, mashed, half-eaten — we know)',
              'Voice and search fallbacks when the camera’s not handy',
              'Reuse past meals in one tap because toddlers eat the same thing 47 times',
            ]}
            image={{
              src: '/screens/meal-logging.webp',
              alt: 'Meal logging screen: a photo of a lunch bowl with tofu, egg and corn recognised and ready to log',
            }}
          />
          <FeatureRow
            reverse
            emoji="✨"
            tag="Real-time clarity"
            title={
              <>
                Know how she’s doing. <span className="accent">Instantly.</span>
              </>
            }
            body="One number tells you if today is on track. Tap to see what’s strong, what’s missing, and exactly which food would close the gap."
            bullets={[
              'A single nutrition score — because you don’t have brainpower for 12 metrics at 6am',
              'Gentle alerts when something needs attention — never scary, always actionable',
              'WHO growth tracking with reassurance built into the language (your 25th percentile baby is healthy)',
            ]}
            image={{
              src: '/screens/insights.webp',
              alt: 'Weekly insights screen: daily scores, what’s strong, a gentle iron nudge, and a WHO growth curve',
            }}
          />
          <FeatureRow
            emoji="🌸"
            tag="Coach Nori"
            title={
              <>
                A friend in your pocket. <span className="accent">Anytime.</span>
              </>
            }
            body={
              <>
                It’s 2am. She won’t sleep. The Google rabbit hole is making it worse. Open Adore and ask Nori — your AI
                coach who knows your child’s age, allergies, and what they’ve been eating.
              </>
            }
            bullets={[
              'Warm and brief — Nori talks like a friend, not a chatbot',
              'Personalized advice based on your little one’s actual data, not generic baby books',
              'Always defers medical questions to your pediatrician (we know our place)',
            ]}
            image={{
              src: '/screens/coach.webp',
              alt: 'Chat with Nori at 2am: reassuring advice about a skipped dinner and a note to check with the pediatrician',
            }}
          />
        </div>
      </div>
    </section>
  );
}
