import { addTodo, updateTodo } from "./todo.js";
import { updateProjectDropdown } from "./projects.js";
import unchecked from "../assets/icons/unchecked.svg";
import deleteIcon from "../assets/icons/delete.svg";

const todoContainer = document.querySelector(".todo");

function loadTodoForm(todo = null) {
  // Ensures only one form can be open at a time
  if (document.querySelector(".todo-form")) return;

  const form = document.createElement("form");
  form.className = "todo-form";

  const uncheckedButton = document.createElement("img");
  uncheckedButton.src = unchecked;
  uncheckedButton.alt = "check button";
  uncheckedButton.classList.add("unchecked-todo");

  const formElements = document.createElement("div");
  formElements.classList.add("form-elements");

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "title";
  titleInput.placeholder = "Title";
  titleInput.required = true;
  titleInput.classList.add("title-input");

  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.name = "description";
  descriptionInput.placeholder = "Description";
  descriptionInput.classList.add("description-input");

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.name = "dueDate";
  dueDateInput.placeholder = "Select Date";
  dueDateInput.classList.add("due-date-input");

  const prioritySelect = document.createElement("select");
  prioritySelect.name = "priority";

  prioritySelect.classList.add("priority-select");

  const priorityLevels = ["Low Priority", "Medium Priority", "High Priority"];
  priorityLevels.forEach((priority) => {
    const option = document.createElement("option");
    option.value = priority;
    option.textContent = priority;
    option.classList.add("priority-option");
    prioritySelect.appendChild(option);
  });

  const projectSelect = document.createElement("select");
  projectSelect.name = "project";
  projectSelect.classList.add("project-select");

  const defaultOption = document.createElement("option");
  defaultOption.value = "Inbox";
  defaultOption.textContent = "Project";
  projectSelect.appendChild(defaultOption);

  const submitTask = document.createElement("button");
  submitTask.type = "submit";
  if (todo) {
    submitTask.textContent = "Update Task";
  } else {
    submitTask.textContent = "Add Task";
  }

  submitTask.classList.add("submit-task");

  const deleteTask = document.createElement("img");
  deleteTask.src = deleteIcon;
  deleteTask.alt = "delete button";
  deleteTask.classList.add("delete-task-button");

  const formInputs = [
    titleInput,
    descriptionInput,
    prioritySelect,
    dueDateInput,
    projectSelect,
    submitTask,
  ];

  formInputs.forEach((input) => {
    formElements.appendChild(input);
  });

  form.appendChild(uncheckedButton);
  form.appendChild(formElements);
  form.appendChild(deleteTask);

  todoContainer.appendChild(form);

  // Call updateProjectDropdown to ensure the dropdown is updated
  updateProjectDropdown();

  if (todo) {
    titleInput.value = todo.title;
    descriptionInput.value = todo.description;
    dueDateInput.value = todo.dueDate;
    prioritySelect.value = todo.priority;
    projectSelect.value = todo.project || "Inbox";
    // Set a hidden input or a flag to indicate which to-do is being edited
    const editIndexInput = document.createElement("input");
    editIndexInput.type = "hidden";
    editIndexInput.id = "edit-index";
    editIndexInput.value = todo.id;
    form.appendChild(editIndexInput);
  }

  // Handle form submission
  form.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const title = titleInput.value;
      const description = descriptionInput.value;
      const dueDate = dueDateInput.value;
      const priority = prioritySelect.value;
      const project = projectSelect.value;
      const index = document.getElementById("edit-index")?.value;

      if (index) {
        updateTodo(
          parseInt(index),
          title,
          description,
          dueDate,
          priority,
          project,
        );
      } else {
        addTodo(title, description, dueDate, priority, project);
      }

      form.reset();
      form.remove(); // Remove the form from the DOM
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const description = descriptionInput.value;
    const dueDate = dueDateInput.value;
    const priority = prioritySelect.value;
    const project = projectSelect.value;

    addTodo(title, description, dueDate, priority, project);

    form.reset();
    form.remove(); // Remove the form from the DOM
  });

  deleteTask.addEventListener("click", () => {
    form.reset();
    form.remove();
  });
}

function openEditForm(todo) {
  loadTodoForm(todo);
}

export { loadTodoForm, openEditForm };
