import { getFormValues } from "./data.js";
import { addSection, removeSection, updatePreview } from "./ui.js";

let currentFormat = "general";

function initializeFormWithDefaultData() {
  document.getElementById("name").value = "Alex Griffin";
  document.getElementById("email").value = "alex.griffin.dev@example.com";
  document.getElementById("mobile").value = "+1 (555) 123-4567";
  document.getElementById("linkedin").value =
    "https://linkedin.com/in/alexgriffindev";
  document.getElementById("github").value = "https://github.com/alexgriffindev";
  document.getElementById("location").value = "San Francisco, CA";

  document.getElementById("languages").value =
    "JavaScript, TypeScript, Python, HTML5, CSS3";
  document.getElementById("frameworks").value =
    "React, Next.js, Node.js, Express, Tailwind CSS";
  document.getElementById("databases").value = "PostgreSQL, MongoDB, Redis";
  document.getElementById("tools").value = "Docker, Git, Webpack, Jenkins, AWS";
  document.getElementById("softskills").value =
    "Agile Methodologies, REST APIs, CI/CD, System Design";
  document.getElementById("hobbies").value =
    "Competitive Programming, 3D Printing, Urban Gardening, Espresso Brewing";

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
      if (event.target.value === "cgpa") {
        gradeInput.setAttribute("max", "10");
      } else {
        gradeInput.removeAttribute("max");
      }
    }
  });

  document.getElementById("print-btn").addEventListener("click", () => {
    window.print();
  });
}

window.onload = () => {
  initializeFormWithDefaultData();
  setupEventListeners();
};
