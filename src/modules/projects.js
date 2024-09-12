import { filterTodosByProject, updateSectionTitle } from "./todo.js";
import deleteIcon from "../assets/icons/delete.svg";

let projects = [];

// Load saved projects from localStorage
function loadProjects() {
  const savedProjects = localStorage.getItem("projects");
  if (savedProjects) {
    projects = JSON.parse(savedProjects);
    renderProjects();
  }
}

// Save projects to localStorage
function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

// Add new project
function addProject(title) {
  projects.push({ title });
  saveProjects();
  renderProjects();
  updateProjectDropdown();
}

function deleteProject(projectTitle) {
  projects = projects.filter((project) => project.title !== projectTitle);
  saveProjects();
  renderProjects();
  updateProjectDropdown();
}

// Render projects in the project section
function renderProjects() {
  if (projects.length === 0) {
    updateSectionTitle();
  }
  const projectList = document.querySelector(".projects");
  projectList.innerHTML = ""; // Clear existing projects

  projects.forEach((project) => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");

    const hashIcon = document.createElement("span");
    hashIcon.textContent = "#";
    hashIcon.classList.add("hash-icon");

    const projectTitle = document.createElement("span");
    projectTitle.textContent = project.title;
    projectTitle.classList.add("project-title");

    const deleteButton = document.createElement("img");
    deleteButton.src = deleteIcon;
    deleteButton.alt = "delete button";
    deleteButton.classList.add("delete-project-button");
    deleteButton.addEventListener("click", () => {
      deleteProject(project.title);
    });

    projectItem.appendChild(hashIcon);
    projectItem.append(projectTitle);
    projectItem.appendChild(deleteButton);

    projectItem.addEventListener("click", () => {
      filterTodosByProject(project.title);
    });

    projectList.appendChild(projectItem);
  });

  // Also update the project dropdown in the todo form
  updateProjectDropdown();
}

// Function to update the project dropdown in the todo form
function updateProjectDropdown() {
  const projectSelect = document.querySelector(".project-select");

  if (projectSelect) {
    projectSelect.innerHTML = ""; // Clear existing options

    // Add default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "Project";
    defaultOption.textContent = "Project";
    projectSelect.appendChild(defaultOption);

    projects.forEach((project) => {
      const option = document.createElement("option");
      option.value = project.title;
      option.textContent = project.title;
      projectSelect.appendChild(option);
    });
  } else {
    console.warn("Project select dropdown not found.");
  }
}

export { loadProjects, addProject, saveProjects, updateProjectDropdown };
