import { renderTransparency } from "../components/transparency.js";

export function renderTransparencia(data) {
  return `
    <section class="section section-grid" id="transparencia">
      <div class="container">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Transparencia institucional</span>
            <h2>Dados ajudam a transformar intencao em mobilizacao organizada.</h2>
          </div>
          <p>
            O bloco abaixo nasce como fallback local, mas ja esta pronto para futura alimentacao por painel ADM e integracao segura com Supabase.
          </p>
        </div>
        ${renderTransparency(data)}
      </div>
    </section>
  `;
}
