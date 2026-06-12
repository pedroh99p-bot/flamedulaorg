function formatDate(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}

function actionSlide(item, index) {
  const opensDonorFlow = item.cta_url === "#cadastro";

  return `
    <article
      class="editorial-slide action-editorial-slide ${index === 0 ? "is-active" : ""}"
      data-editorial-slide
      aria-hidden="${index === 0 ? "false" : "true"}"
      style="--slide-image: url('${item.image_url}')"
    >
      <div class="action-editorial-media" aria-hidden="true"></div>
      <div class="action-editorial-content">
        <div class="action-editorial-kicker">
          <span>${item.category}</span>
          <strong>${formatDate(item.date)}</strong>
        </div>
        <h3>${item.title}</h3>
        <p>${item.excerpt}</p>
        <div class="action-editorial-meta">
          <i data-lucide="map-pin"></i>
          <span>${item.location}</span>
        </div>
        <a class="button button-light" href="${item.cta_url}" ${opensDonorFlow ? 'data-open-flow="donor"' : ""}>${item.cta_label}</a>
      </div>
    </article>
  `;
}

export function renderAcoes(actions) {
  return `
    <section class="section section-grid" id="acoes">
      <div class="container">
        <div class="section-heading section-heading-centered">
          <span class="eyebrow">Ações da FlaMedula</span>
          <h2>Campanhas e encontros que colocam a rede em movimento.</h2>
          <p>Registros de campanhas, encontros e mobilizações que aproximam pessoas da causa.</p>
        </div>
        <div
          class="action-editorial"
          data-editorial-carousel
          data-editorial-autoplay="7000"
          aria-label="Ações da FlaMedula"
        >
          <div class="editorial-slides">
            ${actions.map(actionSlide).join("")}
          </div>

          <div class="editorial-controls action-editorial-controls">
            <button class="editorial-arrow" type="button" data-editorial-prev aria-label="Ação anterior">
              <i data-lucide="arrow-left"></i>
            </button>
            <div class="editorial-dots" role="tablist" aria-label="Selecionar ação">
              ${actions
                .map(
                  (item, index) => `
                    <button
                      class="editorial-dot ${index === 0 ? "is-active" : ""}"
                      type="button"
                      data-editorial-dot="${index}"
                      aria-label="Mostrar ${item.title}"
                      aria-selected="${index === 0 ? "true" : "false"}"
                    ></button>
                  `
                )
                .join("")}
            </div>
            <button class="editorial-arrow" type="button" data-editorial-next aria-label="Próxima ação">
              <i data-lucide="arrow-right"></i>
            </button>
          </div>

          <div class="editorial-progress" aria-hidden="true">
            <span data-editorial-progress></span>
          </div>
        </div>
      </div>
    </section>
  `;
}
