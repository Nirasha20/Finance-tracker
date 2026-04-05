// src/components/StatCard.tsx
import type { StatCardData } from "../types";

interface Props {
  data: StatCardData;
}

// Arrow icons as tiny SVG components — no external library needed
const ArrowUp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

const ArrowDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M7 7l10 10M17 17H7M17 17V7" />
  </svg>
);

const WalletIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" />
    <path d="M16 12h5v4h-5a2 2 0 0 1 0-4Z" />
  </svg>
);

// Format number to currency string: 42331.04 → "$42,331.04"
function formatCurrency(amount: number, currency: string): string {
  return `${currency}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function StatCard({ data }: Props) {
  const { title, amount, currency, changePercent, trend, variant } = data;

  const isPrimary = variant === "primary";
  const isUp = trend === "up";

  // Styles change based on variant
  const cardStyle: React.CSSProperties = {
    background: isPrimary ? "#2563EB" : "var(--surface)",
    color: isPrimary ? "#ffffff" : "var(--text-strong)",
    borderRadius: "16px",
    padding: "24px",
    flex: 1,
    minWidth: "220px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    border: isPrimary ? "none" : `2px solid ${isUp ? "var(--success)" : "var(--danger)"}`,
    position: "relative",
  };

  const trendColor = isPrimary
    ? "#86efac"                          // soft green on blue bg
    : isUp ? "var(--success)" : "var(--danger)";

  const changeLabelColor = isPrimary ? "#bbf7d0" : trendColor;

  return (
    <div style={cardStyle}>
      {/* Top row: title + icon */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "14px", opacity: isPrimary ? 0.85 : 0.6 }}>
          {title}
        </span>
        {isPrimary && (
          <span style={{ opacity: 0.7 }}>
            <WalletIcon />
          </span>
        )}
        {!isPrimary && (
          <span style={{ color: trendColor }}>
            {isUp ? <ArrowUp /> : <ArrowDown />}
          </span>
        )}
      </div>

      {/* Amount */}
      <div style={{ fontSize: "28px", fontWeight: "700", letterSpacing: "-0.5px" }}>
        {formatCurrency(amount, currency)}
      </div>

      {/* Trend label */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", color: changeLabelColor, fontSize: "13px", fontWeight: "500" }}>
        {isUp ? <ArrowUp /> : <ArrowDown />}
        <span>
          {isPrimary
            ? "Positive trend"
            : `${isUp ? "+" : "-"}${changePercent}% this month`}
        </span>
      </div>
    </div>
  );
}