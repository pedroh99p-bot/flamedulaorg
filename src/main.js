import { createIcons, icons } from "lucide";

import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/sections.css";
import "./styles/responsive.css";

import {
  aboutContent,
  fearCards,
  footerMeta,
  journeySteps,
  miniAppOptions,
  redomeConfig,
  rollerItems,
  siteAssets
} from "./data/fallbackContent.js";
import {
  getActions,
  getAmbassadors,
  getFaqItems,
  getHeroNews,
  getTeamMembers,
  getTestimonials,
  getTransparencyData
} from "./services/contentService.js";
import { renderNavbar } from "./components/navbar.js";
import { initThemeToggle } from "./components/themeToggle.js";
import { initMobileMenu } from "./components/mobileMenu.js";
import { initPreloaderVideoGate, renderPreloaderVideoGate } from "./components/preloaderVideoGate.js";
import { initCarousels } from "./components/carousel.js";
import { initFlipCards } from "./components/flipCards.js";
import { initMiniApps } from "./components/miniApps.js";
import { initTransparency } from "./components/transparency.js";
import { initFaq, renderFaq } from "./components/faq.js";
import { renderRoller } from "./components/rollers.js";
import { renderAcoes } from "./sections/acoes.js";
import { renderApoioCta } from "./sections/apoioCta.js";
import { renderCadastro } from "./sections/cadastro.js";
import { renderComoFunciona } from "./sections/comoFunciona.js";
import { renderCtaFinal } from "./sections/ctaFinal.js";
import { renderDecisionCtas } from "./sections/decisionCtas.js";
import { renderDepoimentos } from "./sections/depoimentos.js";
import { renderEmbaixadores } from "./sections/embaixadores.js";
import { renderEquipe } from "./sections/equipe.js";
import { renderFooter } from "./sections/footer.js";
import { renderHero } from "./sections/hero.js";
import { renderMedulaSemMedo } from "./sections/medulaSemMedo.js";
import { renderQuemSomos } from "./sections/quemSomos.js";
import { renderRedomeUpdate } from "./sections/redomeUpdate.js";
import { renderTransparencia } from "./sections/transparencia.js";
import { renderVideoInformativo } from "./sections/videoInformativo.js";

async function renderApp() {
  const [heroNewsItems, actions, testimonials, transparencyData, teamMembers, ambassadors, faqItems] =
    await Promise.all([
      getHeroNews(),
      getActions(),
      getTestimonials(),
      getTransparencyData(),
      getTeamMembers(),
      getAmbassadors(),
      getFaqItems()
    ]);

  const app = document.querySelector("#app");

  app.innerHTML = `
    ${renderPreloaderVideoGate(siteAssets)}

    <div id="main-content" class="main-content" hidden aria-hidden="true">
      ${renderNavbar(siteAssets.logoPrimary)}
      <main>
        ${renderHero(heroNewsItems)}
        ${renderDecisionCtas(redomeConfig)}
        ${renderRoller(rollerItems.authority, "brand")}
        ${renderMedulaSemMedo(fearCards)}
        ${renderVideoInformativo(siteAssets)}
        ${renderRedomeUpdate(redomeConfig)}
        ${renderCadastro()}
        ${renderTransparencia(transparencyData)}
        ${renderComoFunciona(journeySteps)}
        ${renderQuemSomos(aboutContent)}
        ${renderEquipe(teamMembers)}
        ${renderEmbaixadores(ambassadors)}
        ${renderAcoes(actions)}
        ${renderApoioCta()}
        ${renderRoller(rollerItems.support, "dark")}
        ${renderDepoimentos(testimonials)}
        <section class="section" id="faq">
          <div class="container">
            <div class="section-heading section-heading-centered">
              <span class="eyebrow">Perguntas frequentes</span>
              <h2>Tudo o que voce precisa saber antes de dar o proximo passo.</h2>
              <p>As respostas abaixo preservam a copy medica responsavel e deixam claro o papel da FlaMedula.</p>
            </div>
            ${renderFaq(faqItems)}
          </div>
        </section>
        ${renderCtaFinal(redomeConfig)}
      </main>
      ${renderFooter(siteAssets, footerMeta)}
    </div>
  `;

  createIcons({ icons });
  initThemeToggle();
  initMobileMenu();
  initPreloaderVideoGate();
  initCarousels();
  initFlipCards();
  initMiniApps({ miniAppOptions, redomeConfig });
  initTransparency();
  initFaq();
}

renderApp().catch((error) => {
  console.error("Erro ao renderizar a landing FlaMedula:", error);
  const app = document.querySelector("#app");
  if (app) {
    app.innerHTML = `
      <main class="fallback-error">
        <h1>FlaMedula</h1>
        <p>Nao foi possivel carregar a pagina agora. Recarregue para tentar novamente.</p>
      </main>
    `;
  }
});
