"use client";
import { ResponsiveRadar } from "@nivo/radar";

type Tool = {
  id: string;
  tool: string;
  dims: { autonomy: number; collaboration: number; context: number; governance: number; interface: number };
  rating?: number | null;
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
      dotSize={0}
      fillOpacity={0.12}
      borderOpacity={0.9}
      isInteractive
    />
  );
}
