import { renderCarousel } from "../components/carousel.js";

function teamCard(member) {
  return `
    <article class="team-card">
      <div class="avatar-frame" style="background-image:url('${member.image_url}')">
        <span><i data-lucide="user-round"></i></span>
      </div>
      <div class="team-card-body">
        <h3>${member.name}</h3>
        <strong>${member.role}</strong>
        <p>${member.description}</p>
      </div>
    </article>
  `;
}

export function renderEquipe(teamMembers) {
  return `
    <section class="section section-elevated" id="equipe">
      <div class="container">
        <div class="section-heading section-heading-centered">
          <span class="eyebrow">Equipe FlaMedula</span>
          <h2>Pessoas que sustentam acolhimento, organização e presença.</h2>
          <p>Equipe preparada para evoluir com conteúdo editável no painel ADM.</p>
        </div>
        ${renderCarousel({
          id: "team-carousel",
          ariaLabel: "Equipe FlaMedula",
          items: teamMembers.map(teamCard).join("")
        })}
      </div>
    </section>
  `;
}
