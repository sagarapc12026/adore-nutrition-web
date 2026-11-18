# Adore Nutrition — website

The marketing site and Journal for **Adore Nutrition**. Next.js 14 (App Router), TypeScript (strict), Tailwind CSS 3.4, MDX.

> _For the love of every little bite._

---

## 1. The strategic frame

**What we're actually selling:** not a nutrition tracker, not an AI tool, not "data about your child's diet." We're selling **the feeling of being in control again.** A mom's perceived control is the single biggest mediator of parenting anxiety. Every visitor to this site is, at some level, anxious about whether they're feeding their child well. She scrolled here at 11pm, on her phone, with a toddler asleep next to her, after Googling "is my 14-month-old eating enough iron."

The hero must answer her question — _"is this for me?"_ — in under three seconds, and the answer must feel like _yes, finally, someone gets it._

### Brand voice

1. Talk to her, never about children in the abstract. "Your little one," not "toddlers."
2. Use "mama" sparingly — once or twice per page maximum.
3. Acknowledge the hard before you offer the help.
4. No exclamation points. No emoji in body copy (a single 🍑 in the footer is fine).
5. Never claim medical authority. "Built on pediatric nutrition guidelines" — never "doctor-approved."
6. Italic serif accent words land emotionally: _every little bite_, _that's it_, _anytime_.

### What we will not do

- No stock photos of smiling moms with babies.
- No "AI" as a headline marketing term. Moms care about not having to think.
- No countdown timers or fake scarcity. Trust > tactics.
- No "Trusted by 10,000 mothers" until it's true. Small honest numbers only.
- No carousels. No popups. The form is always visible; it never interrupts.

### The only test that matters

A mom opens the site at 11pm, exhausted, on her phone. In her first six seconds she must **feel seen** (the hero describes her exact moment), **feel calm** (peach palette, whitespace, soft serif italics), and **feel safe enough to trust the form** (visible without scrolling, thumb-sized, "no spam" promise).

---

## 2. Getting started

Requires Node 18.18+ (Node 20+ recommended) and pnpm.

```bash
git clone <your-repo-url> adore-nutrition-web
cd adore-nutrition-web
pnpm install
cp .env.example .env.local
pnpm dev
```

Open http://localhost:3000.

With no `WAITLIST_PROVIDER` set, **development** signups are logged to the terminal so the form works end-to-end locally. In **production** an unset provider is treated as an error (the form shows a gentle "try again" message) so signups are never silently dropped.

### Environment variables

| Variable | Required | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes (prod) | Canonical URL for metadata, sitemap, JSON-LD. Defaults to `https://adorenutrition.app`. |
| `WAITLIST_PROVIDER` | yes (prod) | `resend` or `launchlist`. |
| `RESEND_API_KEY` | if Resend | API key from resend.com → API Keys. |
| `RESEND_AUDIENCE_ID` | if Resend | Audience ID from resend.com → Audiences. |
| `LAUNCHLIST_API_KEY` | if LaunchList | Your LaunchList form key (the `<key>` in `https://getlaunchlist.com/s/<key>`). |
| `LAUNCHLIST_COUNT_URL` | optional | A LaunchList endpoint that returns your signup count as JSON (`{ count }` or `{ total }`). |
| `WAITLIST_FALLBACK_COUNT` | optional | Number shown in "N mamas already on the list" **only if** the live count can't be fetched. Leave blank to hide the number rather than guess. |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | recommended (prod) | Enables durable rate limiting. Without them an in-memory limiter is used (per instance). |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | optional | Enables Plausible analytics (cookieless — no consent banner). |
| `NEXT_PUBLIC_PLAUSIBLE_SRC` | optional | Script URL. Defaults to Plausible's `script.tagged-events.js`; point at a proxy or self-hosted instance if you have one. |

### Switching waitlist providers

The provider is chosen at runtime from `WAITLIST_PROVIDER` — no code changes:

```bash
# Resend Audiences
WAITLIST_PROVIDER=resend
RESEND_API_KEY=re_...
RESEND_AUDIENCE_ID=...

# or LaunchList
WAITLIST_PROVIDER=launchlist
LAUNCHLIST_API_KEY=your-form-key
```

Both integrations live in `lib/waitlist.ts`. Duplicate emails are treated as success (she's already on the list — no reason to show an error). Before launch, send one real test signup through your chosen provider and confirm it appears in the dashboard; both vendors occasionally revise their APIs.

**Attribution:** every signup carries `source` (`hero` / `cta` / `newsletter` / `article`), `ref` (`utm_source`, or the referring host), and all `utm_*` params (first touch, kept for the session). LaunchList stores these as fields on the signup. Resend contacts only hold the email, so attribution is recorded as a server-side Plausible event (`waitlist_server_signup`) — the email itself is never sent to analytics.

### The `/api/waitlist` endpoint

`POST { email, source, ref?, utm? }` → `{ ok: boolean, error?: string }`

- Validated with zod (`lib/waitlist-schema.ts`); emails are trimmed and lower-cased.
- Rate-limited to 5 requests per minute per IP (Upstash if configured, otherwise in-memory LRU).
- Hidden honeypot field: bots that fill it get `{ ok: true }` and nothing is stored.
- Logs to the console in development and to Plausible (server-side events) in production.
- A successful signup revalidates the cached signup count.

---

## 3. Deployment

### Vercel (recommended)

1. Push this repo to GitHub.
2. Import it at vercel.com/new — the framework is detected automatically.
3. Add the environment variables above (Production + Preview).
4. Deploy. Add your domain and set `NEXT_PUBLIC_SITE_URL` to it.

### Self-hosted

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm start   # serves on PORT (default 3000)
```

Run it behind a reverse proxy that sets `X-Forwarded-For` so rate limiting sees real client IPs.

---

## 4. Adding a Journal article

Drop an MDX file into `content/blog/`. The filename is the slug.

```mdx
---
title: Five iron-rich lunches toddlers actually eat
excerpt: Tested at real tables, with real refusals.
kicker: Nutrition
category: nutrition-basics   # nutrition-basics | picky-eaters | growth-milestones | allergies | from-the-founder
readingTime: 4 min read
emoji: 🍲
image: /journal/iron-rich-lunches-toddlers-eat.webp   # optional cover photo in public/journal/
imageAlt: A bowl of lentils and grains with roasted vegetables
tint: peach                  # peach | blush | sage | cream
date: 2026-12-07
author: The Adore team
featured: false
---

Your opening paragraph gets a Fraunces drop cap automatically.

<PullQuote>A line worth pausing on.</PullQuote>

<WaitlistCallout />
```

That's it — `/blog/<slug>` is generated at build, and the article appears on `/blog` and in the sitemap.

- `PullQuote` and `WaitlistCallout` are available in every MDX file without importing (see `mdx-components.tsx`).
- `content/articles.ts` is an optional registry for **planned** articles. Entries without an `.mdx` file render a "coming soon" page (marked `noindex`) and a "Coming soon" label on the Journal grid. When the MDX file lands, it publishes automatically and its frontmatter wins.
- Category chips link to `/blog?category=<slug>`; the filter itself is stubbed in `lib/articles.ts → filterArticles()` for v2.

---

## 5. Customizing the look

- **Colors, radii, shadows, animation:** `tailwind.config.ts` → `theme.extend`. Use the tokens; don't add new ones casually.
- **Fonts:** `lib/fonts.ts` (Fraunces variable with the `opsz` axis + Plus Jakarta Sans via `next/font`). They're exposed as `--font-fraunces` / `--font-jakarta` and mapped to `font-display` / `font-sans`.
- **Global type styles:** `app/globals.css` — `.display-xl/lg/md`, `.eyebrow`, `.accent` (italic accent word), and `.prose-article` (Journal body, drop cap).
- **Italic accent colour:** one variable, `--accent`, in `app/globals.css`.
- **Journal cover photos:** `public/journal/<slug>.webp`, referenced by `image` / `imageAlt` in `content/articles.ts` or an article's frontmatter. Leave `image` out and the card falls back to the emoji on a tint. Current photos are from Unsplash (see `CREDITS.md`); `pnpm photos` re-downloads them.
- **App screens:** `public/screens/*.webp`. The current files are designed placeholders (with real food photos in the meal-logging and dashboard screens) generated from `scripts/screens.html`. Replace them with real screenshots using the **same filenames** (portrait, ~600×1298). To regenerate the placeholders: `NODE_PATH=$(npm root -g) pnpm screens` (needs Playwright).
- **OG image:** `app/opengraph-image.tsx` (fonts in `lib/og-fonts/`).

### Accessibility adjustments to the brand palette

Several pairings in the original brief fall below WCAG AA contrast, so text uses darker steps of the **same** peach scale. No new colours were introduced:

| Use | Brief | Shipped | Why |
| --- | --- | --- | --- |
| Italic accent words in headlines | peach-500 | **peach-600** | peach-500 on cream is 2.7:1 (fails even the 3:1 large-text rule); peach-600 is 3.8:1. |
| Small peach text (eyebrows, pills, tags, signature, links) | peach-500/600 | **peach-700** | 5.4–6.3:1 at 11–18px. |
| White text on buttons | on peach-500 | **peach-600 → 700 gradient** | white on peach-500 is 3.0:1. |
| Form error text | coral | **coral icon + border, ink text** | coral on cream is 3.6:1. |
| "Nutrition" in the wordmark | — | 24px | so peach-600 qualifies as large text. |

To revert any of these, change `--accent` or the relevant class — but the Lighthouse accessibility score will drop below 100.

---

## 6. Performance & accessibility commitments

| Budget | Target | Measured (local prod build, Lighthouse 12) |
| --- | --- | --- |
| Lighthouse mobile — Performance | > 95 | **~91** landing, 95 Journal/article |
| Lighthouse — Accessibility / Best Practices / SEO | 100 / 100 / 100 | **100 / 100 / 100** (all pages) |
| Lighthouse desktop — Performance | — | **99** |
| LCP (simulated slow 4G, mobile) | < 1.5 s | ~3.3 s simulated; ~0.9 s measured with 4× CPU and 1.6 Mbps throttling in Chromium |
| CLS | < 0.05 | **0–0.007** |
| First Load JS (landing) | < 90 KB | **122 KB** (87 KB of it is the Next.js 14 runtime shared by every page) |

The 90 KB first-load budget can't be met by any Next.js 14 App Router page, because the framework runtime alone is 87.3 KB. What we control is kept lean:

- Framer Motion loads through `LazyMotion` with features fetched after hydration, and is used only for scroll reveals.
- The form's success scale-fade and error shake are CSS keyframes, not Framer.
- zod is fetched when the email field is first focused, not with the page.
- Client components use inline SVG icons; lucide-react only appears in server components, so it ships no JS.

Lighthouse's simulated mobile LCP counts every byte requested before the hero paragraph paints: fonts (about 170 KB of variable Fraunces + Jakarta), CSS and JS. The biggest remaining lever is self-hosting static (non-variable) Fraunces cuts, at the cost of the `opsz` axis.

**Accessibility:** skip link; every control keyboard-reachable with visible focus; the mobile menu traps focus and closes on Escape; form inputs are labelled, `aria-invalid`/`aria-describedby` are wired, success is announced via `aria-live` and focus moves to the confirmation; decorative emoji and imagery are `aria-hidden`; **`prefers-reduced-motion` makes every animation instant** (Framer via `MotionConfig`, CSS via a global media query).

---

## 7. Analytics events (Plausible)

`waitlist_submit_attempt` · `waitlist_submit_success` · `waitlist_submit_error` (with `reason`) · `nav_link_click` (with `label`) · `cta_click` (with `location`: `nav`, `hero`, `cta`, `footer`, `journal`, `article`; wrap any new CTA link in `components/tracked-link.tsx`, e.g. with `mid`) — helpers in `lib/analytics.ts`. Plus server-side `waitlist_server_signup` / `waitlist_server_error` with source and UTM props.

The "N mamas already on the list" count comes from the provider's API, cached for five minutes with `unstable_cache` and revalidated after each new signup.

---

## Project map

```
app/                 routes, metadata, OG image, sitemap, robots, API
components/          page sections + ui/ primitives (button, pill-badge, phone-frame)
content/             voices.ts, articles.ts, blog/*.mdx
lib/                 fonts, analytics, waitlist providers, rate limit, articles loader
public/screens/      app screenshots (placeholders — replace with real ones)
scripts/             placeholder screen generator
```

**Before launch:** have `/privacy` and `/terms` reviewed (they're plain-language drafts), replace the placeholder screens, confirm the social handles in `lib/site.ts`, and confirm the beta testers are happy to be quoted by first name.
