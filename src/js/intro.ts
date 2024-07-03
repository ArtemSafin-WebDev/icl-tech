import Swiper from "swiper";

import { Controller, EffectFade } from "swiper/modules";
import gsap from "gsap";
import "swiper/css";
import "swiper/css/effect-fade";

export default function intro() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".intro"));

  elements.forEach((element) => {
    const mainContainer = element.querySelector<HTMLElement>(
      ".intro__main-slider .swiper"
    );
    const bgContainer = element.querySelector<HTMLElement>(
      ".intro__bg-slider .swiper"
    );
    const bullets = Array.from(
      element.querySelectorAll<HTMLElement>(
        ".intro__main-slider-pagination-bullet"
      )
    );
    const AUTOPLAY_DURATION = 10;
    const prevArrow = element.querySelector<HTMLElement>(".intro__arrow--prev");
    const nextArrow = element.querySelector<HTMLElement>(".intro__arrow--next");

    let autoplayDisabled = false;
    if (!mainContainer || !bgContainer) return;
    nextArrow?.classList.add("autoplay-enabled");

    const setActiveBullet = (index: number) => {
      bullets.forEach((bullet) => bullet.classList.remove("active"));
      bullets.forEach((bullet, bulletIndex) => {
        if (bulletIndex < index) {
          bullet.classList.add("prev");
        } else {
          bullet.classList.remove("prev");
        }
      });
      bullets[index]?.classList.add("active");
    };

    function autoplay(swiper: Swiper) {
      if (autoplayDisabled) return;
      gsap.killTweensOf(element);
      gsap.fromTo(
        element,
        {
          "--p": 0,
        },
        {
          "--p": 100,
          ease: "none",
          duration: AUTOPLAY_DURATION,
          onComplete: () => {
            swiper.slideNext();
          },
        }
      );
    }

    const mainInstance = new Swiper(mainContainer, {
      speed: 600,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      loop: true,
      modules: [Controller, EffectFade],
      init: false,
      on: {
        init: (swiper) => {
          setActiveBullet(swiper.realIndex);
          autoplay(swiper);
        },
        slideChange: (swiper) => {
          setActiveBullet(swiper.realIndex);
          autoplay(swiper);
        },
      },
    });

    const bgInstance = new Swiper(bgContainer, {
      speed: 600,
      effect: "fade",
      fadeEffect: {
        crossFade: false,
      },
      loop: true,
      modules: [Controller, EffectFade],
    });

    mainInstance.init();

    mainInstance.controller.control = bgInstance;
    bgInstance.controller.control = mainInstance;

    nextArrow?.addEventListener("click", (event) => {
      event.preventDefault();
      mainInstance?.slideNext();
    });
    prevArrow?.addEventListener("click", (event) => {
      event.preventDefault();
      mainInstance?.slidePrev();
    });

    bullets.forEach((bullet, bulletIndex) => {
      bullet.addEventListener("click", (event) => {
        event.preventDefault();
        mainInstance.slideToLoop(bulletIndex);
      });
    });
  });
}
