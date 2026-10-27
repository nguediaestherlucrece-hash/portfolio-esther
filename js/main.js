const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.querySelector(".sr-only").textContent = open ? "Fermer le menu" : "Ouvrir le menu";
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const form = document.getElementById("contact-form");
const error = document.getElementById("form-error");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const nom = String(data.get("nom") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!nom || !emailOk || message.length < 4) {
    error.hidden = false;
    return;
  }
  error.hidden = true;
  const subject = encodeURIComponent(`Portfolio — message de ${nom}`);
  const body = encodeURIComponent(`${message}\n\n— ${nom}\n${email}`);
  window.location.href = `mailto:nguedia.esther@saintjeaningenieur.org?subject=${subject}&body=${body}`;
});
