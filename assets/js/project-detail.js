const detailRoot = document.querySelector("[data-project-detail]");
const params = new URLSearchParams(window.location.search);
const currentProject = projects.find((project) => project.id === params.get("id"));

if (detailRoot && currentProject) {
  const heroVisual = currentProject.image
    ? `
      <button class="project-detail-hero-visual project-zoom-trigger" type="button" data-project-zoom aria-label="Agrandir le visuel ${currentProject.title}">
        <img src="${currentProject.image}" alt="">
      </button>
    `
    : "";
  const scoreSections = currentProject.score
    ? currentProject.score.map((section) => `
      <article class="score-card">
        <div class="score-content">
          <p class="eyebrow">${section.title}</p>
          <h2>${section.heading}</h2>
          ${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
        </div>
        ${(section.visualSlots ?? 3) > 0 ? `<div class="score-visual-grid" aria-label="Visuels ${section.title}">
          ${Array.from({ length: section.visualSlots ?? 3 }, (_, index) => `
            <${section.visuals?.[index] ? `button type="button" data-project-zoom aria-label="Agrandir : ${section.visuals[index].alt}"` : "div"} class="score-visual-slot${section.visuals?.[index] ? " score-visual-slot-filled project-zoom-trigger" : ""}">
              ${section.visuals?.[index]
                ? `<img class="${section.visuals[index].fit === "contain" ? "score-visual-image-contain" : ""}" src="${section.visuals[index].src}" alt="${section.visuals[index].alt}" loading="lazy" decoding="async">`
                : `<span>Visuel ${index + 1}</span>`}
            </${section.visuals?.[index] ? "button" : "div"}>
          `).join("")}
        </div>` : ""}
      </article>
    `).join("")
    : "";
  const projectCta = currentProject.link
    ? `
      <section class="project-cta-section">
        <div class="project-cta-content">
          <p class="eyebrow">Découvrir</p>
          <h2>Voir le projet en ligne</h2>
          <a class="btn btn-primary" href="${currentProject.link}" target="_blank" rel="noreferrer">Ouvrir le site</a>
        </div>
        ${currentProject.ctaImage ? `
          <a class="project-cta-mockup" href="${currentProject.link}" target="_blank" rel="noreferrer" aria-label="Ouvrir le site ${currentProject.title}">
            <img class="project-cta-image" src="${currentProject.ctaImage}" alt="Aperçu du site ${currentProject.title}">
          </a>
        ` : ""}
      </section>
    `
    : "";

  document.title = `${currentProject.title} | Elise Passicousset`;
  detailRoot.innerHTML = `
    <section class="project-detail-hero">
      <a class="back-link" href="projects.html">Retour aux projets</a>
      <div class="project-detail-hero-layout">
        <div class="project-detail-hero-copy">
          <h1>${currentProject.title}</h1>
          <p>${currentProject.description}</p>
        </div>
        ${heroVisual}
      </div>
    </section>

    <section class="section project-score-section">
      <div class="score-list">
        ${scoreSections || `
          <article class="score-card">
            <div class="score-content">
              <p class="eyebrow">Synthèse</p>
              <h2>${currentProject.objectives}</h2>
              <p>${currentProject.context}</p>
              <p>${currentProject.process}</p>
              <p>${currentProject.result}</p>
            </div>
          </article>
        `}
      </div>
    </section>

    ${projectCta}
  `;
} else if (detailRoot) {
  detailRoot.innerHTML = `
    <section class="page-hero">
      <p class="eyebrow">Projet introuvable</p>
      <h1>Ce projet n'est pas disponible</h1>
      <p>Retournez à la page projets pour consulter la sélection complète.</p>
      <a class="btn btn-primary" href="projects.html">Voir les projets</a>
    </section>
  `;
}

if (detailRoot && currentProject) {
  const lightbox = document.createElement("dialog");
  lightbox.className = "project-lightbox";
  lightbox.setAttribute("aria-label", "Visuel agrandi du projet");
  lightbox.innerHTML = `
    <div class="project-lightbox-content">
      <button class="project-lightbox-close" type="button" aria-label="Fermer le zoom" autofocus>
        <span aria-hidden="true">×</span>
      </button>
      <img class="project-lightbox-image" alt="">
    </div>
  `;
  document.body.appendChild(lightbox);
  const enlargedImage = lightbox.querySelector("img");
  let activeTrigger;
  let previousOverflow;

  detailRoot.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-project-zoom]");
    if (!trigger) return;
    const image = trigger.querySelector("img");
    activeTrigger = trigger;
    enlargedImage.src = image.currentSrc || image.src;
    enlargedImage.alt = image.alt || `Visuel du projet ${currentProject.title}`;
    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    lightbox.showModal();
  });

  lightbox.querySelector("button").addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener("close", () => {
    document.documentElement.style.overflow = previousOverflow;
    enlargedImage.removeAttribute("src");
    activeTrigger?.focus({ preventScroll: true });
  });
}
