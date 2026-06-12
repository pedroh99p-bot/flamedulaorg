export function renderRoller(items, variant = "brand") {
  const repeated = [...items, ...items, ...items, ...items];

  return `
    <div class="roller roller-${variant}" aria-hidden="true" data-reveal>
      <div class="roller-track">
        ${repeated.map((item) => `<span>${item}</span>`).join("")}
      </div>
    </div>
  `;
}
