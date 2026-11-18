// Renders the placeholder app screens in scripts/screens.html to WebP in public/screens.
// Replace the output files with real screenshots (same names) whenever they're ready.
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const sharp = require('sharp');

const root = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(root, '..', 'public', 'screens');
const screens = ['onboarding', 'dashboard', 'meal-logging', 'insights', 'coach'];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
for (const name of screens) {
  await page.goto(`file://${path.join(root, 'screens.html')}?s=${name}`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  const png = await page.screenshot({ type: 'png' });
  await sharp(png).resize(600).webp({ quality: 82 }).toFile(path.join(out, `${name}.webp`));
  console.log('rendered', name);
}
await browser.close();
