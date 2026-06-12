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
            Dados organizados ajudam a entender o alcance da rede e a mobilizar com mais responsabilidade.
          </p>
        </div>
        ${renderTransparency(data)}
      </div>
    </section>
  `;
}
