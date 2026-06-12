import { renderFlipCards } from "../components/flipCards.js";

export function renderMedulaSemMedo(cards) {
  return `
    <section class="section" id="medula-sem-medo">
      <div class="container section-stack">
        <div class="section-heading section-heading-centered">
          <span class="eyebrow">Educacao e consciencia</span>
          <h2>Medula sem medo.</h2>
          <p>
            Muita gente nao se cadastra porque imagina algo pior do que realmente e. Informacao correta transforma medo em decisao consciente.
          </p>
        </div>
        ${renderFlipCards(cards)}
        <div class="section-actions section-actions-centered">
          <a class="button button-brand" href="#cadastro" data-open-flow="donor">Perdi o medo, quero ajudar</a>
          <a class="button button-patient" href="#cadastro" data-open-flow="patient">Preciso orientar um caso</a>
        </div>
      </div>
    </section>
  `;
}
