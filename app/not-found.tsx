import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { LinkButton } from '@/components/ui/button';

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto flex max-w-[640px] flex-col items-center px-5 py-28 text-center sm:py-36">
        <p className="eyebrow">Page not found</p>
        <h1 className="display-lg mt-5 text-ink">
          This page wandered off, <span className="accent">like a toddler at the park</span>.
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-ink-mid">Let’s get you back somewhere familiar.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <LinkButton href="/">Back home</LinkButton>
          <LinkButton href="/blog" variant="secondary">
            Read the Journal
          </LinkButton>
        </div>
      </main>
      <Footer />
    </>
  );
}
