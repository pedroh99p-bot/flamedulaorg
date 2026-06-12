export function renderRoller(items, variant = "brand") {
  const repeated = [...items, ...items];

  return `
    <div class="roller roller-${variant}" aria-hidden="true">
      <div class="roller-track">
        ${repeated.map((item) => `<span>${item}</span>`).join("")}
      </div>
    </div>
  `;
}
