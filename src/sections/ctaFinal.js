export function renderCtaFinal(redomeConfig) {
  return `
    <section class="section section-dark cta-final" id="cta-final">
      <div class="container cta-final-shell">
        <span class="eyebrow eyebrow-light">Encerramento com conversao</span>
        <h2>Informacao vira cadastro. Cadastro vira possibilidade. Possibilidade pode virar vida.</h2>
        <div class="section-actions section-actions-centered">
          <a class="button button-brand button-large" href="#cadastro" data-miniapp-target="doador">
            Quero me cadastrar
          </a>
          <a class="button button-patient button-large" href="#cadastro" data-miniapp-target="paciente">
            Cadastrar paciente
          </a>
        </div>
        <a class="text-link-light" href="${redomeConfig.url}" target="_blank" rel="noreferrer">
          Atualizar REDOME
        </a>
      </div>
    </section>
  `;
}
