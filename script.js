const themeBtn = document.getElementById("themeBtn");
const root = document.documentElement;

// Сохраняем тему в localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
  themeBtn.textContent = savedTheme === "dark" ? "🌙" : "☀️";
}

// Переключение темы
themeBtn.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  themeBtn.textContent = newTheme === "dark" ? "🌙" : "☀️";
});
