/* =========================
   ТЕМА (dark / light / black)
========================= */
const themeBtn = document.getElementById("themeBtn");
const root = document.documentElement;

const themes = ["dark", "light", "black"];
let currentTheme = localStorage.getItem("theme") || "dark";

function updateBtnIcon(theme) {
  if (theme === "dark") themeBtn.textContent = "🌙";
  if (theme === "light") themeBtn.textContent = "☀️";
  if (theme === "black") themeBtn.textContent = "🖤";
}

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateBtnIcon(theme);
}

setTheme(currentTheme);

themeBtn.addEventListener("click", () => {
  const idx = themes.indexOf(currentTheme);
  currentTheme = themes[(idx + 1) % themes.length];
  setTheme(currentTheme);
});


/* =========================
   БУРГЕР-МЕНЮ
========================= */
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// закрытие меню при клике на ссылку
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});


/* =========================
   КНОПКА «ВВЕРХ»
========================= */
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


/* =========================
   АНИМАЦИЯ КАРТОЧЕК (КАСКАД)
========================= */
const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = [...cards].indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.15}s`;
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2
  }
);

cards.forEach(card => observer.observe(card));
