export function initMotionSystem() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = [
    ...document.querySelectorAll(
      ".section, .roller, .decision-card, .flip-card, .metric-card, .timeline-item, .team-card, .ambassador-card, .testimonial-card, .faq-item, .support-card, .redome-card"
    )
  ];

  targets.forEach((target) => target.classList.add("reveal-item"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12
    }
  );

  targets.forEach((target) => observer.observe(target));

  window.addEventListener("flamedula:landing-ready", () => {
    targets.forEach((target) => {
      const rect = target.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        target.classList.add("is-revealed");
      }
    });
  });
}
