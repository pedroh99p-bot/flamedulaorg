import { renderCarousel } from "../components/carousel.js";

function heroCard(item) {
  return `
    <article class="hero-card ${item.featured ? "hero-card-featured" : ""}">
      <div class="hero-card-media" style="background-image:url('${item.image_url}')"></div>
      <div class="hero-card-body">
        <span class="hero-chip">${item.tag_emoji} ${item.category}</span>
        <h3>${item.title}</h3>
        <p>${item.excerpt}</p>
        <a class="button button-light" href="${item.cta_url}">${item.cta_label}</a>
      </div>
    </article>
  `;
}

export function renderHero(heroNewsItems) {
  return `
    <section class="section hero-section" id="inicio">
      <div class="container">
        <div class="section-heading section-heading-wide">
          <div>
            <span class="eyebrow">Hero de novidades · CMS-ready</span>
            <h2>A rede FlaMedula precisa informar, acolher e converter com mais clareza.</h2>
          </div>
          <p>
            O hero agora nasce pronto para receber cards editaveis, com schema local de fallback e espaco para futura alimentacao por painel ADM.
          </p>
        </div>
        ${renderCarousel({
          id: "hero-carousel",
          ariaLabel: "Novidades da FlaMedula",
          items: heroNewsItems.map(heroCard).join("")
        })}
      </div>
    </section>
  `;
}
