const detailRoot = document.querySelector("[data-project-detail]");
const params = new URLSearchParams(window.location.search);
const currentProject = projects.find((project) => project.id === params.get("id"));

if (detailRoot && currentProject) {
  document.title = `${currentProject.title} | Elise Passicousset`;
  detailRoot.innerHTML = `
    <section class="project-detail-hero">
      <a class="back-link" href="projects.html">Retour aux projets</a>
      <p class="eyebrow">${currentProject.category}</p>
      <h1>${currentProject.title}</h1>
      <p>${currentProject.description}</p>
    </section>

    <section class="project-detail-image" aria-label="Image placeholder du projet">
      <span>${currentProject.title}</span>
    </section>

    <section class="section project-detail-grid">
      <article>
        <p class="eyebrow">Contexte</p>
        <p>${currentProject.context}</p>
      </article>
      <article>
        <p class="eyebrow">Rôle</p>
        <p>${currentProject.role}</p>
      </article>
      <article>
        <p class="eyebrow">Objectifs</p>
        <p>${currentProject.objectives}</p>
      </article>
      <article>
        <p class="eyebrow">Processus</p>
        <p>${currentProject.process}</p>
      </article>
      <article>
        <p class="eyebrow">Résultat final</p>
        <p>${currentProject.result}</p>
      </article>
      <article>
        <p class="eyebrow">Lien externe</p>
        ${
          currentProject.link
            ? `<a class="text-link" href="${currentProject.link}" target="_blank" rel="noreferrer">Voir le projet en ligne</a>`
            : `<p class="muted">Lien à ajouter prochainement.</p>`
        }
      </article>
    </section>
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
