export function renderComoFunciona(steps) {
  return `
    <section class="section" id="como-funciona">
      <div class="container">
        <div class="section-heading section-heading-centered">
          <span class="eyebrow">Como funciona</span>
          <h2>A jornada que transforma intencao em acao concreta.</h2>
          <p>Sem atalhos: primeiro informacao, depois decisao, depois dados organizados e mobilizacao.</p>
        </div>
        <div class="timeline">
          ${steps
            .map(
              (step, index) => `
                <article class="timeline-item">
                  <span class="timeline-number">${index + 1}</span>
                  <div class="timeline-card">
                    <h3>${step.title}</h3>
                    <p>${step.description}</p>
                  </div>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}
