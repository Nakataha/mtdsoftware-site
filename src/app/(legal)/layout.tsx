import type { ReactNode } from "react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-muted/60 bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,theme(colors.primary)/12%,transparent_55%)]"
      />
      <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-12 px-4 py-20 text-sm text-foreground/75 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
