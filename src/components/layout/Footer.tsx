import Link from "next/link";

const legalLinks = [
  { label: "KVKK", href: "/kvkk" },
  { label: "Çerez Politikası", href: "/cerez" },
];

export default function Footer() {
  return (
    <footer className="border-t border-muted/30 bg-background/95">
      <div className="container mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 text-sm text-foreground/70 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md space-y-4 text-center md:text-left">
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-start">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-lg font-semibold text-primary">
              MTD
            </span>
            <p className="font-display text-2xl font-semibold text-foreground">MTD Software</p>
          </div>
          <p>
            Modern web projeleri, SaaS ürünleri ve teknik danışmanlıkla ekiplerinizi güçlendiren freelance yazılım geliştiricisi.
          </p>
          <div className="flex flex-col items-center gap-2 text-foreground/60 md:flex-row md:flex-wrap md:justify-start md:gap-4">
            <Link href="mailto:info@mtdsoftware.com.tr" className="transition-colors hover:text-primary">
              info@mtdsoftware.com.tr
            </Link>
            <span className="hidden md:inline" aria-hidden="true">
              ·
            </span>
            <Link href="tel:+905070082734" className="transition-colors hover:text-primary">
              +90 507 008 27 34
            </Link>
          </div>
        </div>
        <div className="space-y-5 text-center md:text-left">
          <p className="text-xs uppercase tracking-wide text-foreground/50">Kurumsal</p>
          <ul className="grid gap-3 text-foreground/70 sm:grid-cols-2 md:flex md:flex-col">
            <li>
              <Link href="/projeler" className="transition-colors hover:text-primary">
                Projeler
              </Link>
            </li>
            <li>
              <Link href="/hizmetler" className="transition-colors hover:text-primary">
                Hizmetler
              </Link>
            </li>
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-foreground/40">
            © {new Date().getFullYear()} MTD Software. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
