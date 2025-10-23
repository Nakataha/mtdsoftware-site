import type { NextRequest } from "next/server";

type BucketState = {
  tokens: number;
  lastRefill: number;
  lastSeen: number;
};

const windowSec = Math.max(
  1,
  Number.parseInt(process.env.RATE_LIMIT_WINDOW_SEC ?? "60", 10)
);
const maxTokens = Math.max(
  1,
  Number.parseInt(process.env.RATE_LIMIT_MAX ?? "5", 10)
);
const windowMs = windowSec * 1000;

const buckets = new Map<string, BucketState>();

function getKeyFromRequest(req: NextRequest): string {
  const cfConnectingIp = req.headers.get("cf-connecting-ip")?.trim();
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const [first] = forwardedFor.split(",");
    if (first) {
      return first.trim();
    }
  }

  return req.ip ?? "unknown";
}

function refill(bucket: BucketState, now: number) {
  const elapsed = now - bucket.lastRefill;
  if (elapsed <= 0) {
    return;
  }

  const tokensToAdd = (elapsed / windowMs) * maxTokens;
  if (tokensToAdd > 0) {
    bucket.tokens = Math.min(maxTokens, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;
  }
}

function pruneStale(now: number) {
  const expiry = windowMs * 2;
  for (const [key, bucket] of buckets) {
    if (now - bucket.lastSeen > expiry) {
      buckets.delete(key);
    }
  }
}

export function getClientIp(req: NextRequest): string {
  return getKeyFromRequest(req);
}

// Test helper: keep limiter logic reusable.
export default function rateLimit(req: NextRequest): boolean {
  const key = getKeyFromRequest(req);
  const now = Date.now();
  const bucket = buckets.get(key) ?? {
    tokens: maxTokens,
    lastRefill: now,
    lastSeen: now,
  };

  refill(bucket, now);

  bucket.lastSeen = now;
  buckets.set(key, bucket);

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    pruneStale(now);
    return true;
  }

  pruneStale(now);
  return false;
}
