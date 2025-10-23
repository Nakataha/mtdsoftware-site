import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  CSP_NONCE_HEADER_NAME,
  CSP_REPORT_ONLY_ENV,
  createSecurityHeaders,
  generateNonce,
  resolveCspMode,
  resolveRuntimeEnvironment,
} from "@/lib/security/csp";

function isTruthy(value: string | undefined): boolean {
  if (!value) {
    return false;
  }

  const normalized = value.toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes";
}

export function middleware(request: NextRequest) {
  const nonce = generateNonce();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(CSP_NONCE_HEADER_NAME, nonce);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const environment = resolveRuntimeEnvironment();
  const mode = resolveCspMode(environment, isTruthy(process.env[CSP_REPORT_ONLY_ENV]));

  const securityHeaders = createSecurityHeaders({
    nonce,
    environment,
    mode,
  });

  for (const header of securityHeaders) {
    response.headers.set(header.key, header.value);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api/|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|og).*)",
  ],
};
