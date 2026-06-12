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
            Os números abaixo são demonstrativos e já preparam a futura integração com painel ADM e Supabase.
          </p>
        </div>
        ${renderTransparency(data)}
      </div>
    </section>
  `;
}
