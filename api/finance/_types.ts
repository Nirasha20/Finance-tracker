export type TrendDirection = "up" | "down";
export type TransactionType = "income" | "expense";

export interface StatCardData {
  id: string;
  title: string;
  amount: number;
  currency: string;
  changePercent: number;
  trend: TrendDirection;
  variant: "primary" | "default";
}

export interface FinanceSummaryResponse {
  stats: StatCardData[];
  lastUpdated: string;
}

export interface BalanceTrendPoint {
  date: string;
  balance: number;
}

export interface SpendingCategory {
  name: string;
  amount: number;
  color: string;
}

export interface ChartsResponse {
  balanceTrend: BalanceTrendPoint[];
  spendingBreakdown: SpendingCategory[];
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: TransactionType;
}

export interface TransactionsResponse {
  transactions: Transaction[];
}

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

export interface InsightsResponse {
  insights: InsightCardData[];
}

export type QueryValue = string | string[];

export interface ReqLike {
  method?: string;
  query?: Record<string, QueryValue | undefined>;
  body?: unknown;
}

export interface ResLike {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(body?: string): void;
}
