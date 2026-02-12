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

  // закрытие меню при клике на ссылку
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  // закрытие при клике вне меню
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
      navLinks.classList.remove("open");
    }
  });

  // закрытие по Escape
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
   АНИМАЦИЯ КАРТОЧЕК (КАСКАД)
========================= */

const cards = document.querySelectorAll(".card");

if ("IntersectionObserver" in window && cards.length > 0) {

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          const index = [...cards].indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.15}s`;

          entry.target.classList.add("show");
          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  cards.forEach(card => observer.observe(card));

} else {
  // fallback для старых браузеров
  cards.forEach(card => card.classList.add("show"));
}
