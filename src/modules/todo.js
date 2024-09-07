import { loadTodoForm } from "./newTodo.js";

// Set up empty array to store todos
let todos = [];
let id = 0;

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    renderTodos();
  }
}

function addTodo(title, description, dueDate, priority) {
  const newTodo = {
    id: id++,
    title,
    description,
    dueDate,
    priority,
    completed: false,
  };
  todos.push(newTodo);
  renderTodos();
  saveTodos();
}

function renderTodos() {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = ""; // Clear existing items
  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.textContent = todo.title;
    todoList.appendChild(todoItem);
  });
}

export { addTodo, renderTodos, loadTodos };
