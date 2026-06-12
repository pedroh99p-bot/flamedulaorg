export function renderCarousel({ id, ariaLabel, items }) {
  return `
    <div class="carousel" data-carousel id="${id}">
      <div class="carousel-actions">
        <button class="icon-button" type="button" data-carousel-prev aria-label="Voltar cards">
          <i data-lucide="arrow-left"></i>
        </button>
        <button class="icon-button" type="button" data-carousel-next aria-label="Avancar cards">
          <i data-lucide="arrow-right"></i>
        </button>
      </div>
      <div class="carousel-track" data-carousel-track aria-label="${ariaLabel}" tabindex="0">
        ${items}
      </div>
    </div>
  `;
}

export function initCarousels() {
  initTrackCarousels();
  initEditorialCarousels();
}

function initTrackCarousels() {
  const carousels = document.querySelectorAll("[data-carousel]");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const prev = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");

    if (!track || !prev || !next) {
      return;
    }

    const getStep = () => Math.max(track.clientWidth * 0.82, 320);

    prev.addEventListener("click", () => {
      track.scrollBy({ left: -getStep(), behavior: "smooth" });
    });

    next.addEventListener("click", () => {
      track.scrollBy({ left: getStep(), behavior: "smooth" });
    });
  });
}

function initEditorialCarousels() {
  const editorialCarousels = document.querySelectorAll("[data-editorial-carousel]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  editorialCarousels.forEach((carousel) => {
    const slides = [...carousel.querySelectorAll("[data-editorial-slide]")];
    const dots = [...carousel.querySelectorAll("[data-editorial-dot]")];
    const prev = carousel.querySelector("[data-editorial-prev]");
    const next = carousel.querySelector("[data-editorial-next]");
    const progress = carousel.querySelector("[data-editorial-progress]");
    const interval = Number.parseInt(carousel.dataset.editorialAutoplay ?? "6500", 10);

    if (!slides.length || !progress || !prev || !next) {
      return;
    }

    let activeIndex = 0;
    let rafId = null;
    let startTime = 0;
    let pausedElapsed = 0;
    let paused = false;

    const setProgress = (value) => {
      progress.style.transform = `scaleX(${Math.min(Math.max(value, 0), 1)})`;
    };

    const stop = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const showSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === activeIndex;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
      });
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === activeIndex;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", String(active));
      });
      startTime = performance.now();
      pausedElapsed = 0;
      setProgress(reduceMotion ? 1 : 0);
    };

    const tick = (timestamp) => {
      if (paused || reduceMotion) {
        return;
      }

      const elapsed = timestamp - startTime + pausedElapsed;
      const ratio = elapsed / interval;
      setProgress(ratio);

      if (ratio >= 1) {
        showSlide(activeIndex + 1);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    const start = () => {
      stop();
      if (!reduceMotion) {
        startTime = performance.now();
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const pause = () => {
      if (reduceMotion || paused) {
        return;
      }
      paused = true;
      pausedElapsed += performance.now() - startTime;
      stop();
    };

    const resume = () => {
      if (reduceMotion || !paused) {
        return;
      }
      paused = false;
      startTime = performance.now();
      rafId = window.requestAnimationFrame(tick);
    };

    prev.addEventListener("click", () => {
      showSlide(activeIndex - 1);
      start();
    });

    next.addEventListener("click", () => {
      showSlide(activeIndex + 1);
      start();
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        showSlide(Number.parseInt(dot.dataset.editorialDot ?? "0", 10));
        start();
      });
    });

    carousel.addEventListener("mouseenter", pause);
    carousel.addEventListener("mouseleave", resume);
    carousel.addEventListener("focusin", pause);
    carousel.addEventListener("focusout", resume);

    showSlide(0);
    start();
  });
}
