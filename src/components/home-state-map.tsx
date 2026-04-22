import { readFile } from "node:fs/promises";
import path from "node:path";

const PARTY_FILL: Record<"D" | "R" | "I" | "T", string> = {
  D: "#275db5",
  R: "#b03035",
  I: "#9aa6b4",
  T: "#c7d0db",
};

type StateMajority = "D" | "R" | "I" | "T";

async function loadMapSvg() {
  const filePath = path.join(process.cwd(), "public/reference-assets/us-map.svg");
  return readFile(filePath, "utf8");
}

function buildStateFillCss(stateMajorities: Record<string, StateMajority>) {
  return Object.entries(stateMajorities)
    .map(([code, majority]) => `.${code.toLowerCase()}{fill:${PARTY_FILL[majority]};}`)
    .join("\n");
}

export async function HomeStateMap({
  stateMajorities,
}: {
  stateMajorities: Record<string, StateMajority>;
}) {
  const svg = await loadMapSvg();
  const colorOverrides = buildStateFillCss(stateMajorities);
  const enhancedSvg = svg.replace("</style>", `${colorOverrides}\n</style>`);

  return (
    <div
      className="mx-auto w-full max-w-[560px] [&_svg]:h-auto [&_svg]:w-full"
      dangerouslySetInnerHTML={{ __html: enhancedSvg }}
    />
  );
}
