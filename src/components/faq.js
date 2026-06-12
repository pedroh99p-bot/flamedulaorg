export function renderFaq(items) {
  return `
    <div class="faq-list">
      ${items
        .map(
          (item, index) => `
            <article class="faq-item">
              <button
                class="faq-trigger"
                type="button"
                aria-expanded="false"
                aria-controls="faq-panel-${index}"
                id="faq-trigger-${index}"
              >
                <span>${item.question}</span>
                <i data-lucide="chevron-down"></i>
              </button>
              <div class="faq-panel" id="faq-panel-${index}" role="region" aria-labelledby="faq-trigger-${index}" hidden>
                <p>${item.answer}</p>
              </div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

export function initFaq() {
  document.querySelectorAll(".faq-trigger").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.getAttribute("aria-controls")}`);
      const expanded = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!expanded));
      button.classList.toggle("is-open", !expanded);
      if (panel) {
        panel.hidden = expanded;
      }
    });
  });
}
