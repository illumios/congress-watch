import { getAllMembers, getMemberPortraitSource } from "@/lib/congress-data";

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

  const portraitSource = await getMemberPortraitSource(member);

  if (!portraitSource) {
    return new Response(null, { status: 404 });
  }

  return new Response(null, {
    status: 307,
    headers: {
      Location: portraitSource,
      "Cache-Control": "public, s-maxage=2592000, stale-while-revalidate=86400",
    },
  });
}
