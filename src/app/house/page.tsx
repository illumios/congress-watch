import { MemberBrowseControls } from "@/components/member-browse-controls";
import { MemberCard } from "@/components/member-card";
import { PageIntro } from "@/components/page-intro";
import { getMembersByChamber } from "@/lib/congress-data";
import {
  filterAndSortMembers,
  getMemberStateOptions,
  hasActiveMemberBrowseFilters,
  normalizeMemberBrowseParams,
} from "@/lib/member-browse";

export default async function HousePage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; party?: string; state?: string; term?: string }>;
}) {
  const rawSearchParams = await searchParams;
  const members = await getMembersByChamber("house");
  const browseParams = normalizeMemberBrowseParams(rawSearchParams);
  const filteredMembers = filterAndSortMembers(members, browseParams);
  const stateOptions = getMemberStateOptions(members);

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-12 lg:px-8">
      <PageIntro
        eyebrow="House"
        title="Current House members"
        description="Voting members of the U.S. House of Representatives, organized around official roster data and ready to drill into votes, sponsored bills, and member records."
      />

      <MemberBrowseControls
        action="/house"
        values={browseParams}
        resetHref="/house"
        resultCount={filteredMembers.length}
        showReset={hasActiveMemberBrowseFilters(browseParams, ["sort", "party", "state", "term"])}
        showState
        stateOptions={stateOptions}
      />

      {filteredMembers.length > 0 ? (
        <div className="mt-10 grid gap-5 xl:grid-cols-2">
          {filteredMembers.map((member) => (
            <MemberCard key={member.bioguideId} member={member} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[1.4rem] border border-dashed border-[var(--border-strong)] bg-white px-5 py-8 text-sm leading-7 text-[var(--muted)]">
          No House members matched those filters.
        </div>
      )}
    </main>
  );
}
