const btn = document.getElementById("themeBtn");
const root = document.documentElement;

// список тем
const themes = ["dark", "light", "black"];
let currentTheme = localStorage.getItem("theme") || "dark";

function updateBtnIcon(theme) {
  if (theme === "dark") btn.textContent = "🌙";
  if (theme === "light") btn.textContent = "☀️";
  if (theme === "black") btn.textContent = "🖤";
}

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateBtnIcon(theme);
}

setTheme(currentTheme);

btn.addEventListener("click", () => {
  const idx = themes.indexOf(currentTheme);
  currentTheme = themes[(idx + 1) % themes.length];
  setTheme(currentTheme);
});
