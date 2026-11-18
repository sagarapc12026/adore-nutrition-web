import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { TrustStrip } from '@/components/trust-strip';
import { FounderStory } from '@/components/founder-story';
import { Features } from '@/components/features';
import { HowItWorks } from '@/components/how-it-works';
import { Voices } from '@/components/voices';
import { BlogTeaser } from '@/components/blog-teaser';
import { BigCta } from '@/components/big-cta';
import { Footer } from '@/components/footer';
import { site } from '@/lib/site';

// The waitlist count is cached for five minutes; the page follows suit.
export const revalidate = 300;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/icon.svg`,
      email: site.email,
      slogan: site.tagline,
      sameAs: Object.values(site.social),
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { '@id': `${site.url}/#organization` },
      inLanguage: 'en-US',
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main id="main">
        <Hero />
        <TrustStrip />
        <FounderStory />
        <Features />
        <HowItWorks />
        <Voices />
        <BlogTeaser />
        <BigCta />
      </main>
      <Footer />
    </>
  );
}
