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

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// анимация карточек при скролле
const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2
  }
);

cards.forEach(card => observer.observe(card));
