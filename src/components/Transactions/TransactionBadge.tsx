// src/components/Transactions/TransactionBadge.tsx
import  type { TransactionType } from "../../types";

interface Props {
  type: TransactionType;
}

export default function TransactionBadge({ type }: Props) {
  const isIncome = type === "income";
  return (
    <span style={{
      display: "inline-block",
      padding: "4px 14px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: "600",
      background: isIncome ? "var(--success-bg)" : "var(--danger-bg)",
      color:      isIncome ? "var(--success)" : "var(--danger)",
      border: `1px solid ${isIncome ? "var(--success-border)" : "var(--danger-border)"}`,
      whiteSpace: "nowrap",
    }}>
      {isIncome ? "Income" : "Expense"}
    </span>
  );
}