export function renderHeartbeatDivider(label = "FlaMedula") {
  return `
    <div class="heartbeat-divider" aria-hidden="true" data-reveal>
      <span class="heartbeat-line"></span>
      <span class="heartbeat-mark" aria-label="${label}">
        <i data-lucide="heart"></i>
      </span>
      <span class="heartbeat-line"></span>
    </div>
  `;
}
