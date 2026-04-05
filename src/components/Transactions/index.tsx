// src/components/Transactions/index.tsx
import { useState, useMemo, useEffect } from "react";
import {
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
  useUpdateTransactionMutation,
} from "../../api/financeApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  hydrateTransactions, addTransaction,
  updateTransaction, deleteTransaction,
} from "../../store/transactionSlice";
import type { Transaction, TransactionFilters as TFilters, TransactionFormData } from "../../types";
import TransactionFilters from "./TransactionFilters";
import TransactionTable from "./TransactionTable";
import TransactionModal from "./TransactionModal";

const defaultFilters: TFilters = {
  search: "", category: "All Categories",
  type: "All Types", sortBy: "date", sortOrder: "newest",
};

type ModalState =
  | { open: false }
  | { open: true; mode: "add" }
  | { open: true; mode: "edit"; transaction: Transaction };

function SkeletonRows() {
  const shimmer: React.CSSProperties = {
    background: "linear-gradient(90deg,var(--skeleton-1) 25%,var(--skeleton-2) 50%,var(--skeleton-1) 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s infinite",
    borderRadius: "6px", height: "14px",
  };
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <tr key={i} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
          {[40, 55, 30, 20, 15].map((w, j) => (
            <td key={j} style={{ padding: "18px 16px" }}>
              <div style={{ ...shimmer, width: `${w}%` }} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default function Transactions() {
  const dispatch = useAppDispatch();

  // Read role from Redux (set by Header dropdown)
  const selectedRole = useAppSelector((s) => s.finance.selectedRole);
  const isAdmin = selectedRole === "Admin";

  // Transactions from Redux store (after hydration)
  const items = useAppSelector((s) => s.transactions.items);
  const hydrated = useAppSelector((s) => s.transactions.hydrated);

  const { data, isLoading, isError } = useGetTransactionsQuery();
  const [createTransaction] = useCreateTransactionMutation();
  const [patchTransaction] = useUpdateTransactionMutation();
  const [removeTransaction] = useDeleteTransactionMutation();
  const [filters, setFilters] = useState<TFilters>(defaultFilters);
  const [modal, setModal] = useState<ModalState>({ open: false });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Hydrate Redux store once from API
  useEffect(() => {
    if (data && !hydrated) {
      dispatch(hydrateTransactions(data.transactions));
    }
  }, [data, hydrated, dispatch]);

  // Unique categories from current items
  const categories = useMemo(
    () => [...new Set(items.map((t) => t.category))].sort(),
    [items]
  );

  // Filter + sort
  const filtered = useMemo<Transaction[]>(() => {
    let result = [...items];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    if (filters.category !== "All Categories")
      result = result.filter((t) => t.category === filters.category);
    if (filters.type !== "All Types")
      result = result.filter((t) => t.type === filters.type);

    result.sort((a, b) => {
      switch (filters.sortOrder) {
        case "newest":  return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":  return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "highest": return Math.abs(b.amount) - Math.abs(a.amount);
        case "lowest":  return Math.abs(a.amount) - Math.abs(b.amount);
        default:        return 0;
      }
    });

    return result;
  }, [items, filters]);

  // Save handler — add or update
  function handleSave(form: TransactionFormData) {
    const rawAmount = parseFloat(form.amount);
    const amount = form.type === "expense" ? -Math.abs(rawAmount) : Math.abs(rawAmount);

    if (modal.open && modal.mode === "edit") {
      const previous = modal.transaction;
      const next: Transaction = {
        ...previous,
        date: form.date,
        description: form.description,
        category: form.category,
        amount,
        type: form.type,
      };

      dispatch(updateTransaction(next));
      patchTransaction(next)
        .unwrap()
        .catch(() => {
          dispatch(updateTransaction(previous));
        });
    } else {
      const tx: Transaction = {
        id: `tx-${Date.now()}`,
        date: form.date,
        description: form.description,
        category: form.category,
        amount,
        type: form.type,
      };

      dispatch(addTransaction(tx));
      createTransaction(tx)
        .unwrap()
        .catch(() => {
          dispatch(deleteTransaction(tx.id));
        });
    }
    setModal({ open: false });
  }

  // Delete with inline confirmation
  function handleDeleteClick(id: string) {
    setDeleteConfirm(id); // show confirm state
  }
  function confirmDelete(id: string) {
    const previous = items.find((t) => t.id === id);
    dispatch(deleteTransaction(id));
    setDeleteConfirm(null);

    removeTransaction(id)
      .unwrap()
      .catch(() => {
        if (previous) dispatch(addTransaction(previous));
      });
  }

  return (
    <>
      <div style={{
        background: "var(--surface)", borderRadius: "16px",
        padding: "28px 28px 12px", border: "1px solid var(--border-strong)",
        marginTop: "20px",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", margin: 0, color: "var(--text-strong)" }}>
            Transactions
          </h2>
          {!isLoading && (
            <span style={{ fontSize: "13px", color: "var(--text-subtle)" }}>
              {filtered.length} of {items.length} transactions
            </span>
          )}
        </div>

        {/* Filters + Add button */}
        <TransactionFilters
          filters={filters}
          categories={categories}
          isAdmin={isAdmin}
          onAdd={() => setModal({ open: true, mode: "add" })}
          onChange={(u) => setFilters((p) => ({ ...p, ...u }))}
        />

        {/* Delete confirmation banner */}
        {deleteConfirm && (
          <div style={{
            background: "var(--danger-bg)", border: "1px solid var(--danger-border)",
            borderRadius: "10px", padding: "12px 16px",
            marginBottom: "16px", display: "flex",
            justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: "14px", color: "var(--danger)", fontWeight: "500" }}>
              Are you sure you want to delete this transaction?
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  padding: "6px 14px", borderRadius: "8px",
                  border: "1px solid var(--control-border)", background: "var(--control-bg)",
                  fontSize: "13px", cursor: "pointer", color: "var(--text)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(deleteConfirm)}
                style={{
                  padding: "6px 14px", borderRadius: "8px",
                  border: "none", background: "var(--danger)",
                  fontSize: "13px", cursor: "pointer", color: "#fff",
                  fontWeight: "600",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )}

        {isError && (
          <div style={{ color: "var(--danger)", padding: "20px", textAlign: "center", fontSize: "14px" }}>
            Failed to load transactions.
          </div>
        )}

        {isLoading ? (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border-subtle)" }}>
                  {["Date","Description","Category","Amount","Type"].map((h) => (
                    <th key={h} style={{ padding: "0 16px 14px", textAlign: "left", fontSize: "13px", fontWeight: "700", color: "var(--text-strong)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody><SkeletonRows /></tbody>
            </table>
          </div>
        ) : (
          <TransactionTable
            transactions={filtered}
            isAdmin={isAdmin}
            onEdit={(tx) => setModal({ open: true, mode: "edit", transaction: tx })}
            onDelete={handleDeleteClick}
          />
        )}
      </div>

      {/* Modal — rendered outside the card, above everything */}
      {modal.open && (
        <TransactionModal
          mode={modal.mode}
          initial={modal.mode === "edit" ? modal.transaction : undefined}
          categories={categories}
          onSave={handleSave}
          onClose={() => setModal({ open: false })}
        />
      )}
    </>
  );
}