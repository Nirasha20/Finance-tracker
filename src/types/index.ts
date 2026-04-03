export type TrendDirection = 'up' | 'down';

export interface StatCardData {
    id: string;
    title: string;
    amount: number;
    currency: string;
    changePercent: number;
    trend: TrendDirection;
    variant: 'primary' | 'default';

}
// Shape of the full API response
export interface FinanceSummaryResponse {
  stats: StatCardData[];
  lastUpdated: string;
}


export interface FinanceState {
  stats: StatCardData[];
  lastUpdated: string | null;
  selectedRole: string;
}