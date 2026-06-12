export function renderQuemSomos(aboutContent) {
  return `
    <section class="section section-dark" id="quem-somos">
      <div class="container who-we-are">
        <span class="eyebrow eyebrow-light">Quem somos</span>
        <h2>${aboutContent.title}</h2>
        ${aboutContent.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
        <blockquote>${aboutContent.quote}</blockquote>
      </div>
    </section>
  `;
}
