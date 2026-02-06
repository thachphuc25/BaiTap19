const MSSV = "231A010438";
const storageKey = `tasks_${MSSV}`;

const form = document.getElementById("taskForm");
const taskNameInput = document.getElementById("taskName");
const prioritySelect = document.getElementById("priority");

let tasks = JSON.parse(localStorage.getItem(storageKey)) || [];

const lastDigit = parseInt(MSSV[MSSV.length - 1]);
const specialColor = lastDigit % 2 === 0 ? "red" : "blue";

function renderTasks() {
  document.querySelectorAll(".box ul").forEach((ul) => (ul.innerHTML = ""));

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.name;

    if (task.name.length > 10) {
      li.style.color = specialColor;
    }

    document.querySelector(`#p${task.priority} ul`).appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = taskNameInput.value.trim();
  const priority = prioritySelect.value;

  if (!name) return;

  tasks.push({ name, priority });
  localStorage.setItem(storageKey, JSON.stringify(tasks));

  taskNameInput.value = "";
  renderTasks();
});
renderTasks();
