import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="breadcrumb" className="mb-6">
      <ol className="inline-flex flex-wrap items-center gap-2 rounded-full border border-muted/60 bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-foreground/50 shadow-sm shadow-primary/5">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="transition-colors hover:text-primary">
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground/70">{item.label}</span>
              )}
              {!isLast && <span className="text-foreground/30">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

