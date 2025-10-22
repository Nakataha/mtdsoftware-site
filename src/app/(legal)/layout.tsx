import type { ReactNode } from "react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return <div className="container max-w-4xl py-20">{children}</div>;
}
