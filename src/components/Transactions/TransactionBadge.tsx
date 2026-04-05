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
      background: isIncome ? "#dcfce7" : "#fee2e2",
      color:      isIncome ? "#16a34a" : "#dc2626",
      border: `1px solid ${isIncome ? "#bbf7d0" : "#fecaca"}`,
      whiteSpace: "nowrap",
    }}>
      {isIncome ? "Income" : "Expense"}
    </span>
  );
}