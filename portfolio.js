const themeButton = document.querySelector("#theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const preferenceKey = "alliah-portfolio-theme";

function readPreference() {
  try {
    const value = localStorage.getItem(preferenceKey);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

let preference = readPreference();

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute("aria-pressed", String(isDark));
  themeButton.textContent = isDark ? "Light mode" : "Dark mode";
}

applyTheme(preference ?? (systemTheme.matches ? "dark" : "light"));

themeButton.addEventListener("click", () => {
  preference = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(preference);
  try {
    localStorage.setItem(preferenceKey, preference);
  } catch {
    // The theme still works if the browser blocks storage for local files.
  }
});

systemTheme.addEventListener("change", ({ matches }) => {
  if (!preference) applyTheme(matches ? "dark" : "light");
});

