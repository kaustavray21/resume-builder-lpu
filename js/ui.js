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

export function addSection(type, currentFormat) {
  const index = sectionCounters[type];
  const sectionHtml = generateSectionHTML(type, index);
  const containerId = `${type}s-list`;
  const container = document.getElementById(containerId);

  if (container) {
    container.insertAdjacentHTML("beforeend", sectionHtml);
    sectionCounters[type]++;
    updatePreview(currentFormat);
  }
}

export function removeSection(elementId, currentFormat) {
  const element = document.getElementById(elementId);
  if (element) {
    element.remove();
  }
  updatePreview(currentFormat);
}
