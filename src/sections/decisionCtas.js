export function renderDecisionCtas(redomeConfig) {
  return `
    <section class="section section-tight" id="decisao">
      <div class="container">
        <div class="decision-shell">
          <div class="section-heading section-heading-centered">
            <span class="eyebrow">CTA imediato</span>
            <h2>Escolha seu proximo passo.</h2>
            <p>A rede cresce quando cada pessoa entende exatamente como pode ajudar.</p>
          </div>
          <div class="decision-grid">
            <a class="decision-card decision-card-brand" href="#cadastro" data-miniapp-target="doador">
              <strong>Quero me cadastrar como doador</strong>
              <span>Fluxo guiado, com orientacao e consentimentos.</span>
            </a>
            <a class="decision-card decision-card-patient" href="#cadastro" data-miniapp-target="paciente">
              <strong>Quero cadastrar um paciente</strong>
              <span>Para leitura inicial e orientacao da equipe.</span>
            </a>
          </div>
          <a class="button button-ghost" href="${redomeConfig.url}" target="_blank" rel="noreferrer">
            Ja sou cadastrado no REDOME. Quero atualizar meus dados
          </a>
        </div>
      </div>
    </section>
  `;
}
