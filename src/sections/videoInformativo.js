export function renderVideoInformativo(siteAssets) {
  return `
    <section class="section section-elevated" id="video-informativo">
      <div class="container split-layout split-layout-video">
        <div class="video-card">
          <video controls preload="metadata" poster="${siteAssets.logoPrimary}">
            <source src="${siteAssets.informativeVideo}" type="video/mp4" />
          </video>
        </div>
        <div class="section-copy">
          <span class="eyebrow">Video informativo</span>
          <h2>Entenda a doacao sem medo e sem atalhos de copy.</h2>
          <p>
            Em alguns casos, a coleta pode acontecer por aferese, pelo sangue periferico. Em outros, por puncao da medula ossea. A decisao e sempre conduzida pela equipe medica.
          </p>
          <ul class="bullet-list">
            <li>Medula ossea nao e medula espinhal.</li>
            <li>O cadastro oficial segue nos hemocentros e canais de saude.</li>
            <li>Informacao certa reduz medo e aumenta o cadastro consciente.</li>
          </ul>
          <a class="button button-dark" href="#decisao">Quero escolher meu proximo passo</a>
        </div>
      </div>
    </section>
  `;
}
