import type { Metadata } from 'next';
import { SimplePage } from '@/components/simple-page';
import credits from '@/content/photo-credits.json';

export const metadata: Metadata = { title: 'Photo credits', alternates: { canonical: '/credits' } };

const licenceName: Record<string, string> = {
  by: 'CC BY',
  'by-sa': 'CC BY-SA',
  pdm: 'Public Domain Mark',
  cc0: 'CC0',
};

export default function CreditsPage() {
  return (
    <SimplePage
      eyebrow="Credits"
      title={
        <>
          Thank you to the <span className="accent">photographers</span>.
        </>
      }
    >
      <p>
        The food photos on this site are openly licensed. The USDA images are in the public domain; the others are used
        under Creative Commons licences, credited below. Some images are cropped to fit; none are otherwise altered.
      </p>
      <ul>
        {credits.map((c) => (
          <li key={c.id}>
            <a href={c.source ?? undefined}>“{c.title}”</a> by {c.creator ?? 'unknown'} —{' '}
            {c.license_url ? (
              <a href={c.license_url}>
                {licenceName[c.license] ?? c.license.toUpperCase()} {c.license === 'pdm' ? '' : c.license_version}
              </a>
            ) : (
              licenceName[c.license]
            )}
          </li>
        ))}
      </ul>
      <p>
        App screens are illustrations made by Adore Nutrition using the USDA photos above. If you’re a photographer and
        would like a credit changed, write to us.
      </p>
    </SimplePage>
  );
}
