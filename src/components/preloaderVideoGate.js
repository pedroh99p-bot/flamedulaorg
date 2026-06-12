import { renderVideoPlayer } from "./videoPlayer.js";

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

      <div class="video-intro-view" id="video-intro-view" aria-label="Introdução em vídeo" hidden>
        <div class="video-intro-scroll">
          <div class="video-intro-card">
            <div class="video-intro-stage">
              <span class="eyebrow eyebrow-light">Vídeo inicial da rede</span>
              <h1>Dedeco explica: medula sem medo</h1>

              <div class="video-intro-player-shell">
                ${renderVideoPlayer({
                  id: "intro-video",
                  src: siteAssets.introVideo,
                  type: "video/webm",
                  poster: siteAssets.logoPrimary,
                  label: "Vídeo introdutório da FlaMedula",
                  autoplay: true,
                  muted: true,
                  className: "video-intro-player"
                })}
              </div>

              <div class="video-intro-copy">
                <p>
                  André Matos, fundador da FlaMedula, mostra como informação correta ajuda a reduzir o medo sobre doação de medula.
                </p>
                <div class="intro-alert">
                  <strong>Alerta:</strong> medula óssea não é medula espinhal. A coleta pode ocorrer por aférese ou por punção da medula óssea, sempre com decisão médica.
                </div>
                <button class="button button-brand button-large intro-continue-button" id="btn-enter-site" type="button">
                  Continuar para a página
                </button>
              </div>
            </div>
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

  if (
    !gate ||
    !preloader ||
    !intro ||
    !button ||
    !main ||
    !video
  ) {
    return;
  }

  document.body.classList.add("app-locked");
  document.body.style.overflow = "hidden";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const preloaderDelay = prefersReducedMotion ? 800 : 2200;
  const fadeDuration = prefersReducedMotion ? 80 : 420;

  window.setTimeout(() => {
    preloader.classList.add("is-fading");
    window.setTimeout(() => {
      preloader.classList.add("is-hidden");
    }, fadeDuration);
    intro.hidden = false;
    requestAnimationFrame(() => {
      intro.classList.add("is-visible");
      window.dispatchEvent(new CustomEvent("flamedula:video-autoplay", { detail: { id: "intro-video" } }));
    });
  }, preloaderDelay);

  button.addEventListener("click", () => {
    video.pause();
    intro.classList.remove("is-visible");
    gate.classList.add("is-leaving");

    window.setTimeout(() => {
      gate.remove();
      main.hidden = false;
      main.setAttribute("aria-hidden", "false");
      document.body.classList.remove("app-locked");
      document.body.style.overflow = "";
      window.scrollTo({ top: 0, behavior: "auto" });
      requestAnimationFrame(() => {
        main.classList.add("is-ready");
        window.dispatchEvent(new CustomEvent("flamedula:landing-ready"));
      });
    }, fadeDuration);
  });
}
