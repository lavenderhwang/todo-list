import unchecked from "../assets/icons/unchecked.svg";
import checked from "../assets/icons/checked.svg";
import deleteIcon from "../assets/icons/delete.svg";
import { filterToday, filterWeek } from "./filter.js";
import { openEditForm } from "./newTodo.js";

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

function addTodo(title, description, dueDate, priority, project = "Inbox") {
  const newTodo = {
    id: id++,
    title,
    description,
    dueDate,
    priority,
    project,
    completed: false,
  };
  todos.push(newTodo);
  renderTodos();
  saveTodos();
}

function updateTodo(id, title, description, dueDate, priority, project) {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex] = {
      ...todos[todoIndex],
      title,
      description,
      dueDate,
      priority,
      project,
    };
    saveTodos();
    renderTodos();
  }
}

function renderTodos(filteredTodos = todos) {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = ""; // Clear existing items
  filteredTodos.forEach((todo, index) => {
    const todoItem = document.createElement("ul");
    todoItem.classList.add("todo-item");

    const uncheckedButton = document.createElement("img");
    uncheckedButton.src = unchecked;
    uncheckedButton.alt = "check button";
    uncheckedButton.classList.add("unchecked-todo");

    const checkedButton = document.createElement("img");
    checkedButton.src = checked;
    checkedButton.alt = "check button";
    checkedButton.classList.add("unchecked-todo");

    const todoElements = document.createElement("div");
    todoElements.classList.add("todo-elements");

    // Create elements for todo details
    const titleElement = document.createElement("li");
    titleElement.textContent = todo.title;
    titleElement.classList.add("todo-title");

    const descriptionElement = document.createElement("li");
    descriptionElement.textContent = todo.description;
    descriptionElement.classList.add("todo-description");

    const priorityElement = document.createElement("div");
    priorityElement.classList.add("todo-priority");

    const priorityColor = document.createElement("div");
    priorityColor.classList.add("todo-priority-color");

    const todoPriority = todo.priority;
    if (todoPriority == "High Priority") {
      priorityColor.classList.add("high-priority-color");
    } else if (todoPriority == "Medium Priority") {
      priorityColor.classList.add("medium-priority-color");
    } else {
      priorityColor.classList.add("low-priority-color");
    }

    const priorityLabel = document.createElement("li");
    priorityLabel.textContent = todoPriority;
    priorityLabel.classList.add("todo-priority-label");

    priorityElement.appendChild(priorityColor);
    priorityElement.appendChild(priorityLabel);

    const dueDateElement = document.createElement("li");
    dueDateElement.textContent = todo.dueDate;
    dueDateElement.classList.add("todo-dueDate");

    const deleteElement = document.createElement("img");
    deleteElement.src = deleteIcon;
    deleteElement.alt = "delete button";
    deleteElement.classList.add("delete-task-button");

    // Append the details to the todoItem
    todoElements.appendChild(titleElement);
    todoElements.appendChild(descriptionElement);
    todoElements.appendChild(priorityElement);
    todoElements.appendChild(dueDateElement);

    todoElements.addEventListener("click", () => {
      openEditForm(todo); // Pass the clicked todo item as container
    });

    todoItem.appendChild(uncheckedButton);
    todoItem.appendChild(todoElements);
    todoItem.appendChild(deleteElement);

    // Append todoItem to the todoList
    todoList.appendChild(todoItem);
    todoList.classList.add("todo-list");

    // Delete button
    deleteElement.addEventListener("click", () => {
      deleteTodo(index);
    });

    // Function to handle replacing buttons
    function replaceButton(todoItem, oldButton, newButton) {
      todoItem.replaceChild(newButton, oldButton);
    }

    // Function to handle button click
    function handleButtonClick(button, otherButton) {
      if (todo.completed) {
        todo.completed = false;
        replaceButton(todoItem, button, otherButton);
        titleElement.classList.remove("checked-todo");
        descriptionElement.classList.remove("checked-todo");
        priorityElement.classList.remove("checked-todo");
        dueDateElement.classList.remove("checked-todo");
      } else {
        todo.completed = true;
        replaceButton(todoItem, button, otherButton);
        titleElement.classList.add("checked-todo");
        descriptionElement.classList.add("checked-todo");
        priorityElement.classList.add("checked-todo");
        dueDateElement.classList.add("checked-todo");
      }
      saveTodos(); // Save updated todos to localStorage
    }

    // Add event listener to the unchecked button
    uncheckedButton.addEventListener("click", () => {
      handleButtonClick(uncheckedButton, checkedButton);
    });

    // Add event listener to the checked button
    checkedButton.addEventListener("click", () => {
      handleButtonClick(checkedButton, uncheckedButton);
    });
  });
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

const todoSectionTitle = document.getElementById("todo-section-title");
const todayNav = document.getElementById("today-nav");
const weekNav = document.getElementById("week-nav");
const inboxNav = document.getElementById("inbox-nav");
const allTasksNav = document.getElementById("all-tasks-nav");

todayNav.addEventListener("click", () => {
  const todayTodos = filterToday(todos);
  todoSectionTitle.innerText = "Today";
  renderTodos(todayTodos);
});

weekNav.addEventListener("click", () => {
  const weekTodos = filterWeek(todos);
  todoSectionTitle.innerText = "This Week";
  renderTodos(weekTodos);
});

inboxNav.addEventListener("click", () => {
  todoSectionTitle.innerText = "Inbox";
  renderTodos(todos);
});

allTasksNav.addEventListener("click", () => {
  todoSectionTitle.innerText = "All Tasks";
  renderTodos(todos);
});

function filterTodosByProject(project) {
  const filteredTodos = todos.filter((todo) => todo.project === project);
  todoSectionTitle.innerText = project;
  renderTodos(filteredTodos);
}

function updateSectionTitle() {
  todoSectionTitle.innerText = "Inbox";
  renderTodos(todos);
}

export {
  addTodo,
  updateTodo,
  renderTodos,
  loadTodos,
  filterTodosByProject,
  updateSectionTitle,
};
