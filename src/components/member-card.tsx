import Link from "next/link";

import { MemberAvatar } from "@/components/member-avatar";
import { formatDisplayDate, type Member } from "@/lib/congress-data";

export function MemberCard({ member }: { member: Member }) {
  const isVacantSeat = !member.fullName.trim();
  const displayName = isVacantSeat ? "Vacant Seat" : member.fullName;
  const displayPartyLabel = isVacantSeat ? "Vacant" : member.partyName;

  return (
    <article className="rounded-[1.5rem] border border-[var(--border)] bg-white p-4 shadow-[0_16px_40px_rgba(12,33,58,0.06)] sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          <MemberAvatar
            member={member}
            className="h-16 w-16 shrink-0 rounded-full border border-[rgba(19,52,92,0.1)]"
          />
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
              {member.chamber === "house" ? "House" : "Senate"}
            </p>
            {member.wikipediaUrl ? (
              <a
                href={member.wikipediaUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block font-serif text-[1.85rem] leading-tight text-[var(--ink)] transition hover:text-[var(--accent-blue)] sm:text-2xl"
              >
                {displayName}
              </a>
            ) : (
              <h3 className="mt-2 font-serif text-[1.85rem] leading-tight text-[var(--ink)] sm:text-2xl">{displayName}</h3>
            )}
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{member.roleLabel}</p>
            {member.wikipediaUrl ? (
              <p className="mt-2">
                <a
                  href={member.wikipediaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-[var(--accent-blue)]"
                >
                  Wikipedia ↗
                </a>
              </p>
            ) : null}
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            isVacantSeat
              ? "bg-[rgba(12,33,58,0.08)] text-[var(--ink)]"
              : member.partyCode === "R"
              ? "bg-[rgba(176,48,53,0.12)] text-[var(--accent-red)]"
              : member.partyCode === "D"
                ? "bg-[rgba(36,82,164,0.12)] text-[var(--accent-blue)]"
                : "bg-[rgba(12,33,58,0.08)] text-[var(--ink)]"
          }`}
        >
          {displayPartyLabel}
        </span>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[1rem] bg-[var(--surface)] px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Term ends</p>
          <p className="mt-2 text-sm font-medium text-[var(--ink)]">{formatDisplayDate(member.termEndDate)}</p>
        </div>
        <div className="rounded-[1rem] bg-[var(--surface)] px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Committees</p>
          <p className="mt-2 text-sm font-medium text-[var(--ink)]">{member.committees.length}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
        {member.committees.slice(0, 3).map((committee) => (
          <span key={`${member.bioguideId}-${committee.code}`} className="rounded-full border border-[var(--border)] px-3 py-1">
            {committee.name}
          </span>
        ))}
      </div>
      <Link
        href={`/members/${member.slug}`}
        className="button-primary mt-6 w-full px-4 py-2 text-sm font-medium sm:w-auto"
      >
        View profile
      </Link>
    </article>
  );
}
