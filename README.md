# MTD Software Website

Next.js App Router project deployed to Vercel. The production domain is served behind Cloudflare with Turnstile enabled on lead forms.

## Local development

```bash
npm install
npm run dev
```

The development server runs on [http://localhost:3000](http://localhost:3000). Environment variables such as `NEXT_PUBLIC_TURNSTILE_SITEKEY` and `TURNSTILE_SECRET` can be provided through a local `.env` file.

## Security

### Content Security Policy (CSP)

The site now uses a nonce-based CSP that is generated once per request in `src/middleware.ts`. The middleware is the single authority that sets all security headers and forwards the nonce to the rendering tree. Any legacy CSP configurations in Vercel or Cloudflare **must remain disabled** (no Transform Rules or additional response headers), otherwise duplicate policies can appear and block scripts.

- **Nonce flow:** `middleware` creates a nonce via `generateNonce()` (`src/lib/security/csp.ts`), injects it into the upstream request as the `x-csp-nonce` header, and applies the CSP header built by `createSecurityHeaders()`. Layouts or pages can read the nonce with `headers().get("x-csp-nonce")` and pass it to `<Script nonce={...}>` props so that Next.js bootstrap scripts, JSON-LD payloads, and Cloudflare Turnstile loaders stay whitelisted.
- **Environment handling:**
  - Production enforces `Content-Security-Policy` with `default-src 'self'; script-src 'self' 'strict-dynamic' 'nonce-<nonce>' https: http:;` plus the minimum Turnstile origins (`challenges.cloudflare.com`, `*.turnstilecaptcha.com`, `*.cloudflareinsights.com`). `unsafe-inline` is not present in production.
  - Preview and development automatically run the same policy in `Content-Security-Policy-Report-Only` mode and append `unsafe-inline`/`unsafe-eval` allowances so hot reloading continues to work.
- **Report-Only toggle:** Set `CSP_REPORT_ONLY=true` in Vercel/Cloudflare environment variables to force Report-Only mode in production during the initial rollout. Remove the variable (or set it to `false`) after confirming that browser consoles are free of CSP violations.
- **Verification:**
  - Run `npm run build` locally; the build must succeed without altering SSR flows.
  - After deploying, confirm via `curl -I https://mtdsoftware.com.tr` that exactly one CSP header is returned and it contains the runtime nonce.
  - Load `/iletisim` in production to verify that the Cloudflare Turnstile widget renders and form submissions succeed without console CSP errors.

The middleware matcher skips API routes and static asset paths, so HTML responses alone carry the CSP. Adjust `TURNSTILE_*` host lists in `src/lib/security/csp.ts` if Cloudflare introduces new origins.
