import { describe, expect, test } from "vitest";

import { parseSenateRosterXml, parseSenateVoteXml, pickBestWikipediaTitle } from "@/lib/congress-data";

describe("congress-data senate parsing", () => {
  test("parses the live senate feed root shape", () => {
    const membershipXml = `
      <senators>
        <senator lis_member_id="S432">
          <name>
            <first>Ruben</first>
            <last>Gallego</last>
          </name>
          <party>D</party>
          <state>AZ</state>
          <homeTown>Phoenix</homeTown>
          <bioguideId>G000574</bioguideId>
          <committees>
            <committee code="SSVA00">Committee on Veterans' Affairs</committee>
          </committees>
        </senator>
      </senators>
    `;

    const contactXml = `
      <contact_information>
        <member>
          <first_name>Ruben</first_name>
          <last_name>Gallego</last_name>
          <party>D</party>
          <state>AZ</state>
          <address>311 Hart Senate Office Building Washington DC 20510</address>
          <phone>(202) 224-4521</phone>
          <website>https://www.gallego.senate.gov/</website>
          <class>Class I</class>
          <bioguide_id>G000574</bioguide_id>
        </member>
      </contact_information>
    `;

    const members = parseSenateRosterXml(membershipXml, contactXml, 119);

    expect(members).toHaveLength(1);
    expect(members[0]).toMatchObject({
      bioguideId: "G000574",
      slug: "ruben-gallego-az",
      chamber: "senate",
      stateCode: "AZ",
      officialWebsiteUrl: "https://www.gallego.senate.gov/",
    });
    expect(members[0]?.committees[0]?.name).toBe("Committee on Veterans' Affairs");
  });

  test("parses senate roll call counts into yea and nay columns", () => {
    const voteXml = `
      <roll_call_vote>
        <congress>119</congress>
        <session>2</session>
        <congress_year>2026</congress_year>
        <vote_number>87</vote_number>
        <vote_date>April 21, 2026, 04:09 PM</vote_date>
        <vote_question_text>On the Motion to Proceed S.Con.Res. 33</vote_question_text>
        <vote_result_text>Motion to Proceed Agreed to (52-46)</vote_result_text>
        <question>On the Motion to Proceed</question>
        <vote_title>Motion to Proceed to S.Con.Res. 33</vote_title>
        <vote_result>Motion to Proceed Agreed to</vote_result>
        <document>
          <document_type>S.Con.Res.</document_type>
          <document_number>33</document_number>
        </document>
        <count>
          <yeas>52</yeas>
          <nays>46</nays>
          <present>0</present>
          <absent>2</absent>
        </count>
        <members>
          <member>
            <member_full>Example Senator (R-TX)</member_full>
            <party>R</party>
            <state>TX</state>
            <vote_cast>Yea</vote_cast>
            <lis_member_id>S999</lis_member_id>
          </member>
        </members>
      </roll_call_vote>
    `;

    const vote = parseSenateVoteXml(
      voteXml,
      "https://www.senate.gov/legislative/LIS/roll_call_votes/vote1192/vote_119_2_00087.xml",
    );

    expect(vote.yeaCount).toBe(52);
    expect(vote.nayCount).toBe(46);
    expect(vote.notVotingCount).toBe(2);
    expect(vote.result).toBe("Motion to Proceed Agreed to");
  });

  test("prefers exact wikipedia titles before broader politician matches", () => {
    const selected = pickBestWikipediaTitle("Jamie Raskin", [
      "Raskin",
      "Jamie Raskin",
      "Jamie Raskin (politician)",
    ]);

    expect(selected).toBe("Jamie Raskin");
  });

  test("falls back to politician disambiguation titles when exact title is missing", () => {
    const selected = pickBestWikipediaTitle("John James", [
      "John James (politician)",
      "John James (baseball)",
      "Jonathan James",
    ]);

    expect(selected).toBe("John James (politician)");
  });
});
