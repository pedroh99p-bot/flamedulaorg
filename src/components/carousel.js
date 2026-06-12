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
