// js/script.js
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const storage = {
  get(key, fallback = null) {
    try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch {}
  }
};

const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  storage.set("theme", theme);
}

function initTheme() {
  const saved = storage.get("theme");
  if (saved === "dark" || saved === "light") return setTheme(saved);
  setTheme(prefersDark ? "dark" : "light");
}

const I18N = {
  fr: {
    "hero.stats.projects":"Projets mis en avant",
    "hero.stats.years":"Projets en production",
    "hero.stats.focus":"Focus : performance & UX",

    "about.title":"À propos",
    "about.subtitle":"Profil, approche, et ce qui fait la différence en mission.",
    "about.card1.title":"Qui je suis",
    "about.card1.p1":"17 ans, en Terminale, passionné par la création de produits web propres, rapides et robustes.",
    "about.card1.p2":"Très carré et un peu perfectionniste : objectif “pro” sur le rendu, mais aussi sur la qualité du code.",
    "about.card1.p3":"J’aime construire des solutions complètes : front, back, base de données, hébergement et automatisations.",
    "about.card2.title":"Ce que je fais",
    "about.card2.li1":"Sites vitrines et plateformes web responsives.",
    "about.card2.li2":"Applications web interactives (auth, API, base de données).",
    "about.card2.li3":"Automatisations & bots (trading, scripts, intégrations).",
    "about.card2.li4":"Infra perso : NAS, VM, réseau, hosting.",
    "about.card3.title":"Stack & méthodes",
    "about.card3.p1":"Priorité : performance, accessibilité, SEO de base, et expérience utilisateur.",

    "skills.title":"Compétences",
    "skills.subtitle":"Ce que j’utilise au quotidien pour livrer des projets fiables.",
    "skills.web.title":"Web",
    "skills.backend.title":"Back-end",
    "skills.ops.title":"DevOps / Infra",
    "skills.extra.title":"Automatisations",

    "projects.title":"Projets",
    "projects.subtitle":"3 projets représentatifs : produit, performance, et technique.",
    "projects.icepulse.desc":"Site web de présentation d’une association donnant des cours de patinage.",
    "projects.icepulse.b1":"Responsive.",
    "projects.icepulse.b2":"Performant.",
    "projects.checkice.desc":"Plateforme communautaire des patinoires : carte interactive, covoiturage, événements et réseau social.",
    "projects.checkice.b1":"Auth + base de données + hosting.",
    "projects.checkice.b2":"API + logique applicative.",
    "projects.bot.title":"Robot de trading (scalping)",
    "projects.bot.desc":"Bot de trading crypto : API exchange, indicateurs (moyennes), exécution et gestion du risque.",
    "projects.bot.b1":"Connexion exchange + flux de données.",
    "projects.bot.b2":"Stratégies, backtesting (en cours), monitoring.",
    "projects.bot.cta":"Demander une démo",

    "exp.title":"Expériences",
    "exp.subtitle":"Projets clients, projets perso, et contexte pro.",
    "exp.checkice":"Plateforme communautaire des patinoires : carte interactive, covoiturage, événements et réseau social.",
    "exp.icepulse":"Site web de présentation d’une association (cours de patinage).",
    "exp.homeinfra.title":"Infrastructure réseau (perso)",
    "exp.homeinfra.badge":"Projet perso",
    "exp.homeinfra.desc":"Mise en place d’un environnement à la maison : NAS, VM, services web, réseau, automatisations.",
    "exp.qualnet.badge":"Stage",
    "exp.qualnet.desc":"Entreprise créant des logiciels qualité no‑code pour simplifier, structurer et piloter vos démarches.",

    "contact.title":"Contact",
    "contact.subtitle":"Décris ton besoin (site, app, automatisation). Réponse rapide.",
    "contact.direct.title":"Direct",
    "contact.availability":"Disponible en parallèle des cours (missions ciblées, itératives).",
    "contact.form.title":"Formulaire",
    "contact.form.name":"Nom",
    "contact.form.email":"Email",
    "contact.form.message":"Message",
    "contact.form.send":"Envoyer",
    "contact.form.template":"Remplir un exemple",
    "contact.form.note":"Envoi en “mailto” (ouvre ton client mail). Pour un vrai backend, on branchera Formspree/Netlify Forms ou ton NAS."
  },
  en: {
    "hero.stats.projects":"Featured projects",
    "hero.stats.years":"Production projects",
    "hero.stats.focus":"Focus: performance & UX",

    "about.title":"About",
    "about.subtitle":"Profile, approach, and what makes the difference on a mission.",
    "about.card1.title":"Who I am",
    "about.card1.p1":"17-year-old high school senior, passionate about building clean, fast, and robust web products.",
    "about.card1.p2":"Very structured and a bit perfectionist: professional visuals, and professional code quality.",
    "about.card1.p3":"I enjoy delivering end-to-end solutions: front-end, back-end, database, hosting, and automations.",
    "about.card2.title":"What I do",
    "about.card2.li1":"Responsive websites and web platforms.",
    "about.card2.li2":"Interactive web apps (auth, APIs, databases).",
    "about.card2.li3":"Automations & bots (trading, scripts, integrations).",
    "about.card2.li4":"Home infra: NAS, VMs, network, hosting.",
    "about.card3.title":"Stack & methods",
    "about.card3.p1":"Priorities: performance, accessibility, basic SEO, and user experience.",

    "skills.title":"Skills",
    "skills.subtitle":"Tools and skills used to ship reliable projects.",
    "skills.web.title":"Web",
    "skills.backend.title":"Back-end",
    "skills.ops.title":"DevOps / Infra",
    "skills.extra.title":"Automations",

    "projects.title":"Projects",
    "projects.subtitle":"Three representative projects: product, performance, and engineering.",
    "projects.icepulse.desc":"Website for an association offering ice skating lessons.",
    "projects.icepulse.b1":"Responsive.",
    "projects.icepulse.b2":"Fast.",
    "projects.checkice.desc":"Community platform for ice rinks: interactive map, carpooling, events and a social network.",
    "projects.checkice.b1":"Auth + database + hosting.",
    "projects.checkice.b2":"APIs + application logic.",
    "projects.bot.title":"Trading bot (scalping)",
    "projects.bot.desc":"Crypto trading bot: exchange API, indicators (moving averages), execution and risk management.",
    "projects.bot.b1":"Exchange connection + data stream.",
    "projects.bot.b2":"Strategies, backtesting (in progress), monitoring.",
    "projects.bot.cta":"Request a demo",

    "exp.title":"Experience",
    "exp.subtitle":"Client work, personal projects, and professional context.",
    "exp.checkice":"Community platform for ice rinks: interactive map, carpooling, events and a social network.",
    "exp.icepulse":"Showcase website for an association (ice skating lessons).",
    "exp.homeinfra.title":"Home network infrastructure",
    "exp.homeinfra.badge":"Personal project",
    "exp.homeinfra.desc":"Home environment: NAS, VMs, web services, network, automations.",
    "exp.qualnet.badge":"Internship",
    "exp.qualnet.desc":"Company building no-code quality software to simplify, structure and manage quality processes.",

    "contact.title":"Contact",
    "contact.subtitle":"Describe your need (website, app, automation). Quick reply.",
    "contact.direct.title":"Direct",
    "contact.availability":"Available alongside school (focused, iterative missions).",
    "contact.form.title":"Form",
    "contact.form.name":"Name",
    "contact.form.email":"Email",
    "contact.form.message":"Message",
    "contact.form.send":"Send",
    "contact.form.template":"Fill an example",
    "contact.form.note":"Sends via “mailto” (opens your email client). For a real backend, we can plug Formspree/Netlify Forms or your NAS."
  }
};

function applyI18n(lang) {
  document.documentElement.lang = lang;
  $$("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = I18N?.[lang]?.[key];
    if (typeof val === "string") el.textContent = val;
  });

  const langBtn = $("[data-lang-toggle]");
  if (langBtn) langBtn.textContent = (lang === "fr") ? "EN" : "FR";

  storage.set("lang", lang);
}

function initLang() {
  const saved = storage.get("lang", "fr");
  applyI18n(saved === "en" ? "en" : "fr");
}

/* Toast */
let toastTimer = null;
function showToast(message, ms = 2200) {
  const t = $(".toast");
  if (!t) return;
  t.textContent = message;
  t.hidden = false;

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, ms);
}

/* Menu mobile */
function initMobileNav() {
  const toggle = $("[data-nav-toggle]");
  const panel = $("[data-nav-panel]");
  if (!toggle || !panel) return;

  const close = () => {
    panel.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = panel.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  $$("[data-nav-link]").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

/* Reveal on scroll (IntersectionObserver) */
function initReveal() {
  const els = $$(".reveal");
  if (!els.length) return;

  // Si reduce motion: on affiche direct (et CSS enlève déjà transitions)
  if (prefersReducedMotion) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // Observer l'intersection avec la fenêtre/viewport
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      el.classList.add("is-visible");

      // Stagger (optionnel)
      if (el.hasAttribute("data-stagger")) {
        // Rien ici: on peut gérer un stagger global si besoin,
        // mais on garde léger pour perf.
      }

      obs.unobserve(el);
    });
  }, { threshold: 0.12 });

  els.forEach((el) => obs.observe(el));
}

/* Click-to-toast helper */
function initToasts() {
  $$("[data-toast]").forEach((btn) => {
    btn.addEventListener("click", () => showToast(btn.getAttribute("data-toast")));
  });
}

/* Contact form: mailto */
function initContactForm() {
  const form = $("#contactForm");
  if (!form) return;

  const fillBtn = $("[data-fill-template]", form);
  if (fillBtn) {
    fillBtn.addEventListener("click", () => {
      $("#name") && ($("#name").value = "Client potentiel");
      $("#email") && ($("#email").value = "client@email.com");
      $("#message") && ($("#message").value =
        "Bonjour Mathieu,\n\nJe souhaite un site web / une app. Objectif, délais, budget : ...\n\nPeux-tu me proposer une solution ?\n");
      showToast("Exemple ajouté.");
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = ($("#name")?.value || "").trim();
    const email = ($("#email")?.value || "").trim();
    const message = ($("#message")?.value || "").trim();

    if (!name || !email || !message) {
      showToast("Merci de remplir tous les champs.");
      return;
    }

    const to = "mathieu.chapron.2008@gmail.com";
    const subject = encodeURIComponent(`Contact portfolio — ${name}`);
    const body = encodeURIComponent(
      `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
    );

    // Ouvre le client mail
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}

/* Footer year */
function initYear() {
  const y = $("[data-year]");
  if (y) y.textContent = String(new Date().getFullYear());
}

/* Bind toggles */
function initToggles() {
  const themeBtn = $("[data-theme-toggle]");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current === "dark" ? "light" : "dark");
      showToast(`Thème: ${document.documentElement.getAttribute("data-theme")}`);
    });
  }

  const langBtn = $("[data-lang-toggle]");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const current = document.documentElement.lang || "fr";
      const next = current === "fr" ? "en" : "fr";
      applyI18n(next);
      showToast(next === "fr" ? "FR activé" : "EN enabled");
    });
  }
}

/* Init */
initTheme();
initLang();
initMobileNav();
initReveal();
initToasts();
initContactForm();
initYear();
initToggles();
