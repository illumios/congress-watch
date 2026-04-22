import Link from "next/link";

import { PageIntro } from "@/components/page-intro";
import { getRecentVotes } from "@/lib/congress-data";

export default async function VotesPage() {
  const votes = await getRecentVotes(20);
  const houseVotes = votes.filter((vote) => vote.chamber === "house").length;
  const senateVotes = votes.filter((vote) => vote.chamber === "senate").length;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-4 sm:px-5 sm:pt-6 lg:px-8 lg:pb-14 lg:pt-12">
      <section className="rounded-[1.7rem] border border-[var(--border)] bg-white p-5 shadow-[0_18px_48px_rgba(15,35,58,0.08)] sm:p-6">
        <PageIntro
          eyebrow="Votes"
          title="Recent official roll-call votes"
          description="Browse recent House and Senate roll calls, with chamber, date, result, and direct access to member-level recorded positions."
        />
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-[1rem] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3">
            <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--muted)]">Loaded</p>
            <p className="mt-2 font-serif text-[1.9rem] leading-none text-[var(--ink)]">{votes.length}</p>
          </div>
          <div className="rounded-[1rem] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3">
            <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--muted)]">House</p>
            <p className="mt-2 font-serif text-[1.9rem] leading-none text-[var(--ink)]">{houseVotes}</p>
          </div>
          <div className="rounded-[1rem] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3">
            <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--muted)]">Senate</p>
            <p className="mt-2 font-serif text-[1.9rem] leading-none text-[var(--ink)]">{senateVotes}</p>
          </div>
        </div>
      </section>

      <div className="mt-6 space-y-4">
        {votes.map((vote) => (
          <Link
            key={vote.slug}
            href={`/votes/${vote.chamber}/${vote.congress}/${vote.session}/${vote.rollCallNumber}`}
            className="block rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-4 shadow-[0_16px_40px_rgba(12,33,58,0.05)] transition hover:border-[var(--accent-blue)] sm:px-5 sm:py-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
                <span>{vote.chamber}</span>
                <span>Congress {vote.congress}</span>
                <span>Roll {vote.rollCallNumber}</span>
              </div>
              <span className="text-sm text-[var(--muted)]">{vote.dateLabel}</span>
            </div>
            <h2 className="mt-3 text-lg leading-8 text-[var(--ink)]">{vote.title}</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{vote.result}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
