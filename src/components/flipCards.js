export function renderFlipCards(cards) {
  return `
    <div class="flip-grid">
      ${cards
        .slice(0, 4)
        .map(
          (card, index) => `
            <button
              class="flip-card"
              type="button"
              data-flip-card
              data-card-index="${index}"
              aria-pressed="false"
              aria-label="Virar card ${card.question}"
            >
              <span class="flip-card-inner">
                <span class="flip-card-face flip-card-front">
                  <span class="flip-card-badge">Toque para virar</span>
                  <strong>${card.question}</strong>
                </span>
                <span class="flip-card-face flip-card-back">
                  <span>${card.answer}</span>
                </span>
              </span>
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

export function initFlipCards() {
  document.querySelectorAll("[data-flip-card]").forEach((card) => {
    const toggle = () => {
      const isPressed = card.getAttribute("aria-pressed") === "true";
      card.setAttribute("aria-pressed", String(!isPressed));
      card.classList.toggle("is-flipped", !isPressed);
    };

    card.addEventListener("click", toggle);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    });
  });
}
