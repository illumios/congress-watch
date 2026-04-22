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
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[color:var(--border)] bg-white/95 shadow-[0_-10px_28px_rgba(15,45,76,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-[30rem] grid-cols-5 gap-1 px-3 py-2">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-[1rem] px-2 py-2 text-center text-[0.72rem] font-semibold tracking-[0.02em] transition-colors ${
                active ? "bg-[var(--navy)] shadow-[0_10px_18px_rgba(15,45,76,0.16)]" : "text-[var(--muted)]"
              }`}
            >
              <span className={active ? "text-white" : "text-[var(--muted)]"}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
