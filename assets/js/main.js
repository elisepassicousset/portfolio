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

function createProjectCard(project, previewDescription = "") {
  const projectImage = project.image
    ? `<img src="${project.image}" alt="">`
    : `<span>${project.title}</span>`;

  const article = document.createElement("article");
  article.className = "project-card";
  article.innerHTML = `
    <a class="project-card-link" href="project.html?id=${project.id}" aria-label="Voir le projet ${project.title}">
      <div class="project-image" aria-hidden="true">
        ${projectImage}
      </div>
      <div class="project-card-body">
        <h3>${project.title}</h3>
        ${previewDescription ? `<p class="project-preview-description">${previewDescription}</p>` : ""}
      </div>
    </a>
  `;
  return article;
}

document.querySelectorAll("[data-projects-preview]").forEach((container) => {
  const previewDescriptions = {
    "sondelia": "Product Design · UX/UI · Application mobile",
    "the-y-festival": "UX/UI · Identité visuelle · Site web",
    "mademoiselle-azalee": "UX/UI · E-commerce · Shopify"
  };
  projects.slice(0, 3).forEach((project) => {
    container.appendChild(createProjectCard(project, previewDescriptions[project.id]));
  });
});

document.querySelectorAll("[data-projects-grid]").forEach((container) => {
  projects.forEach((project) => container.appendChild(createProjectCard(project, project.cardDescription)));
});

const backToTopButton = document.createElement("button");
backToTopButton.className = "back-to-top";
backToTopButton.type = "button";
backToTopButton.setAttribute("aria-label", "Retour en haut");
backToTopButton.innerHTML = "<span aria-hidden=\"true\">↑</span>";
document.body.appendChild(backToTopButton);

function toggleBackToTopButton() {
  backToTopButton.classList.toggle("is-visible", window.scrollY > 360);
}

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

window.addEventListener("scroll", toggleBackToTopButton, { passive: true });
toggleBackToTopButton();
