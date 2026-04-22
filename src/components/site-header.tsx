import Link from "next/link";

const navItems = [
  { href: "/search", label: "Members" },
  { href: "/votes", label: "Votes" },
  { href: "/bills", label: "Bills" },
  { href: "/about#committees", label: "Committees" },
  { href: "/bills", label: "Legislation" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-white/95 text-[var(--ink)] shadow-[0_1px_0_rgba(15,45,76,0.05),0_16px_38px_rgba(15,45,76,0.08)] backdrop-blur supports-[backdrop-filter]:bg-white/88">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-4 sm:px-5 lg:px-8 lg:py-5">
        <div className="flex items-center justify-between gap-4 md:hidden">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div
              className="grid h-11 w-11 shrink-0 grid-rows-[10px_1fr] rounded-[14px] border border-[color:var(--border-strong)] bg-[linear-gradient(180deg,#f8fbff_0%,#eef3fb_100%)] p-2 text-[var(--navy)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
              aria-hidden="true"
            >
              <div className="mx-auto h-0 w-0 border-x-[9px] border-b-[7px] border-x-transparent border-b-current" />
              <div className="grid grid-cols-4 items-end gap-[3px] px-[3px]">
                <span className="h-full rounded-sm bg-current/95" />
                <span className="h-full rounded-sm bg-current/95" />
                <span className="h-full rounded-sm bg-current/95" />
                <span className="h-full rounded-sm bg-current/95" />
              </div>
            </div>

            <div className="min-w-0">
              <p className="truncate font-serif text-[1.65rem] leading-none tracking-[-0.03em] text-[var(--navy)]">Congress.Watch</p>
              <p className="truncate text-[0.9rem] text-[var(--muted)]">Facts. Transparency. Accountability.</p>
            </div>
          </Link>

          <details className="group relative">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-[14px] border border-[color:var(--border)] bg-[var(--surface-subtle)] text-[var(--navy)] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition-colors hover:bg-white">
              <span className="sr-only">Open navigation menu</span>
              <span className="flex flex-col gap-[4px]" aria-hidden="true">
                <span className="block h-[2px] w-5 rounded-full bg-current" />
                <span className="block h-[2px] w-5 rounded-full bg-current" />
                <span className="block h-[2px] w-5 rounded-full bg-current" />
              </span>
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.85rem)] z-50 w-[min(20rem,calc(100vw-2rem))] rounded-[1.25rem] border border-[color:var(--border)] bg-white p-4 shadow-[0_26px_50px_rgba(15,45,76,0.16)]">
              <nav className="grid gap-2 text-[0.98rem] font-medium text-[var(--ink)]">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[0.95rem] px-3 py-3 transition-colors hover:bg-[var(--surface-subtle)] hover:text-[var(--navy)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </details>
        </div>

        <form
          action="/search"
          className="mt-4 flex items-center gap-2 rounded-[16px] border border-[color:var(--border)] bg-[var(--surface-subtle)] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] md:hidden"
        >
          <input
            type="search"
            name="q"
            placeholder="Search members, bills, votes..."
            className="w-full bg-transparent px-1 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] outline-none"
          />
          <button
            type="submit"
            className="inline-flex min-h-10 items-center justify-center rounded-[12px] border border-[color:var(--border)] bg-white px-4 text-sm font-semibold text-[var(--navy)] shadow-[0_1px_0_rgba(255,255,255,0.8)] transition-colors hover:bg-[var(--surface)]"
          >
            Search
          </button>
        </form>

        <div className="hidden gap-4 md:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-8">
          <Link href="/" className="flex items-center gap-3 self-start lg:self-center">
            <div
              className="grid h-12 w-12 grid-rows-[10px_1fr] rounded-[14px] border border-[color:var(--border-strong)] bg-[linear-gradient(180deg,#f8fbff_0%,#eef3fb_100%)] p-2 text-[var(--navy)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
              aria-hidden="true"
            >
              <div className="mx-auto h-0 w-0 border-x-[9px] border-b-[7px] border-x-transparent border-b-current" />
              <div className="grid grid-cols-4 items-end gap-[3px] px-[3px]">
                <span className="h-full rounded-sm bg-current/95" />
                <span className="h-full rounded-sm bg-current/95" />
                <span className="h-full rounded-sm bg-current/95" />
                <span className="h-full rounded-sm bg-current/95" />
              </div>
            </div>

            <div>
              <p className="font-serif text-[2rem] leading-none tracking-[-0.03em] text-[var(--navy)]">Congress.Watch</p>
              <p className="text-sm text-[var(--muted)]">Facts. Transparency. Accountability.</p>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center justify-start gap-x-6 gap-y-2 border-y border-[color:var(--border)] py-3 text-[15px] font-medium text-[var(--ink-soft)] lg:justify-center lg:border-y-0 lg:py-0">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors duration-150 hover:text-[var(--navy)]">
                {item.label}
              </Link>
            ))}
          </nav>

          <form
            action="/search"
            className="flex w-full items-center gap-2 rounded-[16px] border border-[color:var(--border)] bg-[var(--surface-subtle)] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] lg:max-w-[340px]"
          >
            <input
              type="search"
              name="q"
              placeholder="Search members, bills, votes..."
              className="w-full bg-transparent px-1 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] outline-none"
            />
            <button
              type="submit"
              className="inline-flex min-h-10 items-center justify-center rounded-[12px] border border-[color:var(--border)] bg-white px-4 text-sm font-semibold text-[var(--navy)] shadow-[0_1px_0_rgba(255,255,255,0.8)] transition-colors hover:bg-[var(--surface)]"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
