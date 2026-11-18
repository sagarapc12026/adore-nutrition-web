// Downloads the Unsplash food photos used on the site and converts them to WebP.
// All photos are under the Unsplash License (free for commercial use, no attribution required);
// we credit them anyway in CREDITS.md.
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
const require = createRequire(import.meta.url);
const sharp = require('sharp');

const photos = [
  ['public/journal/the-truth-about-iron.webp', '1576045057995-568f588f82fb', 1400],
  ['public/journal/why-toddlers-stop-eating.webp', '1519996529931-28324d5a630e', 1400],
  ['public/journal/why-we-built-adore.webp', '1610832958506-aa56368176cf', 1400],
  ['public/journal/percentiles-explained-gently.webp', '1505576399279-565b52d4ac71', 1400],
  ['public/journal/introducing-allergens-calmly.webp', '1482049016688-2d3e1b311543', 1400],
  ['public/journal/iron-rich-lunches-toddlers-eat.webp', '1547592180-85f173990554', 1400],
  ['scripts/assets/plate.jpg', '1546069901-ba9599a7e63c', 900],
  ['scripts/assets/breakfast.jpg', '1490474418585-ba9bad8fd0ea', 300],
  ['scripts/assets/lunch.jpg', '1546069901-ba9599a7e63c', 300],
];

for (const [out, id, w] of photos) {
  // curl respects HTTPS_PROXY, which Node's fetch does not.
  const buf = execFileSync('curl', ['-sSfL', `https://images.unsplash.com/photo-${id}?w=${w}&q=85&fm=jpg`], {
    maxBuffer: 20 * 1024 * 1024,
  });
  const img = sharp(buf).resize({ width: w, withoutEnlargement: true });
  await (out.endsWith('.webp') ? img.webp({ quality: 78 }) : img.jpeg({ quality: 85 })).toFile(out);
  console.log('saved', out);
}
