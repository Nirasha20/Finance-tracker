// src/components/Transactions/TransactionModal.tsx
import { useState, useEffect } from "react";
import type { Transaction, TransactionFormData } from "../../types";

interface Props {
  mode: "add" | "edit";
  initial?: Transaction;
  categories: string[];
  onSave: (data: TransactionFormData) => void;
  onClose: () => void;
}

const CATEGORIES = [
  "Salary", "Freelance Work", "Food & Dining", "Utilities",
  "Entertainment", "Shopping", "Health", "Education",
  "Transportation", "Travel", "Other",
];

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px",
  borderRadius: "10px", border: "1px solid #e5e7eb",
  fontSize: "14px", color: "#111827",
  outline: "none", boxSizing: "border-box",
  transition: "border-color 0.15s",
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "13px",
  fontWeight: "600", color: "#374151",
  marginBottom: "6px",
};

export default function TransactionModal({ mode, initial, categories, onSave, onClose }: Props) {
  const allCategories = [...new Set([...CATEGORIES, ...categories])].sort();

  const [form, setForm] = useState<TransactionFormData>({
    date: initial?.date ?? new Date().toISOString().split("T")[0],
    description: initial?.description ?? "",
    category: initial?.category ?? "Salary",
    amount: initial ? String(Math.abs(initial.amount)) : "",
    type: initial?.type ?? "income",
  });

  const [errors, setErrors] = useState<Partial<TransactionFormData>>({});

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  function validate(): boolean {
    const newErrors: Partial<TransactionFormData> = {};
    if (!form.date) newErrors.date = "Date is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      newErrors.amount = "Enter a valid positive amount";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (validate()) onSave(form);
  }

  function field(
    label: string,
    key: keyof TransactionFormData,
    input: React.ReactNode
  ) {
    return (
      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>{label}</label>
        {input}
        {errors[key] && (
          <div style={{ fontSize: "12px", color: "#dc2626", marginTop: "4px" }}>
            {errors[key]}
          </div>
        )}
      </div>
    );
  }

  return (
    // Backdrop
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        background: "rgba(0,0,0,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Modal panel — stop click propagation */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: "20px",
          padding: "32px", width: "100%", maxWidth: "480px",
          boxShadow: "0 24px 48px rgba(0,0,0,0.18)",
          animation: "modalIn 0.18s ease",
        }}
      >
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: translateY(12px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#111827" }}>
            {mode === "add" ? "Add Transaction" : "Edit Transaction"}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "#f3f4f6", border: "none", borderRadius: "8px",
              width: "32px", height: "32px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", color: "#6b7280",
            }}
          >
            ×
          </button>
        </div>

        {/* Type toggle */}
        {field("Type", "type",
          <div style={{ display: "flex", gap: "8px" }}>
            {(["income", "expense"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setForm((f) => ({ ...f, type: t }))}
                style={{
                  flex: 1, padding: "10px",
                  borderRadius: "10px", cursor: "pointer",
                  fontSize: "14px", fontWeight: "600",
                  border: form.type === t
                    ? `2px solid ${t === "income" ? "#16a34a" : "#dc2626"}`
                    : "2px solid #e5e7eb",
                  background: form.type === t
                    ? t === "income" ? "#dcfce7" : "#fee2e2"
                    : "#fff",
                  color: form.type === t
                    ? t === "income" ? "#16a34a" : "#dc2626"
                    : "#6b7280",
                  transition: "all 0.15s",
                }}
              >
                {t === "income" ? "↑ Income" : "↓ Expense"}
              </button>
            ))}
          </div>
        )}

        {/* Date */}
        {field("Date", "date",
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            style={{ ...inputStyle, borderColor: errors.date ? "#dc2626" : "#e5e7eb" }}
          />
        )}

        {/* Description */}
        {field("Description", "description",
          <input
            type="text"
            placeholder="e.g. Monthly salary"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            style={{ ...inputStyle, borderColor: errors.description ? "#dc2626" : "#e5e7eb" }}
          />
        )}

        {/* Category */}
        {field("Category", "category",
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            style={{ ...inputStyle, appearance: "none" }}
          >
            {allCategories.map((c) => <option key={c}>{c}</option>)}
          </select>
        )}

        {/* Amount */}
        {field("Amount ($)", "amount",
          <div style={{ position: "relative" }}>
            <span style={{
              position: "absolute", left: "14px", top: "50%",
              transform: "translateY(-50%)", color: "#9ca3af", fontSize: "14px",
            }}>$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              style={{
                ...inputStyle,
                paddingLeft: "28px",
                borderColor: errors.amount ? "#dc2626" : "#e5e7eb",
              }}
            />
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "12px", borderRadius: "10px",
              border: "1px solid #e5e7eb", background: "#fff",
              fontSize: "14px", fontWeight: "600", color: "#374151",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            style={{
              flex: 1, padding: "12px", borderRadius: "10px",
              border: "none", background: "#2563eb",
              fontSize: "14px", fontWeight: "600", color: "#fff",
              cursor: "pointer", transition: "background 0.15s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.background = "#1d4ed8")}
            onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.background = "#2563eb")}
          >
            {mode === "add" ? "Add Transaction" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}