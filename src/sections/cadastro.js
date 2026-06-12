import { renderMiniAppsShell } from "../components/miniApps.js";

export function renderCadastro() {
  return `
    <section class="section section-elevated" id="cadastro">
      <div class="container">
        <div class="section-heading section-heading-centered">
          <span class="eyebrow">Mini app de cadastro</span>
          <h2>Comece pelo caminho certo: doador ou paciente.</h2>
          <p>
            O hub abaixo guia o cadastro em etapas, com consentimentos claros, resumo antes do envio e fallback seguro quando a integração real ainda não estiver ativa.
          </p>
        </div>
        ${renderMiniAppsShell()}
      </div>
    </section>
  `;
}
