const contactForm = document.querySelector("[data-contact-form]");
const contactStatus = document.querySelector("[data-contact-status]");
const contactSubmit = document.querySelector("[data-contact-submit]");

if (contactForm && contactStatus && contactSubmit) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());
    const defaultLabel = "Envoyer";

    contactSubmit.disabled = true;
    contactSubmit.textContent = "Envoi en cours...";
    contactStatus.textContent = "";
    contactStatus.className = "form-status";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue pendant l'envoi.");
      }

      contactForm.reset();
      contactStatus.textContent = "Votre message a bien été envoyé. Je vous répondrai dès que possible.";
      contactStatus.classList.add("is-success");
    } catch (error) {
      contactStatus.textContent = error.message || "Le message n'a pas pu être envoyé. Merci de réessayer dans quelques instants.";
      contactStatus.classList.add("is-error");
    } finally {
      contactSubmit.disabled = false;
      contactSubmit.textContent = defaultLabel;
    }
  });
}
