import Link from "next/link";

import { PageIntro } from "@/components/page-intro";
import { formatDisplayDate, getBills } from "@/lib/congress-data";

export default async function BillsPage() {
  const bills = await getBills(36);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-4 sm:px-5 sm:pt-6 lg:px-8 lg:pb-14 lg:pt-12">
      <section className="rounded-[1.7rem] border border-[var(--border)] bg-white p-5 shadow-[0_18px_48px_rgba(15,35,58,0.08)] sm:p-6">
        <PageIntro
          eyebrow="Bills"
          title="Recent legislation in the current Congress"
          description="Browse recent legislation and follow each bill back to its official source, title, policy area, and latest recorded action."
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[1rem] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3">
            <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--muted)]">Loaded</p>
            <p className="mt-2 font-serif text-[1.9rem] leading-none text-[var(--ink)]">{bills.length}</p>
          </div>
          <div className="rounded-[1rem] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3">
            <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--muted)]">Latest action</p>
            <p className="mt-2 text-sm leading-6 text-[var(--ink)]">Official recorded updates</p>
          </div>
          <div className="rounded-[1rem] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3">
            <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--muted)]">Scope</p>
            <p className="mt-2 text-sm leading-6 text-[var(--ink)]">Current Congress legislation only</p>
          </div>
        </div>
      </section>

      <div className="mt-6 space-y-4">
        {bills.map((bill) => (
          <Link
            key={`${bill.billType}-${bill.billNumber}`}
            href={`/bills/${bill.congress}/${bill.billType}/${bill.billNumber}`}
            className="block rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-4 shadow-[0_16px_40px_rgba(12,33,58,0.05)] transition hover:border-[var(--accent-blue)] sm:px-5 sm:py-5"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <p className="font-semibold text-[var(--ink)]">{bill.idLabel}</p>
              <span className="text-sm text-[var(--muted)]">{formatDisplayDate(bill.latestActionDate)}</span>
            </div>
            <h2 className="mt-3 text-lg leading-8 text-[var(--ink)]">{bill.title}</h2>
            {bill.latestActionText ? <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{bill.latestActionText}</p> : null}
          </Link>
        ))}
      </div>
    </main>
  );
}
