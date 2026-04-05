// src/components/InsightCards/index.tsx
import { useGetInsightsQuery } from "../../api/financeApi";
import InsightCard from "./InsightCard";

function InsightCardSkeleton() {
  const shimmer: React.CSSProperties = {
    background: "linear-gradient(90deg,var(--skeleton-1) 25%,var(--skeleton-2) 50%,var(--skeleton-1) 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s infinite",
    borderRadius: "6px",
  };
  return (
    <div style={{ flex: 1, minWidth: "200px", borderRadius: "16px", padding: "20px 22px", background: "var(--surface-2)", border: "1px solid var(--border-strong)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
        <div style={{ ...shimmer, height: "11px", width: "45%" }} />
        <div style={{ ...shimmer, height: "20px", width: "20px", borderRadius: "50%" }} />
      </div>
      <div style={{ ...shimmer, height: "15px", width: "55%", marginBottom: "10px" }} />
      <div style={{ ...shimmer, height: "30px", width: "70%", marginBottom: "10px" }} />
      <div style={{ ...shimmer, height: "12px", width: "60%" }} />
    </div>
  );
}

export default function InsightCards() {
  const { data, isLoading, isError } = useGetInsightsQuery();

  if (isError) return null; // fail silently — charts below still show

  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", margin: "20px 0" }}>
      {isLoading
        ? [1, 2, 3, 4].map((i) => <InsightCardSkeleton key={i} />)
        : data?.insights.map((card) => (
            <InsightCard key={card.id} data={card} />
          ))
      }
    </div>
  );
}