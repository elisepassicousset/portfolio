const detailRoot = document.querySelector("[data-project-detail]");
const params = new URLSearchParams(window.location.search);
const currentProject = projects.find((project) => project.id === params.get("id"));

if (detailRoot && currentProject) {
  const photoSlots = currentProject.photoSlots || 3;
  const photoPlaceholders = Array.from({ length: photoSlots }, (_, index) => `
    <div class="project-photo-slot">
      <span>Visuel ${index + 1}</span>
    </div>
  `).join("");
  const tools = currentProject.tools || [];
  const toolItems = tools.map((tool) => `<span>${tool}</span>`).join("");
  const status = currentProject.status ? `<span class="project-status project-status-large">${currentProject.status}</span>` : "";
  const detailImage = currentProject.image
    ? `<img src="${currentProject.image}" alt="">`
    : `<span>${currentProject.title}</span>`;
  const scoreSections = currentProject.score
    ? currentProject.score.map((section) => `
      <article class="score-card">
        <div class="score-content">
          <p class="eyebrow">${section.title}</p>
          <h2>${section.heading}</h2>
          ${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
        </div>
      </article>
    `).join("")
    : "";
  const projectCta = currentProject.link
    ? `
      <section class="project-cta-section">
        <p class="eyebrow">Découvrir</p>
        <h2>Voir le projet en ligne</h2>
        <a class="btn btn-primary" href="${currentProject.link}" target="_blank" rel="noreferrer">Ouvrir le site</a>
      </section>
    `
    : "";

  document.title = `${currentProject.title} | Elise Passicousset`;
  detailRoot.innerHTML = `
    <section class="project-detail-hero">
      <a class="back-link" href="projects.html">Retour aux projets</a>
      <div class="project-detail-meta">
        <p class="eyebrow">${currentProject.category}</p>
        ${status}
      </div>
      <h1>${currentProject.title}</h1>
      <p>${currentProject.description}</p>
    </section>

    <section class="project-detail-image project-detail-cover" aria-label="Image du projet">
      ${detailImage}
    </section>

    <section class="section project-score-section">
      <div class="section-heading">
        <p class="eyebrow">Méthode SCORE</p>
        <h2>Du constat à la solution</h2>
      </div>
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

    <section class="section section-compact">
      <div class="section-heading">
        <p class="eyebrow">Visuels</p>
        <h2>Emplacements à compléter</h2>
      </div>
      <div class="project-photo-grid">
        ${photoPlaceholders}
      </div>
    </section>

    <section class="section section-compact project-tools-section">
      <div class="section-heading">
        <p class="eyebrow">Outils</p>
        <h2>Logiciels utilisés</h2>
      </div>
      <div class="tools-list">
        ${toolItems || "<span>À compléter</span>"}
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
