import Link from "next/link";

import { PageIntro } from "@/components/page-intro";
import { searchSite } from "@/lib/congress-data";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = await searchSite(q);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-4 sm:px-5 sm:pt-6 lg:px-8 lg:pb-14 lg:pt-12">
      <section className="rounded-[1.7rem] border border-[var(--border)] bg-white p-5 shadow-[0_18px_48px_rgba(15,35,58,0.08)] sm:p-6">
        <PageIntro
          eyebrow="Search"
          title="Find a member, state, bill, or vote"
          description="Search is designed around common public questions like “Who represents me?” and “How has this member voted?”"
        />

        <form action="/search" className="mt-8 flex flex-col gap-3 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-subtle)] p-4 sm:flex-row">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search members or states"
          className="w-full rounded-full border border-[var(--border)] px-4 py-3 outline-none focus:border-[var(--accent-blue)]"
        />
        <button className="button-primary px-6 py-3 text-sm font-semibold">Search</button>
        </form>
      </section>

      {q ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[1.5rem] border border-[var(--border)] bg-white p-6">
            <h2 className="font-serif text-3xl text-[var(--ink)]">Members</h2>
            <div className="mt-5 space-y-3">
              {results.members.length > 0 ? (
                results.members.slice(0, 30).map((member) => (
                  <article key={member.bioguideId} className="rounded-[1rem] border border-[var(--border)] px-4 py-4 transition hover:border-[var(--accent-blue)]">
                    <div className="flex items-start justify-between gap-3">
                      <Link href={`/members/${member.slug}`} className="font-semibold text-[var(--ink)] transition hover:text-[var(--accent-blue)]">
                        {member.fullName}
                      </Link>
                      {member.wikipediaUrl ? (
                        <a
                          href={member.wikipediaUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 text-sm font-medium text-[var(--accent-blue)]"
                        >
                          Wikipedia ↗
                        </a>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm text-[var(--muted)]">{member.roleLabel}</p>
                  </article>
                ))
              ) : (
                <p className="text-sm leading-7 text-[var(--muted)]">No matching members found.</p>
              )}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-[var(--border)] bg-white p-6">
            <h2 className="font-serif text-3xl text-[var(--ink)]">States</h2>
            <div className="mt-5 space-y-3">
              {results.states.length > 0 ? (
                results.states.map((state) => (
                  <Link key={state.code} href={`/states/${state.slug}`} className="block rounded-[1rem] border border-[var(--border)] px-4 py-4 transition hover:border-[var(--accent-blue)]">
                    <p className="font-semibold text-[var(--ink)]">{state.name}</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">{state.code}</p>
                  </Link>
                ))
              ) : (
                <p className="text-sm leading-7 text-[var(--muted)]">No matching states found.</p>
              )}
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
