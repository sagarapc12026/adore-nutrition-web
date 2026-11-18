import 'server-only';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const LIMIT = 5;
const WINDOW_MS = 60_000;

let upstash: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  upstash = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(LIMIT, '60 s'),
    prefix: 'adore:waitlist',
  });
}

// In-memory LRU fallback: fine for a single instance / dev. Serverless instances
// each keep their own map, so configure Upstash for real protection in production.
const MAX_KEYS = 5000;
const hits = new Map<string, number[]>();

function memoryLimit(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.delete(key); // re-insert to mark as most recently used
  hits.set(key, recent);
  if (hits.size > MAX_KEYS) {
    const oldest = hits.keys().next().value;
    if (oldest !== undefined) hits.delete(oldest);
  }
  return recent.length <= LIMIT;
}

export async function rateLimit(key: string): Promise<boolean> {
  if (upstash) {
    try {
      const { success } = await upstash.limit(key);
      return success;
    } catch (err) {
      console.error('[rate-limit] upstash failed, using memory', err);
    }
  }
  return memoryLimit(key);
}
