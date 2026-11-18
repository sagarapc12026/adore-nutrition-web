import { voices } from '@/content/voices';
import { Avatar } from './avatar';
import { FadeUp } from './motion';

export function Voices() {
  return (
    <section id="voices" aria-labelledby="voices-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <header className="mx-auto max-w-[640px] text-center">
          <p className="eyebrow">From our beta mamas</p>
          <h2 id="voices-title" className="display-lg mt-5 text-balance text-ink">
            In their <span className="accent">own words</span>.
          </h2>
        </header>

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {voices.map((v, i) => (
            <FadeUp as="li" key={v.name} delay={i * 0.1} className="flex">
              <figure className="relative flex w-full flex-col overflow-hidden rounded-xl bg-white p-8 shadow-warm ring-1 ring-peach-100">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-5 top-1 select-none font-display text-[140px] leading-none text-peach-100"
                >
                  “
                </span>
                <blockquote className="relative mt-10 flex-1 font-display text-[19px] leading-[1.45] text-ink">
                  <p>{v.quote}</p>
                </blockquote>
                <figcaption className="relative mt-8 flex items-center gap-3 border-t border-peach-100 pt-5">
                  <Avatar initial={v.initial} index={i} />
                  <span>
                    <span className="block text-[14.5px] font-semibold text-ink">{v.name}</span>
                    <span className="block text-[13px] text-ink-soft">{v.role}</span>
                  </span>
                </figcaption>
              </figure>
            </FadeUp>
          ))}
        </ul>
      </div>
    </section>
  );
}
