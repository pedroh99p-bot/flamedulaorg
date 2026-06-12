function ambassadorCard(item) {
  return `
    <article class="ambassador-card">
      <div class="ambassador-badge" style="background-image:url('${item.image_url}')">
        <i data-lucide="star"></i>
      </div>
      <div>
        <h3>${item.name}</h3>
        <strong>${item.role}</strong>
        <p>${item.description}</p>
      </div>
    </article>
  `;
}

export function renderEmbaixadores(ambassadors) {
  return `
    <section class="section" id="embaixadores">
      <div class="container">
        <div class="section-heading section-heading-centered">
          <span class="eyebrow">Embaixadores</span>
          <h2>Vozes que ampliam o alcance da causa.</h2>
          <p>Presença pública, legitimidade institucional e convocação para mais gente olhar para a doação com seriedade.</p>
        </div>
        <div class="ambassador-grid">
          ${ambassadors.map(ambassadorCard).join("")}
        </div>
      </div>
    </section>
  `;
}
