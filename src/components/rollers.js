export function renderRoller(items, variant = "brand", direction = "left") {
  const repeated = [...items, ...items, ...items, ...items];
  const safeDirection = direction === "right" ? "right" : "left";

  return `
    <div class="roller roller-${variant} roller-${safeDirection}" aria-hidden="true" data-reveal>
      <div class="roller-track">
        ${repeated.map((item) => `<span>${item}</span>`).join("")}
      </div>
    </div>
  `;
}
