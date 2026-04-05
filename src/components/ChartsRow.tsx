// src/components/ChartsRow.tsx
import { useGetFinanceChartsQuery } from "../api/financeApi";
import BalanceTrendChart from "./BalanceTrendChart";
import SpendingBreakdownChart from "./SpendingBreakdownChart";

// Skeleton loader matching the two-card layout
function ChartsSkeleton() {
  const shimmer: React.CSSProperties = {
    background: "linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s infinite",
    borderRadius: "8px",
  };
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "20px" }}>
      {[1, 2].map((i) => (
        <div key={i} style={{
          flex: 1, minWidth: "300px", borderRadius: "16px",
          padding: "28px 24px", background: "#fff", border: "1px solid #f0f0f0",
        }}>
          <div style={{ ...shimmer, height: "18px", width: "40%", marginBottom: "24px" }} />
          <div style={{ ...shimmer, height: "220px", width: "100%" }} />
        </div>
      ))}
    </div>
  );
}

export default function ChartsRow() {
  const { data, isLoading, isError } = useGetFinanceChartsQuery();

  if (isLoading) return <ChartsSkeleton />;

  if (isError) return (
    <div style={{
      marginTop: "20px", padding: "20px", background: "#fef2f2",
      borderRadius: "12px", color: "#dc2626", border: "1px solid #fecaca",
    }}>
      Failed to load chart data.
    </div>
  );

  return (
    <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
      <BalanceTrendChart data={data!.balanceTrend} />
      <SpendingBreakdownChart data={data!.spendingBreakdown} />
    </div>
  );
}