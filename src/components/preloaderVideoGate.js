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
        <div class="video-intro-scroll">
          <div class="video-intro-card">
            <div class="video-intro-stage">
              <span class="eyebrow eyebrow-light">Video inicial da rede</span>
              <h1>Dedeco explica: medula sem medo</h1>

              <div class="video-intro-player-shell">
                <div class="video-intro-player" data-player-shell>
            <video
              id="intro-video"
              playsinline
              muted
              preload="metadata"
              poster="${siteAssets.logoPrimary}"
              aria-label="Video introdutorio da FlaMedula"
            >
              <source src="${siteAssets.introVideo}" type="video/webm" />
            </video>
                  <button
                    class="video-overlay-play"
                    id="video-overlay-play"
                    type="button"
                    aria-label="Reproduzir video"
                  >
                    <i data-lucide="play" class="video-overlay-icon video-play-icon"></i>
                    <i data-lucide="pause" class="video-overlay-icon video-pause-icon is-hidden"></i>
                  </button>

                  <div class="video-controls" aria-label="Controles do video">
                    <button
                      class="video-control-button"
                      id="video-toggle-play"
                      type="button"
                      aria-label="Pausar video"
                    >
                      <i data-lucide="pause" class="video-play-icon"></i>
                      <i data-lucide="play" class="video-pause-icon is-hidden"></i>
                    </button>
                    <button
                      class="video-control-button"
                      id="video-toggle-mute"
                      type="button"
                      aria-label="Ativar som"
                    >
                      <i data-lucide="volume-x" class="video-muted-icon"></i>
                      <i data-lucide="volume-2" class="video-unmuted-icon is-hidden"></i>
                    </button>
                    <div class="video-progress-group">
                      <input
                        class="video-progress"
                        id="video-progress"
                        type="range"
                        min="0"
                        max="100"
                        value="0"
                        step="0.1"
                        aria-label="Progresso do video"
                      />
                      <div class="video-time-row">
                        <span id="video-current-time">0:00</span>
                        <span id="video-duration">0:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="video-intro-copy">
                <p>
                  Andre Matos, fundador da FlaMedula, mostra como informacao correta ajuda a reduzir o medo sobre doacao de medula.
                </p>
                <div class="intro-alert">
                  <strong>Alerta:</strong> medula ossea nao e medula espinhal. A coleta pode ocorrer por aferese ou por puncao da medula ossea, sempre com decisao medica.
                </div>
                <button class="button button-brand button-large intro-continue-button" id="btn-enter-site" type="button">
                  Continuar para a pagina
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
  const overlayPlayButton = document.querySelector("#video-overlay-play");
  const playButton = document.querySelector("#video-toggle-play");
  const muteButton = document.querySelector("#video-toggle-mute");
  const progress = document.querySelector("#video-progress");
  const currentTimeLabel = document.querySelector("#video-current-time");
  const durationLabel = document.querySelector("#video-duration");

  if (
    !gate ||
    !preloader ||
    !intro ||
    !button ||
    !main ||
    !video ||
    !overlayPlayButton ||
    !playButton ||
    !muteButton ||
    !progress ||
    !currentTimeLabel ||
    !durationLabel
  ) {
    return;
  }

  document.body.classList.add("app-locked");
  document.body.style.overflow = "hidden";
  video.controls = false;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const preloaderDelay = prefersReducedMotion ? 800 : 2200;
  const fadeDuration = prefersReducedMotion ? 80 : 420;

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  function syncPlayUi() {
    const paused = video.paused;

    document.querySelectorAll(".video-play-icon").forEach((icon) => {
      icon.classList.toggle("is-hidden", !paused);
    });

    document.querySelectorAll(".video-pause-icon").forEach((icon) => {
      icon.classList.toggle("is-hidden", paused);
    });

    overlayPlayButton.classList.toggle("is-visible", paused);
    playButton.setAttribute("aria-label", paused ? "Reproduzir video" : "Pausar video");
    overlayPlayButton.setAttribute("aria-label", paused ? "Reproduzir video" : "Pausar video");
  }

  function syncMuteUi() {
    const muted = video.muted;

    document.querySelector(".video-muted-icon")?.classList.toggle("is-hidden", !muted);
    document.querySelector(".video-unmuted-icon")?.classList.toggle("is-hidden", muted);
    muteButton.setAttribute("aria-label", muted ? "Ativar som" : "Desativar som");
  }

  function syncProgressUi() {
    const duration = video.duration || 0;
    const currentTime = video.currentTime || 0;
    const percent = duration > 0 ? (currentTime / duration) * 100 : 0;

    progress.value = String(percent);
    progress.style.setProperty("--video-progress", `${percent}%`);
    currentTimeLabel.textContent = formatTime(currentTime);
    durationLabel.textContent = formatTime(duration);
  }

  async function togglePlayback(forcePlay) {
    const shouldPlay = forcePlay ?? video.paused;

    try {
      if (shouldPlay) {
        await video.play();
      } else {
        video.pause();
      }
    } catch (error) {
      console.info("Autoplay inicial do video nao foi permitido. O usuario pode iniciar manualmente.");
    } finally {
      syncPlayUi();
    }
  }

  window.setTimeout(() => {
    preloader.classList.add("is-fading");
    window.setTimeout(() => {
      preloader.classList.add("is-hidden");
    }, fadeDuration);
    intro.hidden = false;
    requestAnimationFrame(() => {
      intro.classList.add("is-visible");
      togglePlayback(true);
    });
  }, preloaderDelay);

  overlayPlayButton.addEventListener("click", () => togglePlayback());
  playButton.addEventListener("click", () => togglePlayback());

  muteButton.addEventListener("click", () => {
    video.muted = !video.muted;
    syncMuteUi();
  });

  progress.addEventListener("input", () => {
    const duration = video.duration || 0;
    if (duration > 0) {
      video.currentTime = (Number.parseFloat(progress.value) / 100) * duration;
      syncProgressUi();
    }
  });

  video.addEventListener("loadedmetadata", syncProgressUi);
  video.addEventListener("timeupdate", syncProgressUi);
  video.addEventListener("play", syncPlayUi);
  video.addEventListener("pause", syncPlayUi);
  video.addEventListener("volumechange", syncMuteUi);
  video.addEventListener("ended", () => {
    video.pause();
    syncPlayUi();
  });

  syncPlayUi();
  syncMuteUi();
  syncProgressUi();

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
