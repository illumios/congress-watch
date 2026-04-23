import type { Chamber, Member, PartyCode } from "@/lib/congress-data";

export type MemberSortKey = "name" | "state" | "party" | "term_end" | "committees";
export type MemberTermFilter = "all" | "soonest";
export type MemberPartyFilter = "all" | PartyCode;
export type MemberChamberFilter = "all" | Chamber;

export type MemberBrowseParams = {
  sort: MemberSortKey;
  party: MemberPartyFilter;
  state: string;
  chamber: MemberChamberFilter;
  term: MemberTermFilter;
};

export const DEFAULT_MEMBER_BROWSE_PARAMS: MemberBrowseParams = {
  sort: "name",
  party: "all",
  state: "all",
  chamber: "all",
  term: "all",
};

export const MEMBER_SORT_OPTIONS: Array<{ value: MemberSortKey; label: string }> = [
  { value: "name", label: "Name" },
  { value: "state", label: "State" },
  { value: "party", label: "Party" },
  { value: "term_end", label: "Term ending soonest" },
  { value: "committees", label: "Most committees" },
];

export const MEMBER_PARTY_OPTIONS: Array<{ value: MemberPartyFilter; label: string }> = [
  { value: "all", label: "All Parties" },
  { value: "D", label: "Democrat" },
  { value: "R", label: "Republican" },
  { value: "I", label: "Independent" },
];

export const MEMBER_CHAMBER_OPTIONS: Array<{ value: MemberChamberFilter; label: string }> = [
  { value: "all", label: "All Chambers" },
  { value: "house", label: "House" },
  { value: "senate", label: "Senate" },
];

export const MEMBER_TERM_OPTIONS: Array<{ value: MemberTermFilter; label: string }> = [
  { value: "all", label: "All Terms" },
  { value: "soonest", label: "Term ending soonest" },
];

function normalizeSort(value?: string): MemberSortKey {
  if (value === "state" || value === "party" || value === "term_end" || value === "committees") {
    return value;
  }
  return "name";
}

function normalizeParty(value?: string): MemberPartyFilter {
  if (value === "D" || value === "R" || value === "I") {
    return value;
  }
  return "all";
}

function normalizeChamber(value?: string): MemberChamberFilter {
  if (value === "house" || value === "senate") {
    return value;
  }
  return "all";
}

function normalizeTerm(value?: string): MemberTermFilter {
  return value === "soonest" ? "soonest" : "all";
}

export function normalizeMemberBrowseParams(params: {
  sort?: string;
  party?: string;
  state?: string;
  chamber?: string;
  term?: string;
}): MemberBrowseParams {
  const normalizedState = params.state?.trim();

  return {
    sort: normalizeSort(params.sort),
    party: normalizeParty(params.party),
    state: normalizedState && normalizedState.toLowerCase() !== "all" ? normalizedState.toUpperCase() : "all",
    chamber: normalizeChamber(params.chamber),
    term: normalizeTerm(params.term),
  };
}

function compareText(left: string, right: string) {
  return left.localeCompare(right, "en-US", { sensitivity: "base" });
}

function compareNullableDate(left: string | null, right: string | null) {
  if (left && right) return left.localeCompare(right);
  if (left) return -1;
  if (right) return 1;
  return 0;
}

function chamberSortLabel(member: Member) {
  return member.chamber === "senate" ? "0-senate" : "1-house";
}

function memberPrimarySortLabel(member: Member) {
  return member.sortName || member.fullName || member.roleLabel;
}

function getSoonestTermEndDate(members: Member[]) {
  const datedMembers = members
    .map((member) => member.termEndDate)
    .filter((value): value is string => Boolean(value))
    .sort((left, right) => left.localeCompare(right));

  return datedMembers[0] ?? null;
}

function sortMembers(members: Member[], sort: MemberSortKey) {
  return members.slice().sort((left, right) => {
    if (sort === "state") {
      return (
        compareText(left.stateName, right.stateName) ||
        compareText(chamberSortLabel(left), chamberSortLabel(right)) ||
        compareText(left.seatLabel, right.seatLabel) ||
        compareText(memberPrimarySortLabel(left), memberPrimarySortLabel(right))
      );
    }

    if (sort === "party") {
      return (
        compareText(left.partyName, right.partyName) ||
        compareText(left.stateName, right.stateName) ||
        compareText(memberPrimarySortLabel(left), memberPrimarySortLabel(right))
      );
    }

    if (sort === "term_end") {
      return (
        compareNullableDate(left.termEndDate, right.termEndDate) ||
        compareText(left.stateName, right.stateName) ||
        compareText(memberPrimarySortLabel(left), memberPrimarySortLabel(right))
      );
    }

    if (sort === "committees") {
      return (
        right.committees.length - left.committees.length ||
        compareText(left.stateName, right.stateName) ||
        compareText(memberPrimarySortLabel(left), memberPrimarySortLabel(right))
      );
    }

    return compareText(memberPrimarySortLabel(left), memberPrimarySortLabel(right));
  });
}

export function filterAndSortMembers(members: Member[], params: MemberBrowseParams) {
  let filtered = members.filter((member) => {
    if (params.party !== "all" && member.partyCode !== params.party) {
      return false;
    }

    if (params.state !== "all" && member.stateCode !== params.state) {
      return false;
    }

    if (params.chamber !== "all" && member.chamber !== params.chamber) {
      return false;
    }

    return true;
  });

  if (params.term === "soonest") {
    const soonestTermEndDate = getSoonestTermEndDate(filtered);
    if (soonestTermEndDate) {
      filtered = filtered.filter((member) => member.termEndDate === soonestTermEndDate);
    }
  }

  return sortMembers(filtered, params.sort);
}

export function getMemberStateOptions(members: Member[]) {
  const states = Array.from(
    members.reduce((map, member) => {
      if (!map.has(member.stateCode)) {
        map.set(member.stateCode, {
          value: member.stateCode,
          label: member.stateName,
        });
      }
      return map;
    }, new Map<string, { value: string; label: string }>()),
  ).map(([, value]) => value);

  return states.sort((left, right) => left.label.localeCompare(right.label));
}

export function hasActiveMemberBrowseFilters(
  params: MemberBrowseParams,
  keys: Array<keyof MemberBrowseParams> = ["sort", "party", "state", "chamber", "term"],
) {
  return keys.some((key) => params[key] !== DEFAULT_MEMBER_BROWSE_PARAMS[key]);
}
