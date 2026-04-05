/* eslint-disable react-refresh/only-export-components */

export interface InsightCardData {
  id: string;
  label: string;           
  title: string;           
  value: string;           
  subtitle: string;        
  subtitleColor?: string; 
  icon: "bolt" | "trend-up" | "bar-chart" | "trend-down";
  accentColor: string;     
  bgColor: string;        
  borderColor: string;     
}

// src/components/InsightCards/icons.tsx

interface IconProps {
  color: string;
  size?: number;
}

export function BoltIcon({ color, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z"
        stroke={color} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function TrendUpIcon({ color, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M3 17L9 11L13 15L21 7"
        stroke={color} strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M15 7H21V13"
        stroke={color} strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

export function BarChartIcon({ color, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3"  y="12" width="4" height="9" rx="1" stroke={color} strokeWidth="2" />
      <rect x="10" y="7"  width="4" height="14" rx="1" stroke={color} strokeWidth="2" />
      <rect x="17" y="3"  width="4" height="18" rx="1" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export function TrendDownIcon({ color, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M3 7L9 13L13 9L21 17"
        stroke={color} strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M15 17H21V11"
        stroke={color} strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

// Map icon string key → component
export function renderIcon(icon: string, color: string) {
  const props = { color, size: 20 };
  switch (icon) {
    case "bolt":       return <BoltIcon {...props} />;
    case "trend-up":   return <TrendUpIcon {...props} />;
    case "bar-chart":  return <BarChartIcon {...props} />;
    case "trend-down": return <TrendDownIcon {...props} />;
    default:           return null;
  }
}

export interface InsightsResponse {
  insights: InsightCardData[];
}