import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSelectedRole } from "../store/financeSlice";
import { useUpdateUserRoleMutation } from "../api/financeApi";
import {
  getStoredThemePreference,
  nextThemePreference,
  setThemePreference,
  type ThemePreference,
} from "../theme";

const roles = ["Admin", "Viewer"];

export default function Header() {
  const dispatch = useAppDispatch();
  const selectedRole = useAppSelector((state) => state.finance.selectedRole);
  const [updateRole] = useUpdateUserRoleMutation();
  const [theme, setTheme] = useState<ThemePreference>(() => getStoredThemePreference());

  const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    dispatch(setSelectedRole(newRole));      // update Redux state instantly
    await updateRole(newRole);              // also call the mock API
  };

  const handleThemeClick = () => {
    const next = nextThemePreference(theme);
    setTheme(next);
    setThemePreference(next);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
      <div>
        <h1 style={{ fontSize: "24px", fontWeight: "700", margin: 0 }}>Finance Dashboard</h1>
        <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "4px 0 0" }}>
          Manage and track your financial transactions
        </p>
      </div>

      <div style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "11px", color: "var(--text-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>
            THEME
          </div>
          <button
            type="button"
            onClick={handleThemeClick}
            style={{
              border: "1px solid var(--control-border)",
              borderRadius: "8px",
              padding: "6px 12px",
              fontSize: "14px",
              color: "var(--control-text)",
              background: "var(--control-bg)",
              cursor: "pointer",
            }}
          >
            {theme === "system" ? "System" : theme === "light" ? "Light" : "Dark"}
          </button>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "11px", color: "var(--text-subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>
            USER ROLE
          </div>
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            style={{
              border: "1px solid var(--control-border)", borderRadius: "8px",
              padding: "6px 12px", fontSize: "14px",
              color: "var(--control-text)", background: "var(--control-bg)", cursor: "pointer",
            }}
          >
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
