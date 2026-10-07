const detailRoot = document.querySelector("[data-project-detail]");
const params = new URLSearchParams(window.location.search);
const currentProject = projects.find((project) => project.id === params.get("id"));

if (detailRoot && currentProject) {
  const heroVisual = currentProject.image
    ? `
      <div class="project-detail-hero-visual" aria-hidden="true">
        <img src="${currentProject.image}" alt="">
      </div>
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
        <div class="score-visual-grid" aria-label="Visuels ${section.title}">
          ${Array.from({ length: section.visualSlots || 3 }, (_, index) => `
            <div class="score-visual-slot">
              <span>Visuel ${index + 1}</span>
            </div>
          `).join("")}
        </div>
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
          <div class="project-cta-mockup" aria-hidden="true">
            <img class="project-cta-image" src="${currentProject.ctaImage}" alt="">
          </div>
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
      <h1>Ce projet n'est pas disponible.</h1>
      <p>Retournez à la page projets pour consulter la sélection complète.</p>
      <a class="btn btn-primary" href="projects.html">Voir les projets</a>
    </section>
  `;
}
