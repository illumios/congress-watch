import { describe, expect, test } from "vitest";

import type { Member } from "@/lib/congress-data";
import { filterAndSortMembers, normalizeMemberBrowseParams } from "@/lib/member-browse";

function makeMember(overrides: Partial<Member>): Member {
  return {
    bioguideId: overrides.bioguideId ?? "X000000",
    slug: overrides.slug ?? "example-member",
    wikipediaUrl: overrides.wikipediaUrl ?? null,
    portraitUrl: overrides.portraitUrl ?? null,
    firstName: overrides.firstName ?? "Example",
    lastName: overrides.lastName ?? "Member",
    fullName: overrides.fullName ?? "Example Member",
    sortName: overrides.sortName ?? "Member, Example",
    chamber: overrides.chamber ?? "house",
    partyCode: overrides.partyCode ?? "D",
    partyName: overrides.partyName ?? "Democrat",
    stateCode: overrides.stateCode ?? "CA",
    stateName: overrides.stateName ?? "California",
    stateSlug: overrides.stateSlug ?? "california",
    district: overrides.district ?? 1,
    districtLabel: overrides.districtLabel ?? "CA-01",
    senateClass: overrides.senateClass ?? null,
    seatLabel: overrides.seatLabel ?? "Representative for CA-01",
    roleLabel: overrides.roleLabel ?? "Representative for CA-01",
    officialWebsiteUrl: overrides.officialWebsiteUrl ?? null,
    officeAddress: overrides.officeAddress ?? null,
    officePhone: overrides.officePhone ?? null,
    hometown: overrides.hometown ?? null,
    lisMemberId: overrides.lisMemberId ?? null,
    committees: overrides.committees ?? [],
    termStartDate: overrides.termStartDate ?? "2025-01-03",
    termEndDate: overrides.termEndDate ?? "2027-01-03",
  };
}

describe("member browse filters", () => {
  const members = [
    makeMember({
      bioguideId: "A000001",
      slug: "amy-adams-ca",
      firstName: "Amy",
      lastName: "Adams",
      fullName: "Amy Adams",
      sortName: "Adams, Amy",
      stateCode: "CA",
      stateName: "California",
      partyCode: "D",
      partyName: "Democrat",
      chamber: "house",
      committees: [{ code: "A", name: "Agriculture" }],
      termEndDate: "2027-01-03",
    }),
    makeMember({
      bioguideId: "B000002",
      slug: "brian-baker-tx",
      firstName: "Brian",
      lastName: "Baker",
      fullName: "Brian Baker",
      sortName: "Baker, Brian",
      stateCode: "TX",
      stateName: "Texas",
      partyCode: "R",
      partyName: "Republican",
      chamber: "house",
      committees: [
        { code: "A", name: "Agriculture" },
        { code: "F", name: "Financial Services" },
      ],
      termEndDate: "2027-01-03",
    }),
    makeMember({
      bioguideId: "C000003",
      slug: "cora-clark-wa",
      firstName: "Cora",
      lastName: "Clark",
      fullName: "Cora Clark",
      sortName: "Clark, Cora",
      stateCode: "WA",
      stateName: "Washington",
      partyCode: "D",
      partyName: "Democrat",
      chamber: "senate",
      district: null,
      districtLabel: null,
      senateClass: "Class 2",
      lisMemberId: "S123",
      seatLabel: "United States Senator from Washington",
      roleLabel: "United States Senator from Washington",
      committees: [
        { code: "A", name: "Agriculture" },
        { code: "J", name: "Judiciary" },
        { code: "H", name: "Health" },
      ],
      termEndDate: "2029-01-03",
    }),
  ];

  test("normalizes invalid browse params to safe defaults", () => {
    expect(
      normalizeMemberBrowseParams({
        sort: "nope",
        party: "Z",
        state: "",
        chamber: "governor",
        term: "later",
      }),
    ).toEqual({
      sort: "name",
      party: "all",
      state: "all",
      chamber: "all",
      term: "all",
    });
  });

  test("filters by party, chamber, and state together", () => {
    const filtered = filterAndSortMembers(
      members,
      normalizeMemberBrowseParams({
        party: "D",
        chamber: "house",
        state: "CA",
      }),
    );

    expect(filtered.map((member) => member.bioguideId)).toEqual(["A000001"]);
  });

  test("returns only the soonest-ending terms when requested", () => {
    const filtered = filterAndSortMembers(
      members,
      normalizeMemberBrowseParams({
        term: "soonest",
      }),
    );

    expect(filtered.map((member) => member.bioguideId)).toEqual(["A000001", "B000002"]);
  });

  test("sorts by committee count descending", () => {
    const filtered = filterAndSortMembers(
      members,
      normalizeMemberBrowseParams({
        sort: "committees",
      }),
    );

    expect(filtered.map((member) => member.bioguideId)).toEqual(["C000003", "B000002", "A000001"]);
  });
});
