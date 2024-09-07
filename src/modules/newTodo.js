const todoContainer = document.querySelector(".todo");

function loadTodoForm() {
  const form = document.createElement("form");
  form.className = "todo-form";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "title";
  titleInput.placeholder = "Title";
  titleInput.required = true;

  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.name = "description";
  descriptionInput.placeholder = "Description";

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.name = "dueDate";
  dueDateInput.placeholder = "Select Date";

  const prioritySelect = document.createElement("select");
  prioritySelect.name = "priority";
  const priorityLevels = ["Low", "Medium", "High"];
  priorityLevels.forEach((priority) => {
    const option = document.createElement("option");
    option.value = priority;
    option.textContent = priority;
    prioritySelect.appendChild(option);
  });

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Add Task";

  const formInputs = [
    titleInput,
    descriptionInput,
    dueDateInput,
    prioritySelect,
    submitButton,
  ];

  formInputs.forEach((input) => {
    form.appendChild(input);
  });

  todoContainer.appendChild(form);
}

export { loadTodoForm };
