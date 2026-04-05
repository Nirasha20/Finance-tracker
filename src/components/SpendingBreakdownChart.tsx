// src/components/SpendingBreakdownChart.tsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { SpendingCategory } from "../types";

interface Props {
  data: SpendingCategory[];
}

function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`;
}

// Custom label rendered outside each pie slice
function renderCustomLabel({
  cx, cy, midAngle, outerRadius, name, value, fill,
}: any) {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 40;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x} y={y}
      fill={fill}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight={500}
    >
      {`${name}: ${formatCurrency(value)}`}
    </text>
  );
}

// Custom tooltip
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const { name, value, payload: p } = payload[0];
  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7eb",
      borderRadius: "10px", padding: "10px 16px",
      fontSize: "13px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{
          width: "10px", height: "10px", borderRadius: "50%",
          background: p.color, display: "inline-block",
        }} />
        <span style={{ fontWeight: "600" }}>{name}</span>
      </div>
      <div style={{ marginTop: "4px", color: "#374151" }}>
        {formatCurrency(value)}
      </div>
    </div>
  );
}

export default function SpendingBreakdownChart({ data }: Props) {
  const total = data.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div style={{
      background: "#fff", borderRadius: "16px",
      padding: "28px 24px", flex: 1, minWidth: "340px",
      border: "1px solid #f0f0f0",
    }}>
      <h2 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 8px" }}>
        Spending Breakdown
      </h2>

      {/* Pie chart */}
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={100}
            dataKey="amount"
            nameKey="name"
            label={renderCustomLabel}
            labelLine={false}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend dots */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: "10px 20px",
        justifyContent: "center", margin: "8px 0 20px",
      }}>
        {data.map((item) => (
          <div key={item.name} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
            <span style={{
              width: "10px", height: "10px", borderRadius: "50%",
              background: item.color, flexShrink: 0,
            }} />
            <span style={{ color: item.color, fontWeight: "500" }}>{item.name}</span>
          </div>
        ))}
      </div>

      {/* Top Categories Table */}
      <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "16px" }}>
        <div style={{ fontWeight: "700", fontSize: "13px", marginBottom: "12px", color: "#111827" }}>
          Top Spending Categories
        </div>

        {data.map((item) => {
          const pct = ((item.amount / total) * 100).toFixed(1);
          return (
            <div key={item.name} style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #f9fafb",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{
                  width: "10px", height: "10px", borderRadius: "50%",
                  background: item.color, flexShrink: 0,
                }} />
                <span style={{ fontSize: "14px", color: "#374151" }}>{item.name}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontWeight: "700", fontSize: "14px", color: "#111827" }}>
                  {formatCurrency(item.amount)}
                </span>
                <span style={{ fontSize: "12px", color: "#9ca3af", marginLeft: "8px" }}>
                  ({pct}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}