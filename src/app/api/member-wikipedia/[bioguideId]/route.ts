import { getAllMembers, getMemberWikipediaTitle } from "@/lib/congress-data";

function buildWikipediaPageUrl(title: string) {
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/\s+/g, "_"))}`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ bioguideId: string }> },
) {
  const { bioguideId } = await params;
  const members = await getAllMembers();
  const member = members.find((entry) => entry.bioguideId === bioguideId);

  if (!member) {
    return new Response(null, { status: 404 });
  }

  const wikipediaTitle = await getMemberWikipediaTitle(member);

  if (!wikipediaTitle) {
    return new Response(null, { status: 404 });
  }

  return new Response(null, {
    status: 307,
    headers: {
      Location: buildWikipediaPageUrl(wikipediaTitle),
      "Cache-Control": "public, s-maxage=2592000, stale-while-revalidate=86400",
    },
  });
}
