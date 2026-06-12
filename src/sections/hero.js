function heroSlide(item, index) {
  const opensFlow =
    item.cta_url === "#cadastro"
      ? item.category === "acolhimento"
        ? "patient"
        : "donor"
      : "";

  return `
    <article
      class="editorial-slide hero-editorial-slide ${index === 0 ? "is-active" : ""}"
      data-editorial-slide
      aria-hidden="${index === 0 ? "false" : "true"}"
      style="--slide-image: url('${item.image_url}')"
    >
      <div class="hero-editorial-backdrop" aria-hidden="true"></div>
      <div class="hero-editorial-content">
        <span class="hero-chip">${item.tag_emoji} ${item.category}</span>
        <h2>${item.title}</h2>
        <p>${item.excerpt}</p>
        <a class="button button-light" href="${item.cta_url}" ${opensFlow ? `data-open-flow="${opensFlow}"` : ""}>${item.cta_label}</a>
      </div>
    </article>
  `;
}

export function renderHero(heroNewsItems) {
  return `
    <section class="hero-section editorial-hero-section" id="inicio">
      <div
        class="hero-editorial"
        data-editorial-carousel
        data-editorial-autoplay="6500"
        aria-label="Novidades da FlaMedula"
      >
        <div class="editorial-slides">
          ${heroNewsItems.map(heroSlide).join("")}
        </div>

        <div class="editorial-controls hero-editorial-controls">
          <button class="editorial-arrow" type="button" data-editorial-prev aria-label="Novidade anterior">
            <i data-lucide="arrow-left"></i>
          </button>
          <div class="editorial-dots" role="tablist" aria-label="Selecionar novidade">
            ${heroNewsItems
              .map(
                (item, index) => `
                  <button
                    class="editorial-dot ${index === 0 ? "is-active" : ""}"
                    type="button"
                    data-editorial-dot="${index}"
                    aria-label="Mostrar ${item.category}"
                    aria-selected="${index === 0 ? "true" : "false"}"
                  ></button>
                `
              )
              .join("")}
          </div>
          <button class="editorial-arrow" type="button" data-editorial-next aria-label="Proxima novidade">
            <i data-lucide="arrow-right"></i>
          </button>
        </div>

        <div class="editorial-progress" aria-hidden="true">
          <span data-editorial-progress></span>
        </div>
      </div>
    </section>
  `;
}
