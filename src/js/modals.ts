export default function modals() {
  document.addEventListener("click", (event) => {
    const target = event?.target as HTMLElement;
    if (target.matches(".js-open-modal") || target.closest(".js-open-modal")) {
      const link = (
        target.matches(".js-open-modal")
          ? target
          : target.closest(".js-open-modal")
      ) as HTMLAnchorElement;
      const hash = link.hash;
      if (!hash) return;
      const modal = document.querySelector<HTMLElement>(`.js-modal${hash}`);
      if (!modal) return;
      modal.classList.add("active");
      document.body.classList.add("modal-open");
      document.body.classList.remove("menu-open");
      return;
    }
    if (
      target.matches(".js-close-modal") ||
      target.closest(".js-close-modal")
    ) {
      const closestModal = target.closest(".js-modal");
      closestModal?.classList.remove("active");
      document.body.classList.remove("modal-open");
      return;
    }

    if (target.matches(".js-modal")) {
      target.classList.remove("active");
      document.body.classList.remove("modal-open");
      return;
    }
  });
}
