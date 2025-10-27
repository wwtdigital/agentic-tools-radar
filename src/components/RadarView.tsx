"use client";
import { ResponsiveRadar } from "@nivo/radar";

type Tool = {
  id: string;
  tool: string;
  company?: string;
  dims: { autonomy: number; collaboration: number; context: number; governance: number; interface: number };
  rating?: number | null;
  urls?: { product?: string };
};

const DIM_LABELS = ["Autonomy","Collaboration","Context","Governance","Interface"] as const;
type Dim = typeof DIM_LABELS[number];

export function RadarView({
  tools,
  selectedIds,
  hiddenDims
}: {
  tools: Tool[];
  selectedIds: string[];
  hiddenDims: Set<string>;
}) {
  const selected = tools.filter(t => selectedIds.includes(t.id));
  const dims = DIM_LABELS.filter(d => !hiddenDims.has(d));

  const data = dims.map(axis => {
    const row: Record<string, number | string> = { dimension: axis };
    selected.forEach(t => {
      const value = (t.dims as any)[axis.toLowerCase()] ?? 0;
      row[t.tool] = value;
    });
    return row;
  });

  const keys = selected.map(t => t.tool);

  // Get favicon URL from product URL
  const getFaviconUrl = (url?: string): string | undefined => {
    if (!url) return undefined;
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch {
      return undefined;
    }
  };

  // Get initials for fallback from tool name
  const getInitials = (name?: string) => {
    if (!name) return "?";
    const words = name.split(/[\s-]+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    const capitals = name.match(/[A-Z]/g);
    if (capitals && capitals.length >= 2) {
      return (capitals[0] + capitals[1]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Custom dots layer with logos
  const CustomDotsLayer = ({ radiusScale, angleStep, data, keys, colorByKey, centerX, centerY }: any) => {
    const angleOffset = Math.PI / 2;

    return (
      <g>
        {data.map((d: any, i: number) => {
          const angle = i * angleStep - angleOffset;

          return keys.map((key: string) => {
            const value = d[key];
            if (value === undefined) return null;

            const radius = radiusScale(value);
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            const color = colorByKey[key];
            const tool = selected.find(t => t.tool === key);

            if (!tool) return null;

            const initials = getInitials(tool.tool);
            const logoUrl = getFaviconUrl(tool.urls?.product);

            return (
              <g key={`${key}-${i}`} transform={`translate(${x},${y})`}>
                {logoUrl ? (
                  <>
                    <circle r={12} fill="white" stroke={color} strokeWidth={2} />
                    <clipPath id={`clip-${tool.id}-${i}`}>
                      <circle r={10} />
                    </clipPath>
                    <image
                      href={logoUrl}
                      x={-10}
                      y={-10}
                      width={20}
                      height={20}
                      clipPath={`url(#clip-${tool.id}-${i})`}
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </>
                ) : (
                  <>
                    <circle r={12} fill={color} />
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="white"
                      fontSize={8}
                      fontWeight="bold"
                    >
                      {initials}
                    </text>
                  </>
                )}
              </g>
            );
          });
        })}
      </g>
    );
  };

  return (
    <ResponsiveRadar
      data={data}
      keys={keys}
      indexBy="dimension"
      maxValue={5}
      margin={{ top: 40, right: 90, bottom: 50, left: 60 }}
      curve="linearClosed"
      gridLevels={5}
      theme={{
        text: { fontFamily: "Inter, system-ui", fontSize: 12, fill: "#111" },
        grid: { line: { stroke: "#dddddd", strokeWidth: 1 } },
        axis: { ticks: { text: { fontSize: 12 } } },
        legends: { text: { fontSize: 12 } }
      }}
      colors={{ scheme: "category10" }}
      blendMode="multiply"
      borderWidth={2}
      layers={['grid', 'layers', 'slices', CustomDotsLayer, 'legends']}
      enableDots={false}
      fillOpacity={0.12}
      isInteractive
    />
  );
}
