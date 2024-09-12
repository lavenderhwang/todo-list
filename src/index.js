import "./styles.css";
import { loadTodoForm } from "./modules/newTodo.js";
import { loadTodos } from "./modules/todo.js";
import { loadProjectForm } from "./modules/newProject.js";
import { loadProjects } from "./modules/projects.js";

document.addEventListener("DOMContentLoaded", () => {
  loadTodos();
  loadProjects();

  const addTask = document.getElementById("add-task-button");
  const addProject = document.getElementById("add-project-button");

  addTask.addEventListener("click", () => {
    loadTodoForm();
  });

  addProject.addEventListener("click", () => {
    loadProjectForm();
  });
});
