import { renderVideoPlayer } from "../components/videoPlayer.js";

export function renderVideoInformativo(siteAssets) {
  return `
    <section class="section section-elevated" id="video-informativo">
      <div class="container">
        <div class="section-heading section-heading-centered">
          <span class="eyebrow">Tira-dúvidas em vídeo</span>
          <h2>Antes de se cadastrar, entenda o que realmente acontece.</h2>
          <p>Um bloco curto para reduzir medo, separar mito de informação correta e direcionar o próximo passo.</p>
        </div>
      </div>
      <div class="container split-layout split-layout-video">
        <div class="video-info-shell">
          ${renderVideoPlayer({
            id: "informative-video",
            src: siteAssets.informativeVideo,
            type: "video/mp4",
            poster: siteAssets.logoPrimary,
            label: "Vídeo informativo sobre doação de medula",
            autoplay: false,
            muted: true,
            className: "informative-video-player"
          })}
        </div>
        <div class="section-copy">
          <span class="eyebrow">Vídeo informativo</span>
          <h2>Entenda a doação sem medo.</h2>
          <p>
            A coleta pode acontecer de formas diferentes. Em alguns casos, pode ser por aférese pelo sangue periférico. Em outros, por punção da medula óssea. A definição é conduzida pela equipe médica.
          </p>
          <ul class="bullet-list">
            <li>Medula óssea não é medula espinhal.</li>
            <li>O cadastro oficial segue nos hemocentros e canais de saúde.</li>
            <li>Informação certa reduz medo e apoia uma decisão consciente.</li>
          </ul>
          <div class="section-actions">
            <a class="button button-brand" href="#cadastro" data-open-flow="donor">Entendi e quero ajudar</a>
            <a class="button button-patient" href="#cadastro" data-open-flow="patient">Tenho um caso para orientar</a>
          </div>
        </div>
      </div>
    </section>
  `;
}
