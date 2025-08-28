import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-background text-foreground border-b border-foreground/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between p-4 md:px-6 lg:px-8">
        <Link href="/" className="text-xl font-semibold">MTD Software</Link>
        <nav className="mt-2 sm:mt-0">
          <ul className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <li>
              <Link href="/hakkimizda" className="hover:underline">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/hizmetler" className="hover:underline">
                Hizmetler
              </Link>
            </li>
            <li>
              <Link href="/iletisim" className="hover:underline">
                İletişim
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
