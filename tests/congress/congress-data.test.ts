import { describe, expect, test } from "vitest";

import { parseSenateRosterXml } from "@/lib/congress-data";

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
});
