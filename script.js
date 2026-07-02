const rebuildBtn = document.querySelector("#rebuildBtn");
const weekValue = document.querySelector("#weekValue");
const quickQuestions = document.querySelectorAll("[data-question]");
const askBtn = document.querySelector("#askBtn");
const askInput = document.querySelector("#askInput");
const botAnswer = document.querySelector("#botAnswer");
const toast = document.querySelector("#toast");

const answers = {
  signals:
    "Решение принято по трем сигналам: вырос спрос на финмодели, прогресс силен в стратегии, а карьерная цель требует расчетов.",
  gap:
    "Главный пробел недели: unit-экономика и прогноз выручки. Поэтому добавлен финансовый блок и мини-проект.",
  team:
    "Команда нужна, чтобы проверить навык в реальном формате: аналитик считает, продукт формулирует гипотезу, дизайнер собирает понятную подачу.",
};

let week = 8;
let toastTimer;

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

rebuildBtn?.addEventListener("click", () => {
  week += 1;
  weekValue.textContent = `Неделя ${week}`;
  botAnswer.textContent =
    "Неделя пересобрана: финансовый блок оставлен в приоритете, командная задача стала главным доказательством навыка.";
  showToast(`ИИ-Декан обновил сборку: неделя ${week}`);
});

quickQuestions.forEach((button) => {
  button.addEventListener("click", () => {
    botAnswer.textContent = answers[button.dataset.question];
  });
});

askBtn?.addEventListener("click", () => {
  const question = askInput.value.trim();
  botAnswer.textContent = question
    ? "Начните с прогноза выручки. Это самый короткий путь закрыть найденный пробел и усилить цифровой профиль."
    : answers.signals;
  showToast("ИИ-Архитектор обновил объяснение");
});

askInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    askBtn.click();
  }
});

if (window.lucide) {
  window.lucide.createIcons();
}
