import type { Metadata } from 'next';
import { SimplePage } from '@/components/simple-page';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: 'Terms of service', alternates: { canonical: '/terms' } };

// Plain-language draft. Have it reviewed before launch.
export default function TermsPage() {
  return (
    <SimplePage
      eyebrow="Terms"
      title={
        <>
          The <span className="accent">small print</span>, kindly.
        </>
      }
      updated="November 2026"
    >
      <p>
        By using this website or joining the waitlist, you agree to these terms. We’ve tried to write them the way we’d
        want to read them.
      </p>
      <h2>Not medical advice</h2>
      <p>
        Everything on this site — including the Journal — is general information built on pediatric nutrition
        guidelines. It is not medical advice and doesn’t replace your pediatrician. If you’re worried about your child’s
        health, please talk to them.
      </p>
      <h2>The waitlist</h2>
      <p>
        Joining the waitlist doesn’t create an account or commit you to anything. We may invite people in batches, and
        we can’t promise a specific date.
      </p>
      <h2>Our content</h2>
      <p>The words, design and images on this site belong to Adore Nutrition. You’re welcome to share links to them.</p>
      <h2>Questions</h2>
      <p>
        Write to <a href={`mailto:${site.email}`}>{site.email}</a> — a real person will answer.
      </p>
    </SimplePage>
  );
}
