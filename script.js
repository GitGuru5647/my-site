const btn = document.getElementById("themeBtn");
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  btn.textContent = theme === "dark" ? "🌙" : "☀️";
}

const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

btn.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

// ====== подсветка меню ======
const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

function updateActiveLink() {
  let index = sections.length;

  while (--index && window.scrollY + 150 < sections[index].offsetTop) {}

  links.forEach(link => link.classList.remove("active"));
  links[index].classList.add("active");
}

updateActiveLink();
window.addEventListener("scroll", updateActiveLink);

// ====== анимация появления ======
const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

cards.forEach(card => observer.observe(card));
