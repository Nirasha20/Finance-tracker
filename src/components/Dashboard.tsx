
import Header from "./Header";
import StatCard from "./StatCard";
import LoadingSkeleton from "./LoadingSkeleton";
import { useGetFinanceSummaryQuery } from "../api/financeApi";
import ChartsRow from "./ChartsRow";
import InsightCards from "./InsightCards";
import Transactions from "./Transactions";
export default function Dashboard() {
  const { data, isLoading, isError, refetch } = useGetFinanceSummaryQuery();

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "var(--page-bg)",
        padding: 0,
        margin: 0,
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "stretch",
          width: "100%",
          padding: "40px 24px 0 24px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ width: "100%" }}>
          <Header />

          {isLoading && <LoadingSkeleton />}
          {isError && (
            <div
              style={{
                background: "var(--danger-bg)",
                border: "1px solid var(--danger-border)",
                borderRadius: "12px",
                padding: "20px",
                color: "var(--danger)",
              }}
            >
              <strong>Failed to load data.</strong>
              <button
                onClick={refetch}
                style={{
                  marginLeft: "12px",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  border: "1px solid var(--danger-border)",
                  background: "var(--surface)",
                  color: "var(--danger)",
                  cursor: "pointer",
                }}
              >
                Retry
              </button>
            </div>
          )}
          {data && (
            <>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--text-subtle)",
                  marginBottom: "16px",
                }}
              >
                Last updated: {new Date(data.lastUpdated).toLocaleTimeString()}
                <button
                  onClick={refetch}
                  style={{
                    marginLeft: "10px",
                    fontSize: "12px",
                    color: "#6366f1",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  ↻ Refresh
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                }}
              >
                {data.stats.map((card) => (
                  <StatCard key={card.id} data={card} />
                ))}
              </div>
              <ChartsRow />

              <InsightCards />
              <Transactions />
            </>
          )}
        </div>
      </div>
    </div>
  );
}