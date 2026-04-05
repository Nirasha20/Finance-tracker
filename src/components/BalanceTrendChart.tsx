// src/components/BalanceTrendChart.tsx
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";
import type { BalanceTrendPoint } from "../types";

interface Props {
  data: BalanceTrendPoint[];
}

// Format "2024-01-01" → "Jan" for the X axis
function formatMonth(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", { month: "short" });
}

// Format 42331 → "$42,331" for Y axis and tooltip
function formatCurrency(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

// Custom tooltip shown on hover
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7eb",
      borderRadius: "10px", padding: "10px 16px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      fontSize: "13px",
    }}>
      <div style={{ color: "#6b7280", marginBottom: "4px" }}>{formatMonth(label)}</div>
      <div style={{ fontWeight: "700", color: "#2563eb", fontSize: "15px" }}>
        {formatCurrency(payload[0].value)}
      </div>
    </div>
  );
}

export default function BalanceTrendChart({ data }: Props) {
  return (
    <div style={{
      background: "#fff", borderRadius: "16px",
      padding: "28px 24px", flex: 1, minWidth: "300px",
      border: "1px solid #f0f0f0",
    }}>
      <h2 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 24px" }}>
        Balance Trend
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <defs>
            {/* Gradient fill under the area line */}
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" vertical={false} />

          <XAxis
            dataKey="date"
            tickFormatter={formatMonth}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tickFormatter={(v) => `${v / 1000}k`}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            width={40}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="balance"
            stroke="#3b82f6"
            strokeWidth={2.5}
            fill="url(#balanceGradient)"
            dot={false}
            activeDot={{ r: 5, fill: "#2563eb", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}