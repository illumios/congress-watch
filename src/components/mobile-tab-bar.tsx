"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/house", label: "House" },
  { href: "/senate", label: "Senate" },
  { href: "/votes", label: "Votes" },
  { href: "/search", label: "Search" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="mt-4 md:hidden">
      <div className="grid grid-cols-5 gap-1 rounded-[1.1rem] border border-[color:var(--border)] bg-[var(--surface-subtle)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-[1rem] px-2 py-2 text-center text-[0.72rem] font-semibold tracking-[0.02em] transition-colors ${
                active ? "surface-navy shadow-[0_10px_18px_rgba(15,45,76,0.12)]" : "text-[var(--muted)]"
              }`}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
