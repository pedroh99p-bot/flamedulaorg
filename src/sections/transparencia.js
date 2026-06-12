import { renderTransparency } from "../components/transparency.js";

export function renderTransparencia(data) {
  return `
    <section class="section section-grid" id="transparencia">
      <div class="container">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Transparência institucional</span>
            <h2>Dados ajudam a transformar intenção em mobilização.</h2>
          </div>
          <p>
            Os números ajudam a visualizar o alcance da rede e a importância de manter dados organizados.
          </p>
        </div>
        ${renderTransparency(data)}
      </div>
    </section>
  `;
}
