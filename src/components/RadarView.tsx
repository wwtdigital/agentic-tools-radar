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

const DIM_LABELS = ["AI Autonomy","Collaboration","Contextual Understanding","Governance","User Interface"] as const;
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

  // Map display labels to internal keys
  const labelToKey: Record<string, keyof Tool['dims']> = {
    "AI Autonomy": "autonomy",
    "Collaboration": "collaboration",
    "Contextual Understanding": "context",
    "Governance": "governance",
    "User Interface": "interface"
  };

  const data = dims.map(axis => {
    const row: Record<string, number | string> = { dimension: axis };
    selected.forEach(t => {
      const key = labelToKey[axis];
      const value = key ? t.dims[key] : 0;
      row[t.tool] = value;
    });
    return row;
  });

  const keys = selected.map(t => t.tool);

  // Get favicon URL from product URL through our proxy to avoid CORS
  const getFaviconUrl = (url?: string): string | undefined => {
    if (!url) return undefined;
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname;
      return `/api/favicon?domain=${domain}`;
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

  // Custom dots layer with logos and smart collision detection
  const CustomDotsLayer = ({ radiusScale, angleStep, data, keys, colorByKey, centerX, centerY }: any) => {
    const angleOffset = Math.PI / 2;
    const dotRadius = 12;
    const stackOffset = 26; // Horizontal spacing between stacked logos (slightly overlapping like browser tabs)

    // Group dots by position to detect collisions
    const positionMap = new Map<string, Array<{ key: string; keyIndex: number }>>();

    data.forEach((d: any, i: number) => {
      keys.forEach((key: string, keyIndex: number) => {
        const value = d[key];
        if (value === undefined) return;

        const radius = radiusScale(value);
        const angle = i * angleStep - angleOffset;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        // Create position key - only group dots at exact same position
        const posKey = `${Math.round(x)},${Math.round(y)}`;

        if (!positionMap.has(posKey)) {
          positionMap.set(posKey, []);
        }
        positionMap.get(posKey)!.push({ key, keyIndex });
      });
    });


    return (
      <g>
        {data.map((d: any, i: number) => {
          const angle = i * angleStep - angleOffset;

          return keys.map((key: string, keyIndex: number) => {
            const value = d[key];
            if (value === undefined) return null;

            const radius = radiusScale(value);
            const baseX = centerX + Math.cos(angle) * radius;
            const baseY = centerY + Math.sin(angle) * radius;
            const color = colorByKey[key];
            const tool = selected.find(t => t.tool === key);

            if (!tool) return null;

            // Check if this position has multiple dots (must match the key format above)
            const posKey = `${Math.round(baseX)},${Math.round(baseY)}`;
            const dotsAtPosition = positionMap.get(posKey) || [];
            const dotIndexAtPosition = dotsAtPosition.findIndex(d => d.key === key);
            const totalDotsAtPosition = dotsAtPosition.length;

            // Calculate offset for stacking
            let offsetX = 0;
            let offsetY = 0;

            if (totalDotsAtPosition > 1) {
              const stackIndex = dotIndexAtPosition;
              const totalHeight = (totalDotsAtPosition - 1) * stackOffset;

              // Determine if this position is more horizontal or vertical from center
              const dx = baseX - centerX;
              const dy = baseY - centerY;
              const isMoreHorizontal = Math.abs(dx) > Math.abs(dy);

              if (isMoreHorizontal) {
                // Stack vertically for left/right positions
                offsetY = (stackIndex * stackOffset) - (totalHeight / 2);
              } else {
                // Stack horizontally for top/bottom positions
                offsetX = (stackIndex * stackOffset) - (totalHeight / 2);
              }
            }

            const x = baseX + offsetX;
            const y = baseY + offsetY;

            const initials = getInitials(tool.tool);
            const logoUrl = getFaviconUrl(tool.urls?.product);

            return (
              <g key={`${key}-${i}`} transform={`translate(${x},${y})`}>
                {logoUrl ? (
                  <>
                    <circle r={dotRadius} fill="white" stroke={color} strokeWidth={2} />
                    <clipPath id={`clip-${tool.id}-${i}`}>
                      <circle r={dotRadius - 2} />
                    </clipPath>
                    <image
                      href={logoUrl}
                      x={-(dotRadius - 2)}
                      y={-(dotRadius - 2)}
                      width={(dotRadius - 2) * 2}
                      height={(dotRadius - 2) * 2}
                      clipPath={`url(#clip-${tool.id}-${i})`}
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </>
                ) : (
                  <>
                    <circle r={dotRadius} fill={color} />
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
      maxValue={20}
      margin={{ top: 70, right: 140, bottom: 80, left: 140 }}
      curve="linearClosed"
      gridLevels={5}
      theme={{
        text: { fontFamily: "Inter, system-ui", fontSize: 12, fill: "#111" },
        grid: { line: { stroke: "#dddddd", strokeWidth: 1 } },
        axis: { ticks: { text: { fontSize: 12 } } },
        legends: { text: { fontSize: 12 } }
      }}
      colors={{ scheme: "blues" }}
      blendMode="multiply"
      borderWidth={2}
      layers={['grid', 'layers', 'slices', CustomDotsLayer]}
      enableDots={false}
      fillOpacity={0.25}
      isInteractive={false}
      animate={true}
      motionConfig={{
        mass: 1,
        tension: 170,
        friction: 26,
        clamp: false,
        precision: 0.01,
        velocity: 0
      }}
    />
  );
}
