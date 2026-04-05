// src/components/InsightCards/InsightCard.tsx
import { renderIcon } from "./icons";

type InsightCardData = {
  label: string;
  title: string;
  value: string | number;
  subtitle: string;
  subtitleColor?: string;
  icon: Parameters<typeof renderIcon>[0];
  accentColor: string;
  bgColor: string;
  borderColor: string;
};

interface Props {
  data: InsightCardData;
}

export default function InsightCard({ data }: Props) {
  const {
    label, title, value, subtitle,
    subtitleColor, icon, accentColor, bgColor, borderColor,
  } = data;

  return (
    <div style={{
      flex: 1,
      minWidth: "200px",
      background: bgColor,
      border: `1px solid ${borderColor}`,
      borderRadius: "16px",
      padding: "20px 22px",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      transition: "transform 0.15s ease, box-shadow 0.15s ease",
      cursor: "default",
    }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.07)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Top row: label + icon */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "4px",
      }}>
        <span style={{
          fontSize: "11px",
          fontWeight: "700",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: accentColor,
        }}>
          {label}
        </span>
        <span>{renderIcon(icon, accentColor)}</span>
      </div>

      {/* Title */}
      <div style={{
        fontSize: "15px",
        fontWeight: "700",
        color: "#111827",
      }}>
        {title}
      </div>

      {/* Value */}
      <div style={{
        fontSize: "26px",
        fontWeight: "800",
        color: "#111827",
        letterSpacing: "-0.5px",
        lineHeight: 1.1,
        margin: "4px 0",
      }}>
        {value}
      </div>

      {/* Subtitle */}
      <div style={{
        fontSize: "12px",
        color: subtitleColor ?? "#6b7280",
        fontWeight: subtitleColor ? "600" : "400",
      }}>
        {subtitle}
      </div>
    </div>
  );
}