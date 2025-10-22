import Link from "next/link";

const legalLinks = [
  { label: "KVKK", href: "/kvkk" },
  { label: "Çerez Politikası", href: "/cerez" },
];

export default function Footer() {
  return (
    <footer className="border-t border-muted/40 bg-background/95">
      <div className="container flex flex-col gap-8 py-12 text-sm text-foreground/70 md:flex-row md:justify-between">
        <div className="max-w-md space-y-3">
          <p className="font-display text-xl font-semibold text-foreground">
            MTD Software
          </p>
          <p>
            Modern web projeleri, SaaS ürünleri ve teknik danışmanlık sunan freelance
            yazılım geliştiricisi.
          </p>
          <div className="flex flex-wrap gap-4 text-foreground/60">
            <Link href="mailto:info@mtdsoftware.com" className="hover:text-primary">
              info@mtdsoftware.com
            </Link>
            <span className="hidden md:inline" aria-hidden="true">
              ·
            </span>
            <Link href="tel:+905551112233" className="hover:text-primary">
              +90 555 111 22 33
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-wide text-foreground/50">
            Kurumsal
          </p>
          <ul className="space-y-2">
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
