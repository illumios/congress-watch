import { readFile } from "node:fs/promises";
import path from "node:path";

type StateDirectoryEntry = {
  code: string;
  slug: string;
  name: string;
};

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

function injectMapRootAttributes(svg: string) {
  return svg.replace(
    /<svg[^>]*width="959" height="593"[^>]*>/,
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 959 593" preserveAspectRatio="xMidYMid meet" role="img" aria-label="United States map by congressional delegation majority" class="home-state-map-svg">',
  );
}

function injectStateLinks(svg: string, stateDirectory: Record<string, StateDirectoryEntry>) {
  return svg.replace(/<path class="([a-z]{2})"([^>]*)>\s*<title>([^<]+)<\/title><\/path>/g, (match, code, attributes, title) => {
    const state = stateDirectory[code.toUpperCase()];
    if (!state) return match;
    return `<a href="/states/${state.slug}" class="state-link state-link-${code}" aria-label="${title}">${`<path class="${code}"${attributes}><title>${title}</title></path>`}</a>`;
  });
}

export async function HomeStateMap({
  stateMajorities,
  states,
}: {
  stateMajorities: Record<string, StateMajority>;
  states: StateDirectoryEntry[];
}) {
  const svg = await loadMapSvg();
  const stateDirectory = Object.fromEntries(states.map((state) => [state.code, state]));
  const colorOverrides = buildStateFillCss(stateMajorities);
  const interactionCss = `
.home-state-map-svg{display:block;width:100%;height:100%}
.home-state-map-svg .state-link{cursor:pointer}
.home-state-map-svg .state-link path{transition:filter 160ms ease,stroke 160ms ease,stroke-width 160ms ease}
.home-state-map-svg .state-link:hover path,
.home-state-map-svg .state-link:focus path{filter:brightness(0.95);stroke:#f8fafc;stroke-width:2}
.home-state-map-svg .state-link:focus-visible{outline:none}
`;
  const enhancedSvg = injectStateLinks(
    injectMapRootAttributes(svg.replace("</style>", `${colorOverrides}\n${interactionCss}\n</style>`)),
    stateDirectory,
  );

  return (
    <div
      className="mx-auto aspect-[959/593] w-full max-w-[560px]"
      dangerouslySetInnerHTML={{ __html: enhancedSvg }}
    />
  );
}
