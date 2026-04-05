// src/components/Transactions/TransactionFilters.tsx
import type { TransactionFilters } from "../../types";

interface Props {
  filters: TransactionFilters;
  categories: string[];
  isAdmin: boolean;          
  onAdd: () => void;
  onChange: (updated: Partial<TransactionFilters>) => void;
}

const selectStyle: React.CSSProperties = {
  padding: "9px 14px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  fontSize: "14px",
  color: "#374151",
  background: "#fff",
  cursor: "pointer",
  outline: "none",
  appearance: "none",
  paddingRight: "32px",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
};

export default function TransactionFilters({ filters, categories, isAdmin, onAdd, onChange }: Props) {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", gap: "12px",
      marginBottom: "28px", alignItems: "center",
    }}>
        {isAdmin && (
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={onAdd}
            style={{
              padding: "10px 20px", borderRadius: "10px",
              background: "#2563eb", border: "none",
              color: "#fff", fontSize: "14px", fontWeight: "600",
              cursor: "pointer", display: "flex",
              alignItems: "center", gap: "6px",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.background = "#1d4ed8")}
            onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.background = "#2563eb")}
          >
            <span style={{ fontSize: "18px", lineHeight: 1 }}>+</span>
            Add Transaction
          </button>
        </div>
      )}
      {/* Search */}
      <div style={{ position: "relative", flex: "1", minWidth: "200px", maxWidth: "300px" }}>
        <svg style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", opacity: 0.35 }}
          width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          style={{
            width: "100%", padding: "9px 12px 9px 36px",
            borderRadius: "10px", border: "1px solid #e5e7eb",
            fontSize: "14px", color: "#374151",
            outline: "none", boxSizing: "border-box",
          }}
        />
      </div>

      {/* Category */}
      <select
        style={selectStyle}
        value={filters.category}
        onChange={(e) => onChange({ category: e.target.value })}
      >
        <option>All Categories</option>
        {categories.map((c) => <option key={c}>{c}</option>)}
      </select>

      {/* Type */}
      <select
        style={selectStyle}
        value={filters.type}
        onChange={(e) => onChange({ type: e.target.value })}
      >
        <option>All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Sort by field */}
      <select
        style={selectStyle}
        value={filters.sortBy}
        onChange={(e) => onChange({ sortBy: e.target.value })}
      >
        <option value="date">Date</option>
        <option value="amount">Amount</option>
        <option value="description">Description</option>
      </select>

      {/* Sort order */}
      <select
        style={selectStyle}
        value={filters.sortOrder}
        onChange={(e) => onChange({ sortOrder: e.target.value })}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="highest">Highest Amount</option>
        <option value="lowest">Lowest Amount</option>
      </select>
    </div>
  );
}