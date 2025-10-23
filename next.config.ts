import crypto from "crypto";
import type { NextConfig } from "next";

import { inlineScripts } from "./src/security/inline-content";

const scriptHashes = Object.values(inlineScripts).map((content) =>
  `sha256-${crypto.createHash("sha256").update(content).digest("base64")}`
);

const cspDirectives = [
  "default-src 'self'",
  [
    "script-src",
    "'self'",
    "https://challenges.cloudflare.com",
    "https://*.turnstilecaptcha.com",
    ...scriptHashes,
  ].join(" "),
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self' https://challenges.cloudflare.com https://*.turnstilecaptcha.com",
  "frame-src 'self' https://challenges.cloudflare.com https://*.turnstilecaptcha.com",
  "worker-src 'self'",
  "media-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
];

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
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
  {
    key: "Content-Security-Policy",
    value: cspDirectives.join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
