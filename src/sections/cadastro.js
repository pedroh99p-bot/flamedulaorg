import { renderMiniAppsShell } from "../components/miniApps.js";

export function renderCadastro() {
  return `
    <section class="section section-elevated" id="cadastro">
      <div class="container">
        <div class="section-heading section-heading-centered">
          <span class="eyebrow">Mini app de cadastro</span>
          <h2>Comece pelo caminho certo: doador ou paciente.</h2>
          <p>
            O hub abaixo guia o cadastro em etapas, com consentimentos claros, resumo antes do envio e uma experiência simples para doadores, pacientes e responsáveis.
          </p>
        </div>
        ${renderMiniAppsShell()}
      </div>
    </section>
  `;
}
