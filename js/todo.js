const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskDate = document.getElementById("task-date");
const taskPriority = document.getElementById("task-priority");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  const filtered = tasks.filter(task => {
    if (currentFilter === "all") return true;
    if (currentFilter === "completed") return task.done;
    if (currentFilter === "pending") return !task.done;
  });

  filtered.forEach((task, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${task.text}</strong>
      <small>Due: ${task.date || "None"} | Priority: ${task.priority}</small>
      <div>
        <button onclick="toggle(${i})">${task.done ? "✅" : "✔"}</button>
        <button onclick="remove(${i})">🗑</button>
      </div>
    `;
    if (task.done) li.style.textDecoration = "line-through";
    taskList.appendChild(li);
  });
}

function toggle(index) {
  tasks[index].done = !tasks[index].done;
  saveAndRender();
}

function remove(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

form.onsubmit = (e) => {
  e.preventDefault();
  tasks.push({
    text: taskInput.value,
    date: taskDate.value,
    priority: taskPriority.value,
    done: false
  });
  form.reset();
  saveAndRender();
};

function setFilter(f) {
  currentFilter = f;
  renderTasks();
}

renderTasks();
