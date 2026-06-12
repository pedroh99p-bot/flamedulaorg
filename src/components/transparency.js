function metricCard(icon, label, value, caption) {
  return `
    <article class="metric-card">
      <span class="metric-icon"><i data-lucide="${icon}"></i></span>
      <strong class="metric-value count-up" data-target="${value}">0</strong>
      <h3>${label}</h3>
      <p>${caption}</p>
    </article>
  `;
}

export function renderTransparency(data) {
  const growth = data.crescimento_semanal;
  const progressPercent = Math.round((data.progresso_mensal / data.meta_mensal) * 100);

  return `
    <div class="transparency-stack" id="metrics-container">
      <div class="metrics-grid">
        ${metricCard("droplets", "Doadores cadastrados", data.doadores_cadastrados, "Pessoas adicionadas à base de interesse da rede.")}
        ${metricCard(
          "dna",
          "Possíveis doadores de medula",
          data.possiveis_doadores_medula,
          "Interessados que pediram orientação específica sobre medula."
        )}
        ${metricCard(
          "refresh-cw",
          "Já cadastrados no REDOME",
          data.ja_cadastrados_redome,
          "Pessoas lembradas sobre a importância de manter dados atualizados."
        )}
        ${metricCard("folder-heart", "Casos recebidos", data.casos_recebidos, "Casos enviados para leitura inicial da equipe.")}
      </div>

      <article class="transparency-highlight">
        <div class="transparency-copy">
          <span class="eyebrow">Transparência da rede</span>
          <h3>Meta do mês: ampliar a base acionável da rede</h3>
          <p>
            Cada novo cadastro ajuda a FlaMedula a entender onde existem pessoas disponíveis para orientar, mobilizar e fortalecer campanhas.
          </p>
          <div class="progress-header">
            <strong><span class="count-up" data-target="${progressPercent}">0</span>% da meta mensal</strong>
            <span>${data.progresso_mensal} de ${data.meta_mensal} cadastros mapeados</span>
          </div>
          <div class="progress-bar" aria-hidden="true">
            <span class="progress-fill" data-width="${progressPercent}%"></span>
          </div>
          <small>Última atualização: ${data.last_updated} · ${data.source_label}</small>
        </div>
        <div class="growth-panel" aria-label="Crescimento semanal">
          <strong>Crescimento semanal</strong>
          <div class="growth-bars">
            ${growth
              .map(
                (value, index) => `
                  <div class="growth-bar-item">
                    <span class="growth-bar" style="--growth-height:${Math.max(value, 18)}%"></span>
                    <small>S${index + 1}</small>
                    <span>${value}</span>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      </article>
    </div>
  `;
}

export function initTransparency() {
  const container = document.querySelector("#metrics-container");

  if (!container) {
    return;
  }

  const animateNumber = (element, end) => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      element.textContent = String(end);
      return;
    }

    let startTime;
    const duration = 1400;

    const frame = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      element.textContent = String(Math.floor(progress * end));

      if (progress < 1) {
        window.requestAnimationFrame(frame);
      }
    };

    window.requestAnimationFrame(frame);
  };

  const observer = new IntersectionObserver(
    (entries, entryObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.querySelectorAll(".count-up").forEach((element) => {
          animateNumber(element, Number.parseInt(element.dataset.target ?? "0", 10));
        });

        const progressFill = entry.target.querySelector(".progress-fill");
        if (progressFill) {
          progressFill.style.width = progressFill.dataset.width ?? "0%";
        }

        entryObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(container);
}
