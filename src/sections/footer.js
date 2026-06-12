export function renderFooter(siteAssets, footerMeta) {
  return `
    <footer class="site-footer">
      <div class="container footer-shell">
        <img class="footer-logo" src="${siteAssets.logoPrimary}" alt="Logo FlaMedula" />
        <p>${footerMeta.legal}</p>
        <div class="footer-badges">
          ${footerMeta.badges.map((badge) => `<span>${badge}</span>`).join("")}
        </div>
        <small>© 2026 FlaMedula. Todos os direitos reservados.</small>
      </div>
    </footer>
  `;
}
