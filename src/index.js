import "./styles.css";
import { loadTodoForm } from "./modules/newTodo.js";

document.addEventListener("DOMContentLoaded", () => {
  const addTask = document.getElementById("add-task-button");

  addTask.addEventListener("click", () => {
    loadTodoForm();
  });
});
