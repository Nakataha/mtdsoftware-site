import Link from "next/link";

const navigation = [
  { label: "Anasayfa", href: "/" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Projeler", href: "/projeler" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-muted/40 bg-background/95 backdrop-blur">
      <div className="container flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="font-display text-2xl font-semibold text-foreground hover:text-primary transition-colors"
        >
          MTD Software
        </Link>
        <nav className="w-full sm:w-auto">
          <ul className="flex flex-wrap items-center gap-3 text-sm font-medium text-foreground/80">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-1.5 transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="w-full sm:w-auto sm:ml-4">
              <Link
                href="/iletisim"
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Teklif Al
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
