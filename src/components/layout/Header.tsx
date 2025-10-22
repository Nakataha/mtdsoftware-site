"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

const navigation = [
  { label: "Anasayfa", href: "/" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Projeler", href: "/projeler" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [closeMobileMenu, isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-muted/30 bg-background/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-semibold text-foreground transition-colors hover:text-primary sm:text-xl"
          aria-label="MTD Software anasayfası"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-base font-bold text-primary">
            M
          </span>
          <span className="font-display text-2xl">MTD Software</span>
        </Link>

        <nav className="hidden items-center gap-2 text-sm font-medium text-foreground/80 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/iletisim"
            className="ml-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition-transform hover:-translate-y-0.5"
          >
            Teklif Al
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-muted/60 text-foreground transition-colors hover:border-primary hover:text-primary md:hidden"
          aria-label="Menüyü aç"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[70] flex md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={closeMobileMenu}
            className="h-full w-full bg-black/60"
            aria-label="Menüyü kapat"
          />
          <div className="relative flex h-full w-[min(20rem,85%)] flex-col border-l border-muted/40 bg-white dark:bg-[#0b2036] px-5 py-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold text-foreground"
                onClick={closeMobileMenu}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                  M
                </span>
                <span className="font-display text-xl">MTD Software</span>
              </Link>
              <button
                type="button"
                onClick={closeMobileMenu}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-muted/60 text-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="Menüyü kapat"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-2 text-base font-medium text-foreground/80">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3 transition-colors hover:bg-primary/10 hover:text-primary"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-8">
              <Link
                href="/iletisim"
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-primary/30 transition-transform hover:-translate-y-0.5"
                onClick={closeMobileMenu}
              >
                Teklif Al
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
