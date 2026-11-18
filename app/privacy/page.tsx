import type { Metadata } from 'next';
import { SimplePage } from '@/components/simple-page';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: 'Privacy policy', alternates: { canonical: '/privacy' } };

// Plain-language draft. Have it reviewed before launch.
export default function PrivacyPage() {
  return (
    <SimplePage
      eyebrow="Privacy"
      title={
        <>
          Your data, <span className="accent">yours alone</span>.
        </>
      }
      updated="November 2026"
    >
      <p>
        We keep this short because it should be. Before launch, the only thing we collect on this website is the email
        address you choose to give us.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>Your email address, when you join the waitlist or the Sunday newsletter.</li>
        <li>Where you came from (for example, a campaign link), so we know which places are worth showing up in.</li>
        <li>
          Anonymous, cookieless page statistics through Plausible Analytics. No cookies, no cross-site tracking, nothing
          that identifies you.
        </li>
      </ul>
      <h2>What we do with it</h2>
      <p>
        We use your email to tell you when Adore opens early access and, if you asked for it, to send one story each
        Sunday. That’s it. We never sell your data, and we never will.
      </p>
      <h2>Who helps us</h2>
      <p>Your email is stored with our email provider (Resend or LaunchList), who process it only on our behalf.</p>
      <h2>Your choices</h2>
      <p>
        Every email has a one-tap unsubscribe link. To have your email deleted entirely, write to{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a> and we’ll do it within a few days.
      </p>
    </SimplePage>
  );
}
