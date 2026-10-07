const CONTACT_TO = "elise.passicousset@outlook.com";

function sanitize(value) {
  return String(value || "").trim();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Méthode non autorisée." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM || "Portfolio Elise <onboarding@resend.dev>";

  if (!apiKey) {
    return response.status(500).json({
      error: "Le formulaire n'est pas encore configuré pour l'envoi. Merci de réessayer plus tard."
    });
  }

  let body = request.body || {};

  if (typeof request.body === "string") {
    try {
      body = JSON.parse(request.body || "{}");
    } catch {
      return response.status(400).json({ error: "La demande envoyée n'est pas valide." });
    }
  }

  const nom = sanitize(body.nom);
  const email = sanitize(body.email);
  const objet = sanitize(body.objet);
  const message = sanitize(body.message);

  if (!nom || !email || !objet || !message) {
    return response.status(400).json({ error: "Merci de remplir tous les champs du formulaire." });
  }

  if (!isEmail(email)) {
    return response.status(400).json({ error: "Merci d'indiquer une adresse e-mail valide." });
  }

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: CONTACT_TO,
      reply_to: email,
      subject: `Portfolio - ${objet}`,
      text: [
        `Nom : ${nom}`,
        `E-mail : ${email}`,
        `Objet : ${objet}`,
        "",
        message
      ].join("\n")
    })
  });

  if (!emailResponse.ok) {
    return response.status(502).json({
      error: "Le message n'a pas pu être envoyé. Merci de réessayer dans quelques instants."
    });
  }

  return response.status(200).json({ ok: true });
}
