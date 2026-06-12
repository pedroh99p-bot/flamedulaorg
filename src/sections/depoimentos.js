function testimonialCard(item) {
  return `
    <article class="testimonial-card">
      <div class="testimonial-avatar" style="background-image:url('${item.avatar_url}')">
        <i data-lucide="quote"></i>
      </div>
      <div class="testimonial-body">
        <p>“${item.quote}”</p>
        <strong>${item.name}</strong>
        <span>${item.relation}</span>
      </div>
    </article>
  `;
}

export function renderDepoimentos(testimonials) {
  return `
    <section class="section section-elevated" id="depoimentos">
      <div class="container">
        <div class="section-heading section-heading-centered">
          <span class="eyebrow">Depoimentos</span>
          <h2>Histórias que mostram por que essa rede importa.</h2>
          <p>Relatos curtos, humanos e preparados para edição futura no painel ADM.</p>
        </div>
        <div class="testimonial-grid">
          ${testimonials.map(testimonialCard).join("")}
        </div>
      </div>
    </section>
  `;
}
