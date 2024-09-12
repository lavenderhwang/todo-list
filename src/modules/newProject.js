import { addProject } from "./projects.js";
import deleteIcon from "../assets/icons/delete.svg";

const projectContainer = document.querySelector(".projects");

function loadProjectForm() {
  if (document.querySelector(".project-form")) return;

  const form = document.createElement("form");
  form.className = "project-form";

  const projectListItem = document.createElement("div");
  projectListItem.className = "project-list-item";

  const hashIcon = document.createElement("p");
  hashIcon.textContent = "#";
  hashIcon.classList.add("hash-icon");

  const projectInput = document.createElement("input");
  projectInput.type = "text";
  projectInput.name = "title";
  projectInput.placeholder = "New Project";
  projectInput.required = true;
  projectInput.classList.add("project-input");

  const submitProject = document.createElement("button");
  submitProject.type = "submit";
  submitProject.textContent = "Add Project";
  submitProject.classList.add("submit-project");

  const deleteProject = document.createElement("img");
  deleteProject.src = deleteIcon;
  deleteProject.alt = "delete button";
  deleteProject.classList.add("delete-project-button");

  projectListItem.appendChild(hashIcon);
  projectListItem.appendChild(projectInput);
  projectListItem.appendChild(deleteProject);

  form.appendChild(projectListItem);
  form.appendChild(submitProject);

  projectContainer.appendChild(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = projectInput.value;
    if (title) {
      addProject(title);
      form.reset();
      form.remove(); // Remove the form from the DOM
    }
  });

  deleteProject.addEventListener("click", () => {
    form.reset();
    form.remove();
  });
}

export { loadProjectForm };
