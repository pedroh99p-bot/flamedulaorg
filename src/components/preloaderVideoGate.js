export function renderPreloaderVideoGate(siteAssets) {
  return `
    <div class="flow-gate" id="flow-gate">
      <div class="preloader-view" id="preloader-view" aria-live="polite">
        <img class="gate-logo" src="${siteAssets.logoPrimary}" alt="Logo FlaMedula" />
        <p class="gate-label">Carregando a rede FlaMedula...</p>
        <div class="loading-rail" aria-hidden="true">
          <div class="loading-bar"></div>
        </div>
      </div>

      <div class="video-intro-view" id="video-intro-view" aria-label="Introducao em video" hidden>
        <div class="video-intro-card">
          <div class="video-intro-player">
            <video
              id="intro-video"
              playsinline
              muted
              controls
              preload="metadata"
              poster="${siteAssets.logoPrimary}"
            >
              <source src="${siteAssets.introVideo}" type="video/webm" />
            </video>
          </div>

          <div class="video-intro-copy">
            <span class="eyebrow">Video inicial da rede</span>
            <h1>Dedeco explica: medula sem medo</h1>
            <p>
              Andre Matos, fundador da FlaMedula, mostra como informacao correta ajuda a reduzir o medo sobre doacao de medula.
            </p>
            <div class="intro-alert">
              <strong>Alerta:</strong> medula ossea nao e medula espinhal. A coleta pode ocorrer por aferese ou por puncao da medula ossea, sempre com decisao medica.
            </div>
            <button class="button button-brand button-large" id="btn-enter-site" type="button">
              Continuar para a pagina
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initPreloaderVideoGate() {
  const gate = document.querySelector("#flow-gate");
  const preloader = document.querySelector("#preloader-view");
  const intro = document.querySelector("#video-intro-view");
  const button = document.querySelector("#btn-enter-site");
  const video = document.querySelector("#intro-video");
  const main = document.querySelector("#main-content");

  if (!gate || !preloader || !intro || !button || !main) {
    return;
  }

  document.body.classList.add("app-locked");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const preloaderDelay = prefersReducedMotion ? 800 : 2200;

  window.setTimeout(() => {
    preloader.classList.add("is-hidden");
    intro.hidden = false;
    requestAnimationFrame(() => intro.classList.add("is-visible"));
  }, preloaderDelay);

  button.addEventListener("click", () => {
    video?.pause();
    intro.classList.remove("is-visible");
    gate.classList.add("is-leaving");

    window.setTimeout(() => {
      gate.remove();
      main.hidden = false;
      main.setAttribute("aria-hidden", "false");
      document.body.classList.remove("app-locked");
      requestAnimationFrame(() => main.classList.add("is-ready"));
    }, prefersReducedMotion ? 80 : 420);
  });
}
