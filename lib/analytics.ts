// Plausible event helpers. Plausible is cookieless, so no consent banner is needed.
// Every call is a no-op when the script isn't loaded (dev, ad blockers, no domain set).

export type CtaLocation = 'hero' | 'mid' | 'cta' | 'footer' | 'nav' | 'journal' | 'article';

type EventMap = {
  waitlist_submit_attempt: { source: string };
  waitlist_submit_success: { source: string; ref?: string };
  waitlist_submit_error: { source: string; reason: string };
  nav_link_click: { label: string };
  cta_click: { location: CtaLocation };
};

type PlausibleFn = (event: string, options?: { props?: Record<string, string> }) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn & { q?: unknown[] };
  }
}

export function track<E extends keyof EventMap>(event: E, props: EventMap[E]): void {
  if (typeof window === 'undefined') return;
  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(props)) if (v != null && v !== '') clean[k] = String(v);
  try {
    window.plausible?.(event, { props: clean });
  } catch {
    /* analytics must never break the page */
  }
  if (process.env.NODE_ENV === 'development') console.debug('[analytics]', event, clean);
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;
const STORAGE_KEY = 'adore_utm';

/** First-touch UTM params: captured from the URL, kept for the browser session. */
export function getUtm(): Utm {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Utm = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) fromUrl[k] = v.slice(0, 100);
  }
  try {
    if (Object.keys(fromUrl).length) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Utm) : {};
  } catch {
    return fromUrl;
  }
}

/** utm_source if present, otherwise the external referrer's host. */
export function getRef(utm: Utm): string | undefined {
  if (utm.utm_source) return utm.utm_source;
  if (typeof document === 'undefined' || !document.referrer) return undefined;
  try {
    const host = new URL(document.referrer).host;
    return host && host !== window.location.host ? host : undefined;
  } catch {
    return undefined;
  }
}
