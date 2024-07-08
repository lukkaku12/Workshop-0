class Task {
  constructor(id, description, completed = false) {
    this.id = id;
    this.description = description;
    this.completed = completed;
  } //this.atributo = atributo o Padre.atributo = atributo

  toggleComplete() {
    this.completed = !this.completed;
  }
}

class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // falta que el parseo mantenga los objetos como instancias Task.
    this.loadTasks();
  }

  addTask(description) {
    const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;

    const task = new Task(id, description);
    this.tasks.push(task);
    this.saveTasks();
    this.renderTasks();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
    this.renderTasks();
  }

  editTask(id) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.description = prompt("nombre de la tarea que reemplazara");
    }

    this.saveTasks();
    this.renderTasks();
  }

  toggleTaskComplete(id) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      const taskInstance = new Task(task.id, task.description, task.completed)
      taskInstance.toggleComplete();
      this.tasks = this.tasks.map(t => t.id === id ? taskInstance : t)
      this.saveTasks();
      this.renderTasks();
    } else {
      console.error('tarea no encontrada')
    }
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  loadTasks() {
    this.renderTasks();
  }

  renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    this.tasks.forEach((task) => {
      
      const item = document.createElement("li");
      item.textContent = task.description;
      item.className = task.completed ? "completed" : "";
      item.addEventListener("click", () => this.toggleTaskComplete(task.id));
      item.style.textDecoration = task.completed ? "line-through" : "none";

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
        this.deleteTask(task.id);
      });

      const editButton = document.createElement("button");
      editButton.textContent = "Editar";
      editButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.editTask(task.id);
      });

      item.appendChild(deleteButton);
      item.appendChild(editButton);
      taskList.appendChild(item);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const taskManager = new TaskManager();

  document.getElementById("add-task").addEventListener("click", () => {
    const newTask = document.getElementById("new-task").value;
    if (newTask) {
      taskManager.addTask(newTask);
      document.getElementById("new-task").value = "";
    }
  });
});
