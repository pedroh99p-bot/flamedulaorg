import { renderCarousel } from "../components/carousel.js";

function formatDate(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}

function actionCard(item) {
  return `
    <article class="action-card">
      <div class="action-card-media" style="background-image:url('${item.image_url}')">
        <span class="action-category">${item.category}</span>
      </div>
      <div class="action-card-body">
        <span class="action-meta">${formatDate(item.date)} · ${item.location}</span>
        <h3>${item.title}</h3>
        <p>${item.excerpt}</p>
        <a class="button button-ghost-inline" href="${item.cta_url}">${item.cta_label}</a>
      </div>
    </article>
  `;
}

export function renderAcoes(actions) {
  return `
    <section class="section section-grid" id="acoes">
      <div class="container">
        <div class="section-heading section-heading-centered">
          <span class="eyebrow">Acoes da FlaMedula</span>
          <h2>Campanhas, encontros e mobilizacoes que tiram a solidariedade do discurso.</h2>
          <p>Os cards ja estao em formato CMS-ready, com data, local, contexto e CTA por item.</p>
        </div>
        ${renderCarousel({
          id: "actions-carousel",
          ariaLabel: "Acoes da FlaMedula",
          items: actions.map(actionCard).join("")
        })}
      </div>
    </section>
  `;
}
