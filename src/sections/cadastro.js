import { renderMiniAppsShell } from "../components/miniApps.js";

export function renderCadastro() {
  return `
    <section class="section section-elevated" id="cadastro">
      <div class="container">
        <div class="section-heading section-heading-centered">
          <span class="eyebrow">Cadastro guiado</span>
          <h2>Comece pelo caminho certo: doador ou paciente.</h2>
          <p>
            Escolha como você quer participar e siga um cadastro simples, com consentimento claro e revisão antes do envio.
          </p>
        </div>
        ${renderMiniAppsShell()}
      </div>
    </section>
  `;
}
