export function renderCtaFinal(redomeConfig) {
  return `
    <section class="section section-dark cta-final" id="cta-final">
      <div class="container cta-final-shell">
        <span class="eyebrow eyebrow-light">Próximo passo</span>
        <h2>Informação vira cadastro. Cadastro vira possibilidade.</h2>
        <div class="section-actions section-actions-centered">
          <a class="button button-brand button-large" href="#cadastro" data-open-flow="donor">
            Entrar para a rede
          </a>
          <a class="button button-patient button-large" href="#cadastro" data-open-flow="patient">
            Enviar um caso para análise
          </a>
        </div>
        <a class="text-link-light" href="${redomeConfig.url}" target="_blank" rel="noreferrer">
          Atualizar REDOME
        </a>
      </div>
    </section>
  `;
}
