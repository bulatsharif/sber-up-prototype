const scrollButtons = document.querySelectorAll("[data-scroll]");
const navButtons = document.querySelectorAll(".desktop-nav button, .mobile-nav button");
const rebuildBtn = document.querySelector("#rebuildBtn");
const weekValue = document.querySelector("#weekValue");
const readinessValue = document.querySelector("#readinessValue");
const progressFill = document.querySelector("#progressFill");
const focusValue = document.querySelector("#focusValue");
const toast = document.querySelector("#toast");

const focusQueue = ["LLM Safety", "K8s tracing", "PR review", "RAG Eval"];
let revision = 0;
let toastTimer;

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function setActiveNav(sectionId) {
  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.scroll === sectionId);
  });
}

scrollButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const target = document.getElementById(button.dataset.scroll);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveNav(button.dataset.scroll);
    }
  });
});

rebuildBtn?.addEventListener("click", () => {
  revision += 1;

  const nextWeek = 14 + revision;
  const nextReadiness = Math.min(92, 68 + revision * 6);
  const nextFocus = focusQueue[(revision - 1) % focusQueue.length];

  weekValue.textContent = String(nextWeek);
  readinessValue.textContent = `${nextReadiness}%`;
  progressFill.style.width = `${nextReadiness}%`;
  focusValue.textContent = nextFocus;

  showToast(`Трек обновлен: неделя ${nextWeek}, фокус - ${nextFocus}`);
});

const observedSections = ["idea", "mechanics", "presentation"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible?.target?.id) {
      setActiveNav(visible.target.id);
    }
  },
  { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.35] }
);

observedSections.forEach((section) => observer.observe(section));
setActiveNav("idea");

if (window.lucide) {
  window.lucide.createIcons();
}
