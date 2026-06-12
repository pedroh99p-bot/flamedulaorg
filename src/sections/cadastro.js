import { renderMiniAppsShell } from "../components/miniApps.js";

export function renderCadastro() {
  return `
    <section class="section section-elevated" id="cadastro">
      <div class="container">
        <div class="section-heading section-heading-centered">
          <span class="eyebrow">Mini apps de cadastro</span>
          <h2>Tres caminhos, um mesmo proposito: organizar a rede para mobilizar melhor.</h2>
          <p>
            Os fluxos abaixo deixam de ser formularios soltos e passam a operar como mini apps preparados para integrar dados reais no futuro.
          </p>
        </div>
        ${renderMiniAppsShell()}
      </div>
    </section>
  `;
}
