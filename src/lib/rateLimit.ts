import type { NextRequest } from "next/server";

// Shared defaults allow rate limiting to work even without environment configuration.
const DEFAULT_WINDOW_SECONDS = 60;
const DEFAULT_MAX_REQUESTS = 5;

const windowSeconds = (() => {
  const raw = process.env.RATE_LIMIT_WINDOW_SEC;
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_WINDOW_SECONDS;
})();

const maxRequests = (() => {
  const raw = process.env.RATE_LIMIT_MAX;
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_MAX_REQUESTS;
})();

const windowMilliseconds = windowSeconds * 1000;
const FALLBACK_IP = "127.0.0.1";

type Bucket = {
  timestamps: number[];
};

type ClientIp = {
  ip: string;
  isFallback: boolean;
};

const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  limited: boolean;
  remaining: number;
  limit: number;
  reset: number;
  key: string;
  ip: string;
  isFallback: boolean;
};

// Resolve the best-effort client IP using only headers so the logic works in Edge and Node runtimes.
export function extractClientIp(req: NextRequest): ClientIp {
  const headers = req.headers;

  const candidates = [
    headers.get("cf-connecting-ip"),
    headers.get("x-forwarded-for")?.split(",")[0],
    headers.get("x-real-ip"),
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (value) {
      return { ip: value, isFallback: false };
    }
  }

  return { ip: FALLBACK_IP, isFallback: true };
}

// Apply a simple sliding-window rate limit per scope + method + IP combination.
export function consumeRateLimit(scope: string, req: NextRequest): RateLimitResult {
  const method = req.method ?? "GET";
  const { ip, isFallback } = extractClientIp(req);
  const key = `${scope}:${method}:${ip}`;
  const now = Date.now();

  const bucket = buckets.get(key) ?? { timestamps: [] };
  buckets.set(key, bucket);

  // Remove timestamps that are outside of the configured window.
  bucket.timestamps = bucket.timestamps.filter(
    (timestamp) => now - timestamp < windowMilliseconds,
  );

  if (bucket.timestamps.length >= maxRequests) {
    const oldest = bucket.timestamps[0];
    const reset = oldest + windowMilliseconds;
    return {
      limited: true,
      remaining: 0,
      limit: maxRequests,
      reset,
      key,
      ip,
      isFallback,
    };
  }

  bucket.timestamps.push(now);

  return {
    limited: false,
    remaining: Math.max(0, maxRequests - bucket.timestamps.length),
    limit: maxRequests,
    reset: now + windowMilliseconds,
    key,
    ip,
    isFallback,
  };
}
