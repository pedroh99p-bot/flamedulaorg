export function renderNavbar(logoUrl) {
  return `
    <header class="site-header" data-header>
      <div class="container header-shell">
        <a class="brand-capsule" href="#inicio" aria-label="Voltar ao topo da FlaMedula">
          <img class="brand-logo" src="${logoUrl}" alt="Logo FlaMedula" />
        </a>

        <nav class="desktop-nav" aria-label="Navegação principal">
          <a href="#medula-sem-medo">Medula sem medo</a>
          <a href="#transparencia">Transparência</a>
          <a href="#acoes">Ações</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div class="header-actions">
          <a class="button button-brand button-compact" href="#cadastro" data-open-flow="donor">
            <span aria-hidden="true">🩸</span>
            <span>Sou doador</span>
          </a>
          <a class="button button-patient button-compact" href="#cadastro" data-open-flow="patient">
            <span aria-hidden="true">💙</span>
            <span>Paciente</span>
          </a>

          <button
            class="icon-button theme-toggle-button"
            type="button"
            id="theme-toggle"
            aria-label="Alternar modo escuro"
          >
            <i data-lucide="moon" class="theme-icon theme-icon-moon"></i>
            <i data-lucide="sun" class="theme-icon theme-icon-sun is-hidden"></i>
          </button>

          <button
            class="icon-button mobile-menu-toggle"
            type="button"
            id="mobile-menu-toggle"
            aria-label="Abrir menu"
            aria-expanded="false"
            aria-controls="mobile-menu"
          >
            <i data-lucide="menu" class="menu-icon-open"></i>
            <i data-lucide="x" class="menu-icon-close is-hidden"></i>
          </button>
        </div>
      </div>

      <div class="mobile-menu" id="mobile-menu" hidden>
        <nav class="mobile-menu-nav" aria-label="Menu mobile">
          <a href="#medula-sem-medo">Medula sem medo</a>
          <a href="#transparencia">Transparência</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#quem-somos">Quem somos</a>
          <a href="#acoes">Ações</a>
          <a href="#cadastro" data-open-flow="donor">Quero me cadastrar</a>
          <a href="#atualizar-redome">Atualizar REDOME</a>
        </nav>
      </div>
    </header>
  `;
}
