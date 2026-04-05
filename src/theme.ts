export type ThemePreference = "system" | "light" | "dark";

const STORAGE_KEY = "finance-tracker:theme";

export function getStoredThemePreference(): ThemePreference {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === "light" || raw === "dark" || raw === "system") return raw;
  return "system";
}

export function applyThemePreference(pref: ThemePreference): void {
  const root = document.documentElement;

  if (pref === "system") {
    delete root.dataset.theme;
    // Allow UA to pick correct built-in control styling.
    root.style.colorScheme = "light dark";
    return;
  }

  root.dataset.theme = pref;
  root.style.colorScheme = pref;
}

export function setThemePreference(pref: ThemePreference): void {
  localStorage.setItem(STORAGE_KEY, pref);
  applyThemePreference(pref);
}

export function initTheme(): void {
  applyThemePreference(getStoredThemePreference());
}

export function nextThemePreference(current: ThemePreference): ThemePreference {
  switch (current) {
    case "system":
      return "light";
    case "light":
      return "dark";
    case "dark":
      return "system";
  }
}
