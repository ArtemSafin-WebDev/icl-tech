import { callAfterResize } from "./utils";

export default function header() {
  const header = document.querySelector<HTMLElement>(".page-header");
  if (!header) return;

  const searchToggle = header.querySelector<HTMLElement>(
    ".page-header__search-toggle-btn"
  );
  const search = header.querySelector<HTMLElement>(".page-header__search");
  const burger = header.querySelector<HTMLButtonElement>(
    ".page-header__mobile-burger"
  );
  const navLinks = Array.from(
    header.querySelectorAll<HTMLLinkElement>(".page-header__nav-link")
  );

  searchToggle?.addEventListener("click", (event) => {
    event.preventDefault();
    search?.classList.toggle("search-open");
  });

  burger?.addEventListener("click", (event) => {
    event.preventDefault();
    if (document.body.classList.contains("menu-open")) {
      document.body.classList.remove("menu-open");
    } else {
      document.body.classList.add("menu-open");
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (
        link.nextElementSibling &&
        window.matchMedia("(max-width: 640px)").matches
      ) {
        event.preventDefault();
        link.parentElement?.classList.toggle("open");
      }
    });
  });

  let headerOffsetTop = 0;

  const calculateOffset = () => {
    headerOffsetTop = parseFloat(
      window.getComputedStyle(header).getPropertyValue("top")
    );
    if (Math.floor(headerOffsetTop) === 0) {
      headerOffsetTop = 1;
    }
  };

  calculateOffset();

  const fixHeader = () => {
    if (window.scrollY >= headerOffsetTop) {
      document.body.classList.add("fixed-header");
    } else {
      document.body.classList.remove("fixed-header");
    }
  };

  fixHeader();

  window.addEventListener("scroll", () => {
    console.log("Header offset", headerOffsetTop);
    fixHeader();
  });

  callAfterResize(() => {
    calculateOffset();
    fixHeader();
  });
}
