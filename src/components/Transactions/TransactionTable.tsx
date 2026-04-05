// src/components/Transactions/TransactionTable.tsx
import type { Transaction } from "../../types";
import TransactionBadge from "./TransactionBadge";

interface Props {
  transactions: Transaction[];
  isAdmin: boolean;
  onEdit: (tx: Transaction) => void;
  onDelete: (id: string) => void;
}

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function formatAmount(amount: number): string {
  const abs = Math.abs(amount).toFixed(2);
  return amount >= 0 ? `+$${abs}` : `-$${abs}`;
}

const thStyle: React.CSSProperties = {
  padding: "0 16px 14px", textAlign: "left",
  fontSize: "13px", fontWeight: "700", color: "var(--text-strong)",
  borderBottom: "2px solid var(--border-subtle)", whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  padding: "16px", fontSize: "14px", color: "var(--text)",
  borderBottom: "1px solid var(--border-subtle)", verticalAlign: "middle",
};

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6M14 11v6"/>
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  );
}

export default function TransactionTable({ transactions, isAdmin, onEdit, onDelete }: Props) {
  if (transactions.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-subtle)", fontSize: "14px" }}>
        No transactions match your filters.
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Category</th>
            <th style={{ ...thStyle, textAlign: "right" }}>Amount</th>
            <th style={{ ...thStyle, textAlign: "right" }}>Type</th>
            {isAdmin && <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, i) => (
            <tr
              key={tx.id}
              style={{ background: i % 2 === 0 ? "var(--surface)" : "transparent" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "var(--surface)" : "transparent")}
            >
              <td style={{ ...tdStyle, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                {formatDate(tx.date)}
              </td>
              <td style={{ ...tdStyle, fontWeight: "500", color: "var(--text-strong)" }}>
                {tx.description}
              </td>
              <td style={tdStyle}>{tx.category}</td>
              <td style={{
                ...tdStyle, textAlign: "right", fontWeight: "700",
                color: tx.amount >= 0 ? "var(--success)" : "var(--danger)", whiteSpace: "nowrap",
              }}>
                {formatAmount(tx.amount)}
              </td>
              <td style={{ ...tdStyle, textAlign: "right" }}>
                <TransactionBadge type={tx.type} />
              </td>

              {/* Admin-only Actions */}
              {isAdmin && (
                <td style={{ ...tdStyle, textAlign: "right" }}>
                  <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                    {/* Edit button */}
                    <button
                      onClick={() => onEdit(tx)}
                      title="Edit"
                      style={{
                        background: "none", border: "1px solid var(--control-border)",
                        borderRadius: "8px", padding: "6px",
                        cursor: "pointer", color: "var(--text-muted)",
                        display: "flex", alignItems: "center",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "var(--primary-soft-bg)";
                        (e.currentTarget as HTMLButtonElement).style.color = "var(--primary)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--primary-soft-border)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "none";
                        (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--control-border)";
                      }}
                    >
                      <EditIcon />
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => onDelete(tx.id)}
                      title="Delete"
                      style={{
                        background: "none", border: "1px solid var(--control-border)",
                        borderRadius: "8px", padding: "6px",
                        cursor: "pointer", color: "var(--text-muted)",
                        display: "flex", alignItems: "center",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "var(--danger-bg)";
                        (e.currentTarget as HTMLButtonElement).style.color = "var(--danger)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--danger-border)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "none";
                        (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--control-border)";
                      }}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}