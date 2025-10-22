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
    <header className="sticky top-0 z-50 border-b border-muted/30 bg-background/90 backdrop-blur">
      <div className="container mx-auto flex max-w-6xl flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-foreground transition-colors hover:text-primary sm:text-xl"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-base font-bold text-primary">
            M
          </span>
          <span className="font-display text-2xl">MTD Software</span>
        </Link>
        <nav className="w-full sm:w-auto">
          <ul className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-foreground/80 sm:justify-end">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-2 transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="w-full sm:w-auto sm:ml-3">
              <Link
                href="/iletisim"
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition-transform hover:-translate-y-0.5"
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
