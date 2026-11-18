import 'server-only';
import { unstable_cache } from 'next/cache';
import type { WaitlistRequest } from './waitlist-schema';

type Provider = 'launchlist' | 'resend' | 'console';
export type AddResult = { ok: true; duplicate?: boolean } | { ok: false; error: string };

export function getProvider(): Provider {
  const p = process.env.WAITLIST_PROVIDER?.toLowerCase();
  if (p === 'launchlist' || p === 'resend') return p;
  return 'console';
}

const TIMEOUT_MS = 8000;

/* ---------------------------------- Resend ---------------------------------- */
// Docs: https://resend.com/docs/api-reference/contacts/create-contact
async function addToResend(entry: WaitlistRequest): Promise<AddResult> {
  const key = process.env.RESEND_API_KEY;
  const audience = process.env.RESEND_AUDIENCE_ID;
  if (!key || !audience) return { ok: false, error: 'Resend is not configured' };

  const res = await fetch(`https://api.resend.com/audiences/${audience}/contacts`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: entry.email, unsubscribed: false }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: 'no-store',
  });
  if (res.ok) return { ok: true };
  const body = await res.text().catch(() => '');
  if (res.status === 409 || /already exists/i.test(body)) return { ok: true, duplicate: true };
  console.error('[waitlist] resend error', res.status, body.slice(0, 300));
  return { ok: false, error: 'provider_error' };
}

async function countResend(): Promise<number | null> {
  const key = process.env.RESEND_API_KEY;
  const audience = process.env.RESEND_AUDIENCE_ID;
  if (!key || !audience) return null;
  const res = await fetch(`https://api.resend.com/audiences/${audience}/contacts`, {
    headers: { Authorization: `Bearer ${key}` },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { data?: { unsubscribed?: boolean }[] };
  return Array.isArray(json.data) ? json.data.filter((c) => !c.unsubscribed).length : null;
}

/* -------------------------------- LaunchList -------------------------------- */
// LaunchList accepts submissions on its per-form endpoint (https://getlaunchlist.com/s/<key>).
// Extra fields (source, ref, utm_*) are stored alongside the email on the signup.
async function addToLaunchList(entry: WaitlistRequest): Promise<AddResult> {
  const key = process.env.LAUNCHLIST_API_KEY;
  if (!key) return { ok: false, error: 'LaunchList is not configured' };

  const form = new URLSearchParams({ email: entry.email, source: entry.source });
  if (entry.ref) form.set('ref', entry.ref);
  for (const [k, v] of Object.entries(entry.utm ?? {})) form.set(k, v);

  const res = await fetch(`https://getlaunchlist.com/s/${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body: form,
    redirect: 'manual', // a 3xx means the form accepted the submission and redirected
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: 'no-store',
  });
  if (res.ok || (res.status >= 300 && res.status < 400)) return { ok: true };
  const body = await res.text().catch(() => '');
  if (/already/i.test(body)) return { ok: true, duplicate: true };
  console.error('[waitlist] launchlist error', res.status, body.slice(0, 300));
  return { ok: false, error: 'provider_error' };
}

async function countLaunchList(): Promise<number | null> {
  const url = process.env.LAUNCHLIST_COUNT_URL;
  if (!url) return null;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS), cache: 'no-store' });
  if (!res.ok) return null;
  const json = (await res.json()) as Record<string, unknown>;
  const n = json.count ?? json.total ?? json.subscribers;
  return typeof n === 'number' ? n : null;
}

/* --------------------------------- Public API -------------------------------- */
export async function addToWaitlist(entry: WaitlistRequest): Promise<AddResult> {
  const provider = getProvider();
  try {
    if (provider === 'resend') return await addToResend(entry);
    if (provider === 'launchlist') return await addToLaunchList(entry);
    if (process.env.NODE_ENV === 'production') {
      console.error('[waitlist] WAITLIST_PROVIDER is not set — signup was not stored');
      return { ok: false, error: 'not_configured' };
    }
    console.info('[waitlist] (dev, no provider) new signup', entry);
    return { ok: true };
  } catch (err) {
    console.error('[waitlist] request failed', err);
    return { ok: false, error: 'provider_unreachable' };
  }
}

/** Live signup count, cached for five minutes. Returns null if it can't be known honestly. */
export const getWaitlistCount = unstable_cache(
  async (): Promise<number | null> => {
    let count: number | null = null;
    try {
      const provider = getProvider();
      if (provider === 'resend') count = await countResend();
      else if (provider === 'launchlist') count = await countLaunchList();
    } catch (err) {
      console.error('[waitlist] count failed', err);
    }
    if (count != null) return count;
    const fallback = Number(process.env.WAITLIST_FALLBACK_COUNT);
    return Number.isFinite(fallback) && fallback > 0 ? fallback : null;
  },
  ['waitlist-count'],
  { revalidate: 300, tags: ['waitlist-count'] },
);
