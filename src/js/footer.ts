export default function footer() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".page-footer")
  );

  elements.forEach((footer) => {
    const cols = Array.from(footer.querySelectorAll(".page-footer__col"));
    cols.forEach((col) => {
      const btn = col.querySelector<HTMLElement>(
        ".page-footer__col-accordion-btn"
      );
      btn?.addEventListener("click", (event) => {
        event.preventDefault();
        cols.forEach((someCol) => {
          if (someCol !== col) {
            someCol.classList.remove("open");
          }
        });
        col.classList.toggle("open");
      });
    });
  });
}
