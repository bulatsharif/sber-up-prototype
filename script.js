const scrollButtons = document.querySelectorAll("[data-scroll]");
const mobileButtons = document.querySelectorAll(".mobile-nav button");
const rebuildBtn = document.querySelector("#rebuildBtn");
const weekValue = document.querySelector("#weekValue");
const readinessValue = document.querySelector("#readinessValue");
const toast = document.querySelector("#toast");
const skillNodes = document.querySelectorAll(".skill-node");

let revision = 0;
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function setActiveNav(sectionId) {
  mobileButtons.forEach((button) => {
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

  weekValue.textContent = String(nextWeek);
  readinessValue.textContent = `${nextReadiness}%`;

  skillNodes.forEach((node, index) => {
    node.classList.toggle("active", index <= revision % skillNodes.length);
  });

  showToast(`AI-Декан пересобрал неделю ${nextWeek}: добавлен рыночный приоритет по LLM Safety`);
});

const observedSections = ["overview", "trajectory", "agents", "presentation"]
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
  { rootMargin: "-18% 0px -65% 0px", threshold: [0.1, 0.25, 0.5] }
);

observedSections.forEach((section) => observer.observe(section));
setActiveNav("overview");

if (window.lucide) {
  window.lucide.createIcons();
}
