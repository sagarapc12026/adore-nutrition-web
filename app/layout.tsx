import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { fraunces, jakarta } from '@/lib/fonts';
import { site } from '@/lib/site';
import { MotionProvider } from '@/components/motion';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Adore Nutrition — For the love of every little bite',
    template: '%s · Adore Nutrition',
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: 'Adore Nutrition — For the love of every little bite',
    description: site.description,
    url: '/',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adore Nutrition — For the love of every little bite',
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#E07A4D',
  width: 'device-width',
  initialScale: 1,
};

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const plausibleSrc = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? 'https://plausible.io/js/script.tagged-events.js';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-ink">
        <MotionProvider>{children}</MotionProvider>
        {plausibleDomain && (
          <>
            <Script id="plausible-queue" strategy="afterInteractive">
              {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
            </Script>
            <Script defer data-domain={plausibleDomain} src={plausibleSrc} strategy="afterInteractive" />
          </>
        )}
      </body>
    </html>
  );
}
