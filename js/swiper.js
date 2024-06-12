import Swiper from "https://unpkg.com/swiper@7/swiper-bundle.esm.browser.min.js";

/* Main Swiper */
export const swiper2 = new Swiper("#main-thumbs-slider", {
  spaceBetween: 20,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

export const swiper = new Swiper("#main-slider", {
  navigation: {
    nextEl: "#main-slider-next",
    prevEl: "#main-slider-prev",
  },
  thumbs: {
    swiper: swiper2,
  },
});

/* Lightbox */
export const lightboxThumbs = new Swiper("#lightbox-thumbs-slider", {
  spaceBetween: 20,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

export const lightboxSlider = new Swiper("#lightbox-main-slider", {
  navigation: {
    nextEl: "#lightbox-next",
    prevEl: "#lightbox-prev",
  },
  thumbs: {
    swiper: lightboxThumbs,
  },
});
