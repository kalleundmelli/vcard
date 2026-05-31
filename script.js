const translations = {
  en: {
    htmlLang: "en",
    title: "Kalle & Melli – Digital contact card",
    description: "Digital contact card for Kalle & Melli.",
    loading: "Preparing the contact card …",
    eyebrow: "International convention · Douala 2026",
    subtitle: "Hello, we are Kalle and Melli from Selters.",
    intro: "We would be happy if you write to us so that we can stay in touch. Warm greetings.",
    saveContact: "Save contact",
    write: "Write",
    map: "Map",
    emailLabel: "Email address",
    addressLabel: "Address",
    installTitle: "Add to home screen",
    installText: "This contact card can be saved on your phone like a small app.",
    installButton: "Add",
    footer: "No cookies. No tracking. Static hosting."
  },
  de: {
    htmlLang: "de",
    title: "Kalle & Melli – Digitale Kontaktkarte",
    description: "Digitale Kontaktkarte von Kalle & Melli.",
    loading: "Kontaktkarte wird vorbereitet …",
    eyebrow: "Internationaler Kongress · Douala 2026",
    subtitle: "Hallo, wir sind Kalle und Melli aus Selters.",
    intro: "Wir freuen uns, wenn du uns schreibst und wir dadurch in Kontakt bleiben. Liebe Grüße.",
    saveContact: "Kontakt speichern",
    write: "Schreiben",
    map: "Karte",
    emailLabel: "E-Mail-Adresse",
    addressLabel: "Adresse",
    installTitle: "Als App speichern",
    installText: "Diese Kontaktkarte kann auf dem Smartphone wie eine kleine App gespeichert werden.",
    installButton: "Hinzufügen",
    footer: "Keine Cookies. Kein Tracking. Statisch gehostet."
  },
  fr: {
    htmlLang: "fr",
    title: "Kalle & Melli – Carte de contact",
    description: "Carte de contact numérique de Kalle & Melli.",
    loading: "Préparation de la carte de contact …",
    eyebrow: "International convention · Douala 2026",
    subtitle: "Bonjour, nous sommes Kalle et Melli de Selters.",
    intro: "Nous serions heureux que tu nous écrives afin que nous puissions rester en contact. Avec toute notre affection.",
    saveContact: "Enregistrer le contact",
    write: "Écrire",
    map: "Carte",
    emailLabel: "Adresse e-mail",
    addressLabel: "Adresse",
    installTitle: "Ajouter à l’écran d’accueil",
    installText: "Cette carte peut être ajoutée au téléphone comme une petite application.",
    installButton: "Ajouter",
    footer: "Aucun cookie. Aucun suivi. Hébergement statique."
  }
};

// Douala mode is intentionally active now. If you later want automatic switching,
// replace the next line with a date check.
const isDoualaMode = true;
document.body.classList.toggle("theme-douala", isDoualaMode);
document.body.classList.toggle("theme-normal", !isDoualaMode);

const savedLang = localStorage.getItem("vcard-language");
const defaultLang = savedLang && translations[savedLang] ? savedLang : "en";

function setLanguage(lang) {
  const dictionary = translations[lang] || translations.en;
  document.documentElement.lang = dictionary.htmlLang;
  document.title = dictionary.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", dictionary.description);
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.textContent = dictionary[key];
  });
  document.querySelectorAll(".language-switch button").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
    button.setAttribute("aria-pressed", button.dataset.lang === lang ? "true" : "false");
  });
  localStorage.setItem("vcard-language", lang);
}

document.querySelectorAll(".language-switch button").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});
setLanguage(defaultLang);

const profileImage = new Image();
profileImage.src = "assets/profile.png";
const logoImage = new Image();
logoImage.src = "assets/douala-2026.png";
function finishLoading() { document.body.classList.add("loaded"); }
let loadedCount = 0;
function oneLoaded() { loadedCount += 1; if (loadedCount >= 2) finishLoading(); }
[profileImage, logoImage].forEach((img) => {
  if (img.complete) oneLoaded(); else { img.onload = oneLoaded; img.onerror = oneLoaded; }
});
setTimeout(finishLoading, 2600);

let deferredPrompt;
const installButton = document.getElementById("installButton");
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installButton.hidden = false;
});
installButton?.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installButton.hidden = true;
});
