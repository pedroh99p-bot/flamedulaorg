function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function renderVideoPlayer({
  id,
  src,
  type = "video/mp4",
  poster = "",
  label = "Video",
  autoplay = false,
  muted = true,
  className = ""
}) {
  return `
    <div
      class="custom-video-player ${className}"
      data-video-player
      data-video-autoplay="${autoplay ? "true" : "false"}"
    >
      <video
        id="${id}"
        playsinline
        ${muted ? "muted" : ""}
        preload="metadata"
        ${poster ? `poster="${poster}"` : ""}
        aria-label="${label}"
      >
        <source src="${src}" type="${type}" />
      </video>

      <button class="video-overlay-play is-visible" type="button" data-video-overlay aria-label="Reproduzir video">
        <i data-lucide="play" class="video-overlay-icon video-play-icon"></i>
        <i data-lucide="pause" class="video-overlay-icon video-pause-icon is-hidden"></i>
      </button>

      <div class="video-controls" aria-label="Controles do video">
        <button class="video-control-button" type="button" data-video-play aria-label="Reproduzir video">
          <i data-lucide="pause" class="video-pause-icon is-hidden"></i>
          <i data-lucide="play" class="video-play-icon"></i>
        </button>
        <button class="video-control-button" type="button" data-video-mute aria-label="${muted ? "Ativar som" : "Desativar som"}">
          <i data-lucide="volume-x" class="video-muted-icon${muted ? "" : " is-hidden"}"></i>
          <i data-lucide="volume-2" class="video-unmuted-icon${muted ? " is-hidden" : ""}"></i>
        </button>
        <div class="video-progress-group">
          <input
            class="video-progress"
            type="range"
            min="0"
            max="100"
            value="0"
            step="0.1"
            aria-label="Progresso do video"
            data-video-progress
          />
          <div class="video-time-row">
            <span data-video-current>0:00</span>
            <span data-video-duration>0:00</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initVideoPlayers() {
  const players = document.querySelectorAll("[data-video-player]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  players.forEach((player) => {
    const video = player.querySelector("video");
    const overlayButton = player.querySelector("[data-video-overlay]");
    const playButton = player.querySelector("[data-video-play]");
    const muteButton = player.querySelector("[data-video-mute]");
    const progress = player.querySelector("[data-video-progress]");
    const currentTimeLabel = player.querySelector("[data-video-current]");
    const durationLabel = player.querySelector("[data-video-duration]");

    if (!video || !overlayButton || !playButton || !muteButton || !progress || !currentTimeLabel || !durationLabel) {
      return;
    }

    video.controls = false;

    const syncPlayUi = () => {
      const paused = video.paused;

      player.querySelectorAll(".video-play-icon").forEach((icon) => {
        icon.classList.toggle("is-hidden", !paused);
      });

      player.querySelectorAll(".video-pause-icon").forEach((icon) => {
        icon.classList.toggle("is-hidden", paused);
      });

      overlayButton.classList.toggle("is-visible", paused);
      player.classList.toggle("is-paused", paused);
      playButton.setAttribute("aria-label", paused ? "Reproduzir video" : "Pausar video");
      overlayButton.setAttribute("aria-label", paused ? "Reproduzir video" : "Pausar video");
    };

    const syncMuteUi = () => {
      const muted = video.muted;

      player.querySelector(".video-muted-icon")?.classList.toggle("is-hidden", !muted);
      player.querySelector(".video-unmuted-icon")?.classList.toggle("is-hidden", muted);
      muteButton.setAttribute("aria-label", muted ? "Ativar som" : "Desativar som");
    };

    const syncProgressUi = () => {
      const duration = video.duration || 0;
      const currentTime = video.currentTime || 0;
      const percent = duration > 0 ? (currentTime / duration) * 100 : 0;

      progress.value = String(percent);
      progress.style.setProperty("--video-progress", `${percent}%`);
      currentTimeLabel.textContent = formatTime(currentTime);
      durationLabel.textContent = formatTime(duration);
    };

    const togglePlayback = async (forcePlay) => {
      const shouldPlay = forcePlay ?? video.paused;

      try {
        if (shouldPlay) {
          await video.play();
        } else {
          video.pause();
        }
      } catch (error) {
        console.info("Autoplay do vídeo não foi permitido. O usuário pode iniciar manualmente.");
      } finally {
        syncPlayUi();
      }
    };

    overlayButton.addEventListener("click", () => togglePlayback());
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
    video.addEventListener("ended", syncPlayUi);

    window.addEventListener("flamedula:video-autoplay", (event) => {
      if (!prefersReducedMotion && event.detail?.id === video.id) {
        togglePlayback(true);
      }
    });

    if (player.dataset.videoAutoplay === "true" && !prefersReducedMotion && !video.closest("[hidden]")) {
      togglePlayback(true);
    }

    syncPlayUi();
    syncMuteUi();
    syncProgressUi();
  });
}
