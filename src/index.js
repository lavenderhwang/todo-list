import "./styles.css";
import { loadTodoForm } from "./modules/newTodo.js";
import { loadTodos } from "./modules/todo.js";

document.addEventListener("DOMContentLoaded", () => {
  loadTodos();
  const addTask = document.getElementById("add-task-button");

  addTask.addEventListener("click", () => {
    loadTodoForm();
  });
});
