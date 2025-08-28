import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-foreground/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between p-4 md:px-6 lg:px-8 text-sm">
        <p className="mb-2 sm:mb-0">© {new Date().getFullYear()} MTD Software</p>
        <nav>
          <ul className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <li>
              <Link href="#" className="hover:underline">
                Gizlilik
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                KVKK
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Kullanım Şartları
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
