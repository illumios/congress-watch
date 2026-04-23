import Link from "next/link";

import { MemberAvatar } from "@/components/member-avatar";
import { formatDisplayDate, type Member } from "@/lib/congress-data";

export function MemberCard({ member }: { member: Member }) {
  const isVacantSeat = !member.fullName.trim();
  const displayName = isVacantSeat ? "Vacant Seat" : member.fullName;
  const displayPartyLabel = isVacantSeat ? "Vacant" : member.partyName;

  return (
    <article className="w-full min-w-0 max-w-full overflow-hidden rounded-[1.35rem] border border-[var(--border)] bg-white p-4 shadow-[0_16px_40px_rgba(12,33,58,0.06)] sm:rounded-[1.5rem] sm:p-5">
      <div className="flex flex-col gap-4">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <MemberAvatar
            member={member}
            className="h-14 w-14 shrink-0 rounded-full border border-[rgba(19,52,92,0.1)] sm:h-16 sm:w-16"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
              {member.chamber === "house" ? "House" : "Senate"}
            </p>
            {member.wikipediaUrl ? (
              <a
                href={member.wikipediaUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1.5 block max-w-full break-words font-serif text-[1.45rem] leading-tight text-[var(--ink)] transition hover:text-[var(--accent-blue)] sm:mt-2 sm:text-2xl"
              >
                {displayName}
              </a>
            ) : (
              <h3 className="mt-1.5 break-words font-serif text-[1.45rem] leading-tight text-[var(--ink)] sm:mt-2 sm:text-2xl">{displayName}</h3>
            )}
            <p className="mt-1.5 break-words text-sm leading-6 text-[var(--muted)] sm:mt-2">{member.roleLabel}</p>
            {member.wikipediaUrl ? (
              <p className="mt-1.5 sm:mt-2">
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
          className={`self-start rounded-full px-3 py-1 text-xs font-medium ${
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
      <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-4 sm:grid-cols-2">
        <div className="rounded-[1rem] bg-[var(--surface)] px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Term ends</p>
          <p className="mt-2 text-sm font-medium text-[var(--ink)]">{formatDisplayDate(member.termEndDate)}</p>
        </div>
        <div className="rounded-[1rem] bg-[var(--surface)] px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">Committees</p>
          <p className="mt-2 text-sm font-medium text-[var(--ink)]">{member.committees.length}</p>
        </div>
      </div>
      <div className="mt-5 hidden min-w-0 flex-wrap gap-2 text-xs text-[var(--muted)] sm:flex">
        {member.committees.slice(0, 3).map((committee) => (
          <span
            key={`${member.bioguideId}-${committee.code}`}
            className="inline-flex max-w-full whitespace-normal break-words rounded-full border border-[var(--border)] px-3 py-1 leading-5"
          >
            {committee.name}
          </span>
        ))}
      </div>
      <Link
        href={`/members/${member.slug}`}
        className="button-primary mt-5 w-full max-w-full px-4 py-2 text-sm font-medium sm:mt-6 sm:w-auto"
      >
        View profile
      </Link>
    </article>
  );
}
