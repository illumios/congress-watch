import Link from "next/link";

import {
  MEMBER_CHAMBER_OPTIONS,
  MEMBER_PARTY_OPTIONS,
  MEMBER_SORT_OPTIONS,
  MEMBER_TERM_OPTIONS,
  type MemberBrowseParams,
} from "@/lib/member-browse";

type SelectOption = {
  value: string;
  label: string;
};

export function MemberBrowseControls({
  action,
  values,
  resetHref,
  hiddenInputs = {},
  stateOptions = [],
  resultCount,
  showReset = true,
  showParty = true,
  showState = false,
  showChamber = false,
  showTerm = true,
}: {
  action: string;
  values: MemberBrowseParams;
  resetHref: string;
  hiddenInputs?: Record<string, string | undefined>;
  stateOptions?: SelectOption[];
  resultCount?: number;
  showReset?: boolean;
  showParty?: boolean;
  showState?: boolean;
  showChamber?: boolean;
  showTerm?: boolean;
}) {
  const visibleFieldCount = [
    true,
    showParty,
    showState,
    showChamber,
    showTerm,
  ].filter(Boolean).length;

  const gridClassName =
    visibleFieldCount >= 5
      ? "xl:grid-cols-6"
      : visibleFieldCount === 4
        ? "xl:grid-cols-5"
        : visibleFieldCount === 3
          ? "xl:grid-cols-4"
          : "xl:grid-cols-3";

  return (
    <section className="mt-8 rounded-[1.4rem] border border-[var(--border)] bg-white p-4 shadow-[0_10px_28px_rgba(15,35,58,0.05)] sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.76rem] uppercase tracking-[0.16em] text-[var(--muted)]">Browse Controls</p>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">Sort and filter the current member list.</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          {typeof resultCount === "number" ? <span className="text-[var(--muted)]">{resultCount} shown</span> : null}
          {showReset ? (
            <Link href={resetHref} className="font-medium text-[var(--accent-blue)]">
              Reset
            </Link>
          ) : null}
        </div>
      </div>

      <form action={action} className={`mt-4 grid gap-3 sm:grid-cols-2 ${gridClassName}`}>
        {Object.entries(hiddenInputs).map(([key, value]) =>
          value ? <input key={key} type="hidden" name={key} value={value} /> : null,
        )}

        <label className="block">
          <span className="mb-2 block text-[0.76rem] font-medium uppercase tracking-[0.14em] text-[var(--muted)]">Sort</span>
          <select
            name="sort"
            defaultValue={values.sort}
            className="site-shell-input min-h-12 w-full px-4 text-sm text-[var(--ink)] outline-none"
          >
            {MEMBER_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        {showParty ? (
          <label className="block">
            <span className="mb-2 block text-[0.76rem] font-medium uppercase tracking-[0.14em] text-[var(--muted)]">Party</span>
            <select
              name="party"
              defaultValue={values.party}
              className="site-shell-input min-h-12 w-full px-4 text-sm text-[var(--ink)] outline-none"
            >
              {MEMBER_PARTY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {showState ? (
          <label className="block">
            <span className="mb-2 block text-[0.76rem] font-medium uppercase tracking-[0.14em] text-[var(--muted)]">State</span>
            <select
              name="state"
              defaultValue={values.state}
              className="site-shell-input min-h-12 w-full px-4 text-sm text-[var(--ink)] outline-none"
            >
              <option value="all">All States</option>
              {stateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {showChamber ? (
          <label className="block">
            <span className="mb-2 block text-[0.76rem] font-medium uppercase tracking-[0.14em] text-[var(--muted)]">Chamber</span>
            <select
              name="chamber"
              defaultValue={values.chamber}
              className="site-shell-input min-h-12 w-full px-4 text-sm text-[var(--ink)] outline-none"
            >
              {MEMBER_CHAMBER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {showTerm ? (
          <label className="block">
            <span className="mb-2 block text-[0.76rem] font-medium uppercase tracking-[0.14em] text-[var(--muted)]">Term Window</span>
            <select
              name="term"
              defaultValue={values.term}
              className="site-shell-input min-h-12 w-full px-4 text-sm text-[var(--ink)] outline-none"
            >
              {MEMBER_TERM_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <div className="flex items-end">
          <button type="submit" className="button-primary min-h-12 w-full px-5 text-sm font-semibold">
            Apply
          </button>
        </div>
      </form>
    </section>
  );
}
