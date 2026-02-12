const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const themes = ["dark","light","black"];
let currentTheme = localStorage.getItem("theme") || "dark";

function setTheme(theme){
  currentTheme = theme;
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if(themeBtn){
    themeBtn.textContent =
      theme === "dark" ? "🌙" :
      theme === "light" ? "☀️" : "🖤";
  }
}

setTheme(currentTheme);

themeBtn?.addEventListener("click",()=>{
  const i = themes.indexOf(currentTheme);
  setTheme(themes[(i+1)%themes.length]);
});

/* карточки — безопасно */
document.querySelectorAll(".card").forEach(card=>{
  card.classList.add("show");
});

/* кнопка вверх */
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll",()=>{
  topBtn?.classList.toggle("show", window.scrollY > 300);
});
topBtn?.addEventListener("click",()=>{
  window.scrollTo({top:0,behavior:"smooth"});
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".card").forEach(card => {
    card.classList.add("show");
  });
});
