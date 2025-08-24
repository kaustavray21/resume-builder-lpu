import { getFormValues, sectionCounters } from "./data.js";
import {
  generateGeneralHTML,
  generateCompanySpecificHTML,
  generateSectionHTML,
} from "./templates.js";

const preview = document.getElementById("resume-preview");

export function updatePreview(format = "general") {
  const data = getFormValues();
  if (format === "company") {
    preview.innerHTML = generateCompanySpecificHTML(data);
    preview.classList.add("format-company");
    preview.classList.remove("format-general");
  } else {
    preview.innerHTML = generateGeneralHTML(data);
    preview.classList.add("format-general");
    preview.classList.remove("format-company");
  }
}

export function addSection(type, currentFormat, update = true) {
  const index = sectionCounters[type];
  const sectionHtml = generateSectionHTML(type, index);
  const containerId = `${type}s-list`;
  const container = document.getElementById(containerId);

  if (container) {
    container.insertAdjacentHTML("beforeend", sectionHtml);
    sectionCounters[type]++;
    if (update) {
      updatePreview(currentFormat);
    }
  }
}

export function removeSection(elementId, currentFormat) {
  const element = document.getElementById(elementId);
  if (element) {
    element.remove();
  }
  updatePreview(currentFormat);
}

export function populateFormWithData(data, currentFormat) {
  document.getElementById("name").value = data.personal.name || "";
  document.getElementById("email").value = data.personal.email || "";
  document.getElementById("mobile").value = data.personal.mobile || "";
  document.getElementById("linkedin").value = data.personal.linkedin || "";
  document.getElementById("github").value = data.personal.github || "";
  document.getElementById("location").value = data.personal.location || "";
  document.getElementById("hobbies-input").value = data.hobbies || "";
  document.getElementById("include_hobbies").checked = !!data.hobbies;

  data.skills.forEach((skill, index) => {
    addSection("skill", currentFormat, false);
    document.getElementById(`skill_name_${index}`).value = skill.name;
    document.getElementById(`skill_details_${index}`).value = skill.details;
  });

  data.projects.forEach((project, index) => {
    addSection("project", currentFormat, false);
    document.getElementById(`project_title_${index}`).value = project.title;
    document.getElementById(`project_date_${index}`).value = project.date;
    document.getElementById(`project_tech_${index}`).value = project.tech;
    document.getElementById(`project_desc_${index}`).value =
      project.desc.join("\n");
  });

  data.education.forEach((edu, index) => {
    addSection("education", currentFormat, false);
    document.getElementById(`edu_school_${index}`).value = edu.school;
    document.getElementById(`edu_location_${index}`).value = edu.location;
    document.getElementById(`edu_degree_${index}`).value = edu.degree;
    document.getElementById(`edu_dates_${index}`).value = edu.dates;
    document.getElementById(`edu_grade_${index}`).value = edu.grade;
    document.getElementById(`edu_grade_type_${index}`).value = edu.gradeType;
  });

  data.achievements.forEach((ach, index) => {
    addSection("achievement", currentFormat, false);
    document.getElementById(`ach_title_${index}`).value = ach.title;
    document.getElementById(`ach_date_${index}`).value = ach.date;
  });

  data.certifications.forEach((cert, index) => {
    addSection("certification", currentFormat, false);
    document.getElementById(`cert_title_${index}`).value = cert.title;
    document.getElementById(`cert_date_${index}`).value = cert.date;
  });

  updatePreview(currentFormat);
}
