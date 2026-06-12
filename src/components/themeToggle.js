export function initThemeToggle() {
  const button = document.querySelector("#theme-toggle");
  const html = document.documentElement;
  const moonIcon = document.querySelector(".theme-icon-moon");
  const sunIcon = document.querySelector(".theme-icon-sun");

  if (!button || !moonIcon || !sunIcon) {
    return;
  }

  const syncIcons = () => {
    const dark = html.classList.contains("dark");
    moonIcon.classList.toggle("is-hidden", dark);
    sunIcon.classList.toggle("is-hidden", !dark);
  };

  const preferDark =
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);

  html.classList.toggle("dark", preferDark);
  syncIcons();

  button.addEventListener("click", () => {
    html.classList.toggle("dark");
    localStorage.theme = html.classList.contains("dark") ? "dark" : "light";
    syncIcons();
  });
}
