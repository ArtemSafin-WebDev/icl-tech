import "virtual:svg-icons-register";
import "../scss/style.scss";
import footer from "./footer";
import numbersSlider from "./numbersSlider";
import news from "./news";
import header from "./header";
import intro from "./intro";
import forms from "./forms";
import modals from "./modals";

document.addEventListener("DOMContentLoaded", () => {
  footer();
  numbersSlider();
  news();
  header();
  intro();
  forms();
  modals();
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
