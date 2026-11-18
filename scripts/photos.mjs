// Downloads the openly licensed toddler-food photos listed in scripts/photo-sources.json
// (via Openverse's image proxy) and writes the WebP files the site uses.
// Licences and credits: CREDITS.md and the /credits page.
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const sharp = require('sharp');

const sources = JSON.parse(fs.readFileSync(new URL('./photo-sources.json', import.meta.url), 'utf8'));
fs.mkdirSync('scripts/assets', { recursive: true });

// Journal cover for each article slug.
const journal = {
  'the-truth-about-iron': 'broccoli',
  'why-toddlers-stop-eating': 'teddy-pancake',
  'why-we-built-adore': 'strawberries',
  'percentiles-explained-gently': 'blueberries',
  'introducing-allergens-calmly': 'carrot-puree',
  'iron-rich-lunches-toddlers-eat': 'lunch-plate',
};

for (const s of sources) {
  const file = `scripts/assets/${s.name}.jpg`;
  if (!fs.existsSync(file)) {
    // curl respects HTTPS_PROXY, which Node's fetch does not.
    const buf = execFileSync(
      'curl',
      ['-sSfL', '-m', '90', '-A', 'adore-site-build/1.0', `https://api.openverse.org/v1/images/${s.id}/thumb/?full_size=true&compressed=false`],
      { maxBuffer: 30 * 1024 * 1024 },
    );
    await sharp(buf).jpeg({ quality: 90 }).toFile(file);
    console.log('downloaded', s.name);
  }
}

for (const [slug, name] of Object.entries(journal)) {
  await sharp(`scripts/assets/${name}.jpg`).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`public/journal/${slug}.webp`);
  console.log('journal', slug, '←', name);
}
