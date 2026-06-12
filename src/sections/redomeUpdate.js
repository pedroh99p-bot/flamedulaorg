export function renderRedomeUpdate(redomeConfig) {
  return `
    <section class="section section-tight" id="atualizar-redome">
      <div class="container">
        <article class="redome-card">
          <div class="redome-logo-panel">
            <img src="${redomeConfig.logo_url}" alt="Logo REDOME" loading="lazy" />
          </div>
          <div class="redome-copy">
            <span class="eyebrow eyebrow-warm">Atualização REDOME</span>
            <h2>Já é cadastrado no REDOME?</h2>
            <strong class="redome-emphasis">Atualizar seus dados pode ser tão importante quanto se cadastrar.</strong>
            <p>
              Telefone, e-mail, cidade e endereço atualizados ajudam os canais oficiais a encontrar você quando surgir uma possível compatibilidade.
            </p>
            <ul class="bullet-list bullet-list-warm">
              <li>Telefone atualizado evita perda de contato.</li>
              <li>Cidade e estado corretos ajudam na localização.</li>
              <li>E-mail ativo facilita novas orientações.</li>
            </ul>
            <div class="section-actions">
              <a class="button button-warm" href="${redomeConfig.url}" target="_blank" rel="noreferrer">
                ${redomeConfig.cta_label}
              </a>
            </div>
            <small>${redomeConfig.disclaimer}</small>
          </div>
        </article>
      </div>
    </section>
  `;
}
