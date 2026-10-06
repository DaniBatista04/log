"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Demandas" },
  { href: "/projetos", label: "Projetos" },
  { href: "/metricas", label: "Métricas" },
  { href: "/arquivo", label: "Arquivo 3D" },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Log<span className="text-ink-3"> / Hub</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 transition-colors ${
                  active
                    ? "bg-surface-2 font-medium text-ink"
                    : "text-ink-2 hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
