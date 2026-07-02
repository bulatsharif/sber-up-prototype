const courseCards = document.querySelectorAll(".course-card");
const rebuildBtn = document.querySelector("#rebuildBtn");
const weekValue = document.querySelector("#weekValue");
const detailTitle = document.querySelector("#detailTitle");
const detailText = document.querySelector("#detailText");
const detailProgress = document.querySelector("#detailProgress");
const todayTask = document.querySelector("#todayTask");
const practiceTask = document.querySelector("#practiceTask");
const marketReason = document.querySelector("#marketReason");
const quickQuestions = document.querySelectorAll("[data-question]");
const askBtn = document.querySelector("#askBtn");
const askInput = document.querySelector("#askInput");
const botAnswer = document.querySelector("#botAnswer");
const toast = document.querySelector("#toast");

const courses = {
  finance: {
    title: "Финансовое моделирование",
    text: "Учимся строить понятную модель бизнеса: доходы, расходы, сценарии роста и точка окупаемости.",
    progress: "72%",
    today: "Собрать прогноз выручки на 6 месяцев",
    practice: "Модель для малого сервиса подписки",
    market: "На рынке растет спрос на финансовых аналитиков",
  },
  product: {
    title: "Управление продуктом",
    text: "Разбираем, как выбрать полезную идею, проверить спрос и превратить ее в понятный план запуска.",
    progress: "46%",
    today: "Сформулировать проблему клиента и критерии успеха",
    practice: "Карта продукта для сервиса личных финансов",
    market: "Компании ищут людей, которые соединяют бизнес и пользователя",
  },
  strategy: {
    title: "Стратегия и рынок",
    text: "Учимся сравнивать рынки, видеть конкурентов и объяснять, почему одно решение сильнее другого.",
    progress: "58%",
    today: "Сравнить два сегмента клиентов по потенциалу роста",
    practice: "Короткая стратегия выхода на новый рынок",
    market: "Растет спрос на навыки оценки рынков и бизнес-решений",
  },
};

const answers = {
  path: "Путь построен так: сначала расчеты, затем продуктовая логика, потом стратегия. Так вы сможете не только считать, но и объяснять бизнес-решения.",
  career: "Этот набор ведет к ролям бизнес-аналитика, младшего продуктового менеджера или финансового аналитика.",
  today: "Сегодня лучше закрыть одну практическую задачу: прогноз выручки. Это самый важный пробел недели.",
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

function selectCourse(courseId) {
  const course = courses[courseId];
  if (!course) return;

  courseCards.forEach((card) => {
    const isActive = card.dataset.course === courseId;
    card.classList.toggle("active", isActive);
    card.setAttribute("aria-pressed", String(isActive));
  });

  detailTitle.textContent = course.title;
  detailText.textContent = course.text;
  detailProgress.textContent = course.progress;
  todayTask.textContent = course.today;
  practiceTask.textContent = course.practice;
  marketReason.textContent = course.market;
}

courseCards.forEach((card) => {
  card.addEventListener("click", () => {
    selectCourse(card.dataset.course);
  });
});

rebuildBtn?.addEventListener("click", () => {
  week += 1;
  weekValue.textContent = `Неделя ${week}`;
  selectCourse("product");
  botAnswer.textContent =
    "Я усилил курс по продукту: по вашим задачам видно, что расчеты идут хорошо, а аргументацию решений стоит подтянуть.";
  showToast(`ИИ-Декан пересобрал путь: неделя ${week}`);
});

quickQuestions.forEach((button) => {
  button.addEventListener("click", () => {
    botAnswer.textContent = answers[button.dataset.question];
  });
});

askBtn?.addEventListener("click", () => {
  const question = askInput.value.trim();
  botAnswer.textContent = question
    ? "Я бы начал с одного измеримого результата на сегодня и не перегружал неделю новыми темами."
    : answers.today;
  showToast("ИИ-Архитектор обновил рекомендацию");
});

askInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    askBtn.click();
  }
});

if (window.lucide) {
  window.lucide.createIcons();
}
