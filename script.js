/* =========================
   ТЕМА (dark / light / black)
========================= */

const themeBtn = document.getElementById("themeBtn");
const root = document.documentElement;

const themes = ["dark", "light", "black"];
let currentTheme = localStorage.getItem("theme") || "dark";

function updateBtnIcon(theme) {
  if (!themeBtn) return;

  if (theme === "dark") themeBtn.textContent = "🌙";
  else if (theme === "light") themeBtn.textContent = "☀️";
  else if (theme === "black") themeBtn.textContent = "🖤";
}

function setTheme(theme) {
  currentTheme = theme;
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateBtnIcon(theme);
}

// инициализация темы
setTheme(currentTheme);

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const idx = themes.indexOf(currentTheme);
    const nextTheme = themes[(idx + 1) % themes.length];
    setTheme(nextTheme);
  });
}

/* =========================
   БУРГЕР-МЕНЮ
========================= */

const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

if (burger && navLinks) {

  burger.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("open");
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
      navLinks.classList.remove("open");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      navLinks.classList.remove("open");
    }
  });
}

/* =========================
   КНОПКА «ВВЕРХ»
========================= */

const topBtn = document.getElementById("topBtn");

if (topBtn) {
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
}

/* =========================
   КАРТОЧКИ — БЕЗ ЛОМАЮЩИХ АНИМАЦИЙ
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  // СНАЧАЛА ПОКАЗЫВАЕМ ВСЁ (ВАЖНО)
  cards.forEach(card => card.classList.add("show"));

  // Если есть IntersectionObserver — делаем красиво
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach(card => observer.observe(card));
  }
});
