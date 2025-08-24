import { getFormValues, loadDataFromLocalStorage } from "./data.js";
import {
  addSection,
  removeSection,
  updatePreview,
  populateFormWithData,
} from "./ui.js";

let currentFormat = "general";

function cgpaToPercentage(cgpa) {
  if (cgpa === "" || isNaN(cgpa)) return "";
  const percentage = parseFloat(cgpa) * 9.5;
  return percentage > 100 ? 100 : percentage.toFixed(2);
}

function percentageToCgpa(percentage) {
  if (percentage === "" || isNaN(percentage)) return "";
  const cgpa = parseFloat(percentage) / 9.5;
  return cgpa > 10 ? 10 : cgpa.toFixed(2);
}

function initializeFormWithDefaultData() {
  document.getElementById("name").value = "Alex Griffin";
  document.getElementById("email").value = "alex.griffin.dev@example.com";
  document.getElementById("mobile").value = "+1 (555) 123-4567";
  document.getElementById("linkedin").value =
    "https://linkedin.com/in/alexgriffindev";
  document.getElementById("github").value = "https://github.com/alexgriffindev";
  document.getElementById("location").value = "San Francisco, CA";

  addSection("skill", currentFormat);
  document.getElementById("skill_name_0").value = "Languages";
  document.getElementById("skill_details_0").value =
    "JavaScript, TypeScript, Python, HTML5, CSS3";

  addSection("skill", currentFormat);
  document.getElementById("skill_name_1").value = "Frameworks/Libraries";
  document.getElementById("skill_details_1").value =
    "React, Next.js, Node.js, Express, Tailwind CSS";

  addSection("skill", currentFormat);
  document.getElementById("skill_name_2").value = "Databases";
  document.getElementById("skill_details_2").value =
    "PostgreSQL, MongoDB, Redis";

  addSection("skill", currentFormat);
  document.getElementById("skill_name_3").value = "Tools";
  document.getElementById("skill_details_3").value =
    "Docker, Git, Webpack, Jenkins, AWS";

  addSection("skill", currentFormat);
  document.getElementById("skill_name_4").value = "Other Skills";
  document.getElementById("skill_details_4").value =
    "Agile Methodologies, REST APIs, CI/CD, System Design";

  addSection("hobby", currentFormat);
  document.getElementById("hobby_title_0").value = "Competitive Programming";
  addSection("hobby", currentFormat);
  document.getElementById("hobby_title_1").value = "3D Printing";
  addSection("hobby", currentFormat);
  document.getElementById("hobby_title_2").value = "Urban Gardening";
  addSection("hobby", currentFormat);
  document.getElementById("hobby_title_3").value = "Espresso Brewing";

  addSection("project", currentFormat);
  document.getElementById("project_title_0").value =
    "Zenith - Real-Time Collaboration Platform";
  document.getElementById("project_date_0").value = "June 2025";
  document.getElementById("project_tech_0").value =
    "React, TypeScript, Node.js, WebSockets, PostgreSQL";
  document.getElementById("project_desc_0").value =
    "Developed a web-based platform for team collaboration featuring shared whiteboards.\nImplemented WebSocket connections for instant updates and collaborative features.";

  addSection("project", currentFormat);
  document.getElementById("project_title_1").value =
    "Insightify - Data Visualization Dashboard";
  document.getElementById("project_date_1").value = "December 2024";
  document.getElementById("project_tech_1").value =
    "Next.js, D3.js, Tailwind CSS, Python (Flask)";
  document.getElementById("project_desc_1").value =
    "Created a dynamic dashboard for visualizing complex business metrics with interactive charts.\nBuilt a RESTful API with Flask to serve data to the Next.js front-end.";

  addSection("education", currentFormat);
  document.getElementById("edu_school_0").value = "Golden Gate University";
  document.getElementById("edu_location_0").value = "San Francisco, CA";
  document.getElementById("edu_degree_0").value =
    "Master of Science in Information Systems";
  document.getElementById("edu_dates_0").value = "2023 – 2025";
  document.getElementById("edu_grade_type_0").value = "cgpa";
  document.getElementById("edu_grade_0").value = "3.8";

  addSection("education", currentFormat);
  document.getElementById("edu_school_1").value =
    "University of California, Berkeley";
  document.getElementById("edu_location_1").value = "Berkeley, CA";
  document.getElementById("edu_degree_1").value =
    "Bachelor of Arts in Computer Science";
  document.getElementById("edu_dates_1").value = "2019 – 2023";
  document.getElementById("edu_grade_type_1").value = "cgpa";
  document.getElementById("edu_grade_1").value = "3.9";

  addSection("certification", currentFormat);
  document.getElementById("cert_title_0").value =
    "AWS Certified Solutions Architect - Associate";
  document.getElementById("cert_date_0").value = "July 2025";

  addSection("certification", currentFormat);
  document.getElementById("cert_title_1").value =
    "Certified Kubernetes Application Developer (CKAD)";
  document.getElementById("cert_date_1").value = "January 2025";

  updatePreview(currentFormat);
}

function setupEventListeners() {
  const locationContainer = document.getElementById("location-container");

  document
    .getElementById("resume-form")
    .addEventListener("keyup", () => updatePreview(currentFormat));
  document
    .getElementById("resume-form")
    .addEventListener("change", () => updatePreview(currentFormat));

  document
    .querySelectorAll('.format-toggle input[name="format"]')
    .forEach((radio) => {
      radio.addEventListener("change", (event) => {
        currentFormat = event.target.value;
        if (currentFormat === "company") {
          locationContainer.style.display = "block";
        } else {
          locationContainer.style.display = "none";
        }
        updatePreview(currentFormat);
      });
    });

  document.querySelectorAll(".sidebar-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const currentActiveLink = document.querySelector(".sidebar-link.active");
      if (currentActiveLink) {
        currentActiveLink.classList.remove("active");
      }
      link.classList.add("active");

      const currentActiveContent = document.querySelector(
        ".form-content.active"
      );
      if (currentActiveContent) {
        currentActiveContent.classList.remove("active");
      }
      const targetId = link.getAttribute("href").substring(1);
      document.getElementById(targetId).classList.add("active");
    });
  });

  document
    .getElementById("add-skill-btn")
    .addEventListener("click", () => addSection("skill", currentFormat));
  document
    .getElementById("add-project-btn")
    .addEventListener("click", () => addSection("project", currentFormat));
  document
    .getElementById("add-education-btn")
    .addEventListener("click", () => addSection("education", currentFormat));
  document
    .getElementById("add-achievement-btn")
    .addEventListener("click", () => addSection("achievement", currentFormat));
  document
    .getElementById("add-certification-btn")
    .addEventListener("click", () =>
      addSection("certification", currentFormat)
    );
  document
    .getElementById("add-hobby-btn")
    .addEventListener("click", () => addSection("hobby", currentFormat));

  document.addEventListener("click", (event) => {
    const removeBtn = event.target.closest(".remove-section-btn");
    if (removeBtn) {
      const elementId = removeBtn.dataset.target;
      removeSection(elementId, currentFormat);
    }
  });

  document.addEventListener("change", (event) => {
    if (event.target.id.startsWith("edu_grade_type_")) {
      const index = event.target.id.split("_").pop();
      const gradeInput = document.getElementById(`edu_grade_${index}`);
      const gradeValue = gradeInput.value;

      if (event.target.value === "cgpa") {
        gradeInput.setAttribute("max", "10");
        gradeInput.value = percentageToCgpa(gradeValue);
      } else {
        gradeInput.removeAttribute("max");
        gradeInput.value = cgpaToPercentage(gradeValue);
      }
      updatePreview(currentFormat);
    }
  });

  document.getElementById("print-btn").addEventListener("click", () => {
    window.print();
  });
}

window.onload = () => {
  // Set initial state of location field
  const locationContainer = document.getElementById("location-container");
  if (document.getElementById("toggle-company").checked) {
    locationContainer.style.display = "block";
  } else {
    locationContainer.style.display = "none";
  }

  const savedData = loadDataFromLocalStorage();
  if (savedData) {
    populateFormWithData(savedData, currentFormat);
  } else {
    initializeFormWithDefaultData();
  }
  setupEventListeners();
};
