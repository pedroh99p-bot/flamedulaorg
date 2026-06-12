export function initMobileMenu() {
  const button = document.querySelector("#mobile-menu-toggle");
  const menu = document.querySelector("#mobile-menu");
  const menuIcon = document.querySelector(".menu-icon-open");
  const closeIcon = document.querySelector(".menu-icon-close");
  const links = menu?.querySelectorAll("a") ?? [];

  if (!button || !menu || !menuIcon || !closeIcon) {
    return;
  }

  const sync = (open) => {
    menu.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
    menuIcon.classList.toggle("is-hidden", open);
    closeIcon.classList.toggle("is-hidden", !open);
  };

  sync(false);

  button.addEventListener("click", () => {
    sync(menu.hidden);
  });

  links.forEach((link) => {
    link.addEventListener("click", () => sync(false));
  });
}
