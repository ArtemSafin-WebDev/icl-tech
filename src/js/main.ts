import "virtual:svg-icons-register";
import "../scss/style.scss";
import footer from "./footer";
import numbersSlider from "./numbersSlider";
import news from "./news";
import header from "./header";
import intro from "./intro";

document.addEventListener("DOMContentLoaded", () => {
  footer();
  numbersSlider();
  news();
  header();
  intro();
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
