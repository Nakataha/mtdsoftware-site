export type SecurityHeader = {
  key: string;
  value: string;
};

export type RuntimeEnvironment = "production" | "preview" | "development" | string;

export type CspMode = "enforce" | "report-only";

export const CSP_NONCE_HEADER_NAME = "x-csp-nonce";
export const CSP_REPORT_ONLY_ENV = "CSP_REPORT_ONLY";

const TURNSTILE_SCRIPT_SOURCES = [
  "https://challenges.cloudflare.com",
  "https://*.turnstilecaptcha.com",
  "https://*.cloudflareinsights.com",
] as const;

const TURNSTILE_FRAME_SOURCES = ["https://challenges.cloudflare.com"] as const;

const BASE_SECURITY_HEADERS: SecurityHeader[] = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), ambient-light-sensor=(), autoplay=(), camera=(), cross-origin-isolated=(), display-capture=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), sync-xhr=(), usb=(), xr-spatial-tracking=()",
  },
];

function toBase64(value: Uint8Array): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value).toString("base64");
  }

  let binary = "";
  value.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}

export function generateNonce(size = 16): string {
  const cryptoObj = globalThis.crypto;
  if (!cryptoObj || typeof cryptoObj.getRandomValues !== "function") {
    throw new Error("Web Crypto API is not available to generate a CSP nonce.");
  }

  const randomValues = new Uint8Array(size);
  cryptoObj.getRandomValues(randomValues);

  return toBase64(randomValues);
}

export function resolveRuntimeEnvironment(): RuntimeEnvironment {
  return (
    (process.env.VERCEL_ENV as RuntimeEnvironment | undefined) ??
    (process.env.NODE_ENV as RuntimeEnvironment | undefined) ??
    "development"
  );
}

export function resolveCspMode(
  environment: RuntimeEnvironment,
  forceReportOnly: boolean
): CspMode {
  if (forceReportOnly) {
    return "report-only";
  }

  return environment === "production" ? "enforce" : "report-only";
}

export function buildContentSecurityPolicy(
  nonce: string,
  environment: RuntimeEnvironment
): string {
  const isProduction = environment === "production";

  const scriptSources = unique([
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    "https:",
    "http:",
    ...TURNSTILE_SCRIPT_SOURCES,
  ]);

  if (!isProduction) {
    scriptSources.push("'unsafe-inline'", "'unsafe-eval'");
  }

  const connectSources = unique([
    "'self'",
    "https:",
    "wss:",
    ...TURNSTILE_SCRIPT_SOURCES,
  ]);

  const frameSources = unique(["'self'", ...TURNSTILE_FRAME_SOURCES]);

  const directives = [
    "default-src 'self'",
    `script-src ${scriptSources.join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' https: data:",
    `connect-src ${connectSources.join(" ")}`,
    `frame-src ${frameSources.join(" ")}`,
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'self'",
    "form-action 'self'",
  ];

  if (isProduction) {
    directives.push("upgrade-insecure-requests");
  }

  return directives.join("; ");
}

export function createSecurityHeaders(options: {
  nonce: string;
  environment: RuntimeEnvironment;
  mode: CspMode;
}): SecurityHeader[] {
  const { nonce, environment, mode } = options;
  const policy = buildContentSecurityPolicy(nonce, environment);

  const headers: SecurityHeader[] = [...BASE_SECURITY_HEADERS];

  if (mode === "report-only") {
    headers.push({ key: "Content-Security-Policy-Report-Only", value: policy });
  } else {
    headers.push({ key: "Content-Security-Policy", value: policy });
  }

  return headers;
}

function unique<T>(sources: T[]): T[] {
  return Array.from(new Set(sources));
}
