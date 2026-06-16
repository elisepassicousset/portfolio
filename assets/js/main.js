const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
  });
}

const projects = window.portfolioProjects || [];

function createProjectCard(project) {
  const article = document.createElement("article");
  article.className = "project-card";
  article.innerHTML = `
    <a class="project-card-link" href="project.html?id=${project.id}" aria-label="Voir le projet ${project.title}">
      <div class="project-image" aria-hidden="true">
        <span>${project.title}</span>
      </div>
      <div class="project-card-body">
        <p class="project-category">${project.category}</p>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <span class="project-cta">Voir le projet</span>
      </div>
    </a>
  `;
  return article;
}

document.querySelectorAll("[data-projects-preview]").forEach((container) => {
  projects.slice(-3).forEach((project) => container.appendChild(createProjectCard(project)));
});

document.querySelectorAll("[data-projects-grid]").forEach((container) => {
  projects.forEach((project) => container.appendChild(createProjectCard(project)));
});
