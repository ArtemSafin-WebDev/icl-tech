import Swiper from "swiper";
import "swiper/css";
import gsap from "gsap";

export default function news() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".js-news")
  );

  elements.forEach((element) => {
    const container = element.querySelector<HTMLElement>(".swiper");
    if (!container) return;
    const slides = Array.from(
      element.querySelectorAll<HTMLElement>(".swiper-slide")
    );
    const wrapper = element.querySelector<HTMLElement>(".swiper-wrapper");
    const nextArrow =
      element.querySelector<HTMLButtonElement>(".news__arrow--next");
    const prevArrow =
      element.querySelector<HTMLButtonElement>(".news__arrow--prev");
    const bullets = Array.from(
      element.querySelectorAll(".news__slider-pagination-bullet")
    );
    let autoplayEnabled = true;
    const AUTOPLAY_DURATION = 7;

    slides.forEach((slide) => {
      wrapper?.appendChild(slide.cloneNode(true));
    });

    const setActiveBullet = (index: number) => {
      const realSlideIndex =
        index >= slides.length ? index - slides.length : index;
      bullets.forEach((bullet) => {
        bullet.classList.remove("active");
      });
      bullets[realSlideIndex]?.classList.add("active");
    };

    const instance = new Swiper(container, {
      slidesPerView: "auto",
      speed: 600,
      loop: true,
      autoHeight: true,
      breakpoints: {
        641: {
          autoHeight: false,
        },
      },
      init: false,
      on: {
        touchMove: () => {
          stopAutoplay();
        },
        slideChange: (swiper) => {
          setActiveBullet(swiper.realIndex);
        },
        init: (swiper) => {
          setActiveBullet(swiper.realIndex);
        },
      },
    });

    instance.init();

    const autoplay = () => {
      if (!autoplayEnabled || !nextArrow) return;
      nextArrow.classList.add("autoplay-enabled");
      gsap.set(nextArrow, {
        "--p": "0%",
      });
      gsap.to(nextArrow, {
        "--p": "100%",
        duration: AUTOPLAY_DURATION,
        ease: "none",
        onComplete: () => {
          instance.slideNext();
          autoplay();
        },
      });
    };

    const stopAutoplay = () => {
      gsap.killTweensOf(nextArrow);
      gsap.set(nextArrow, {
        "--p": "0%",
      });
      nextArrow?.classList.remove("autoplay-enabled");
      autoplayEnabled = false;
    };

    nextArrow?.addEventListener("click", (event) => {
      event.preventDefault();
      stopAutoplay();
      instance.slideNext();
    });
    prevArrow?.addEventListener("click", (event) => {
      event.preventDefault();
      stopAutoplay();
      instance.slidePrev();
    });

    bullets.forEach((bullet, bulletIndex) => {
      bullet.addEventListener("click", (event) => {
        event.preventDefault();
        stopAutoplay();
        instance.slideToLoop(bulletIndex);
      });
    });

    autoplay();
  });
}
