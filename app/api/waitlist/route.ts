import { NextResponse, type NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';
import { waitlistRequestSchema } from '@/lib/waitlist-schema';
import { addToWaitlist } from '@/lib/waitlist';
import { rateLimit } from '@/lib/rate-limit';
import { site } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Body = { ok: boolean; error?: string };

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  return fwd?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

async function logEvent(name: string, props: Record<string, string | undefined>, req: NextRequest) {
  if (process.env.NODE_ENV !== 'production') {
    console.info(`[waitlist] ${name}`, props);
    return;
  }
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return;
  // Server-side Plausible event (no PII — the email is never sent).
  await fetch('https://plausible.io/api/event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': req.headers.get('user-agent') ?? 'adore-server',
      'X-Forwarded-For': clientIp(req),
    },
    body: JSON.stringify({
      name,
      domain,
      url: `${site.url}/api/waitlist`,
      props: Object.fromEntries(Object.entries(props).filter(([, v]) => v)),
    }),
    signal: AbortSignal.timeout(3000),
  }).catch(() => undefined);
}

export async function POST(req: NextRequest): Promise<NextResponse<Body>> {
  if (!(await rateLimit(`ip:${clientIp(req)}`))) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = waitlistRequestSchema.safeParse(json);
  if (!parsed.success) {
    // A filled honeypot looks like success to the bot, but nothing is stored.
    if (parsed.error.issues.some((i) => i.path[0] === 'company')) return NextResponse.json({ ok: true });
    const emailIssue = parsed.error.issues.some((i) => i.path[0] === 'email');
    return NextResponse.json({ ok: false, error: emailIssue ? 'invalid_email' : 'invalid_request' }, { status: 400 });
  }

  const entry = { ...parsed.data, email: parsed.data.email.toLowerCase() };
  const result = await addToWaitlist(entry);

  if (!result.ok) {
    await logEvent('waitlist_server_error', { source: entry.source, reason: result.error }, req);
    return NextResponse.json({ ok: false, error: 'unavailable' }, { status: 502 });
  }

  await logEvent(
    'waitlist_server_signup',
    { source: entry.source, ref: entry.ref, ...entry.utm, duplicate: result.duplicate ? 'yes' : undefined },
    req,
  );
  if (!result.duplicate) revalidateTag('waitlist-count');
  return NextResponse.json({ ok: true });
}
