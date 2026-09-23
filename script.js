const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelectorAll(".site-nav a");
const accordion = document.querySelector("[data-accordion]");
const form = document.querySelector(".contact-form");
const formNote = document.querySelector("[data-form-note]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}

function closeNav() {
  nav?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
}

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  nav?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("nav-open", !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeNav);
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

accordion?.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button || !accordion.contains(button)) {
    return;
  }

  const panel = document.getElementById(button.getAttribute("aria-controls"));
  const expanded = button.getAttribute("aria-expanded") === "true";

  button.setAttribute("aria-expanded", String(!expanded));

  if (panel) {
    panel.hidden = expanded;
  }
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  form.reset();

  if (formNote) {
    formNote.textContent = "Mensagem registrada apenas visualmente neste projeto demonstrativo.";
  }
});

if (reduceMotion.matches) {
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("is-visible");
  });
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}
