import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const alt = 'Adore Nutrition — For the love of every little bite.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const fontDir = path.join(process.cwd(), 'lib', 'og-fonts');

export default async function OpengraphImage() {
  const [regular, italic, jakarta] = await Promise.all([
    readFile(path.join(fontDir, 'Fraunces-Regular.ttf')),
    readFile(path.join(fontDir, 'Fraunces-Italic.ttf')),
    readFile(path.join(fontDir, 'Jakarta-SemiBold.ttf')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 84px',
          background:
            'radial-gradient(circle at 85% 15%, #F8B48A 0%, #FCD2B6 30%, rgba(255,233,218,0.6) 55%, #FBF4EB 80%)',
          color: '#2A1810',
          fontFamily: 'Fraunces',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: 'radial-gradient(circle at 32% 28%, #F8B48A, #E07A4D 58%, #C45F36)',
              display: 'flex',
              boxShadow: '0 8px 24px rgba(193,95,54,0.25)',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 12,
                top: 10,
                width: 16,
                height: 11,
                borderRadius: 999,
                background: 'rgba(255,255,255,0.75)',
                transform: 'rotate(-30deg)',
              }}
            />
          </div>
          <div style={{ display: 'flex', fontSize: 38, letterSpacing: -0.5 }}>
            Adore&nbsp;<span style={{ fontStyle: 'italic', color: '#C45F36' }}>Nutrition</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 104, lineHeight: 1.02, letterSpacing: -3 }}>
          <span>For the love</span>
          <span style={{ display: 'flex' }}>
            of every&nbsp;<span style={{ fontStyle: 'italic', color: '#C45F36' }}>little bite</span>.
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'Jakarta',
            fontSize: 24,
            color: '#5A3F33',
          }}
        >
          <span>adorenutrition.app</span>
          <span
            style={{
              display: 'flex',
              padding: '12px 26px',
              borderRadius: 999,
              background: '#FFE9DA',
              color: '#9A4825',
              fontSize: 18,
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}
          >
            Now accepting beta mamas
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Fraunces', data: regular, style: 'normal', weight: 400 },
        { name: 'Fraunces', data: italic, style: 'italic', weight: 400 },
        { name: 'Jakarta', data: jakarta, style: 'normal', weight: 600 },
      ],
    },
  );
}
