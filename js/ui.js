import { getFormValues, sectionCounters, saveDataToLocalStorage } from "./data.js";
import {
  generateGeneralHTML,
  generateCompanySpecificHTML,
  generateSectionHTML,
} from "./templates.js";
import { validateEmail, validatePhone, validateUrl, debounce } from "./utils.js";

const preview = document.getElementById("resume-preview");

// ============================================
// TOAST NOTIFICATIONS
// ============================================

// Create toast container on load
const toastContainer = document.createElement('div');
toastContainer.className = 'toast-container';
document.body.appendChild(toastContainer);

const TOAST_ICONS = {
  success: `<svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`,
  error: `<svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`,
  info: `<svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
};

/**
 * Shows a toast notification
 * @param {string} message - The message to display
 * @param {'success'|'error'|'info'} type - Toast type
 * @param {number} duration - Duration in ms (default: 3000)
 */
export function showToast(message, type = 'success', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `${TOAST_ICONS[type] || TOAST_ICONS.info}<span>${message}</span>`;

  toastContainer.appendChild(toast);

  // Auto-remove after duration
  setTimeout(() => {
    toast.classList.add('toast-hide');
    setTimeout(() => toast.remove(), 200);
  }, duration);
}

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
  let containerId;
  if (type === "hobby") {
    containerId = "hobbies-list";
  } else {
    containerId = `${type}s-list`;
  }
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

  data.skills.forEach((skill, index) => {
    addSection("skill", currentFormat, false);
    document.getElementById(`skill_name_${index}`).value = skill.name;
    document.getElementById(`skill_details_${index}`).value = skill.details;
  });

  data.hobbies.forEach((hobby, index) => {
    addSection("hobby", currentFormat, false);
    document.getElementById(`hobby_title_${index}`).value = hobby.title;
  });

  data.experiences?.forEach((exp, index) => {
    addSection("experience", currentFormat, false);
    document.getElementById(`exp_title_${index}`).value = exp.title;
    document.getElementById(`exp_start_date_${index}`).value = exp.startDate;
    document.getElementById(`exp_end_date_${index}`).value = exp.endDate;
    document.getElementById(`exp_desc_${index}`).value = exp.desc?.join("\n") || "";
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

/**
 * Sets up responsive scaling for the preview
 */
export function setupResponsivePreview() {
  const container = document.getElementById("resume-container");
  const preview = document.getElementById("resume-preview");

  if (!container || !preview) return;

  const fitPreview = () => {
    const previewBaseWidth = 816; // 8.5in at 96dpi

    // Reset to measure
    preview.style.transform = "none";
    preview.style.width = "";
    preview.style.minWidth = `${previewBaseWidth}px`;

    const containerWidth = container.clientWidth;
    const availableWidth = containerWidth - 32;

    if (availableWidth < previewBaseWidth) {
      const scale = availableWidth / previewBaseWidth;
      preview.style.transform = `scale(${scale})`;
      preview.style.transformOrigin = "top center";

      // Adjust container styles
      container.style.height = `${preview.scrollHeight * scale + 40}px`;
      container.style.width = `${availableWidth}px`;
      container.style.overflow = "hidden";
    } else {
      preview.style.transform = "none";
      preview.style.minWidth = "";
      container.style.height = "";
      container.style.width = "";
      container.style.overflow = "auto";
    }
  };

  const debouncedFit = debounce(fitPreview, 100);
  window.addEventListener("resize", debouncedFit);

  const observer = new MutationObserver(debouncedFit);
  observer.observe(preview, { childList: true, subtree: true, characterData: true });

  setTimeout(fitPreview, 100);
}

/**
 * Sets up real-time validation listeners
 */
export function setupValidationListeners() {
  const fields = [
    { id: 'email', validator: validateEmail, msg: 'Invalid email address' },
    { id: 'mobile', validator: validatePhone, msg: 'Invalid phone number' },
    { id: 'linkedin', validator: validateUrl, msg: 'Invalid URL (must start with http/https)' },
    { id: 'github', validator: validateUrl, msg: 'Invalid URL (must start with http/https)' }
  ];

  fields.forEach(({ id, validator, msg }) => {
    const input = document.getElementById(id);
    if (!input) { return; }

    // Create error message element
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.style.display = 'none'; // Initially hidden
    errorMsg.innerHTML = `<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${msg}`;
    input.parentNode.appendChild(errorMsg);

    input.addEventListener('input', () => {
      const value = input.value.trim();
      if (!value) {
        input.classList.remove('valid', 'invalid');
        errorMsg.style.display = 'none';
        return;
      }

      const isValid = validator(value);
      if (isValid) {
        input.classList.add('valid');
        input.classList.remove('invalid');
        errorMsg.style.display = 'none';
      } else {
        input.classList.add('invalid');
        input.classList.remove('valid');
        errorMsg.style.display = 'flex';
      }
    });
  });
}

/**
 * Helper to determine insert position
 */
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable-section:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

/**
 * Updates section numbering after reorder
 */
function updateSectionNumbers(container) {
  const sections = container.querySelectorAll('.draggable-section');
  sections.forEach((sec, index) => {
    const legend = sec.querySelector('legend');
    if (legend) {
      const text = legend.textContent;
      // Match "Word Number" pattern
      const match = text.match(/^([a-zA-Z\s]+)\s\d+$/);
      if (match) {
        legend.textContent = `${match[1]} ${index + 1}`;
      }
    }
  });
}

/**
 * Sets up Drag and Drop functionality
 */
export function setupDragAndDrop() {
  const formContainer = document.getElementById('form-container');
  if (!formContainer) return;

  formContainer.addEventListener('dragstart', (e) => {
    const fieldset = e.target.closest('.draggable-section');
    if (!fieldset) return;

    // Allow dragging by clicking anywhere on the section body
    fieldset.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  });

  formContainer.addEventListener('dragend', (e) => {
    const fieldset = e.target.closest('.draggable-section');
    if (fieldset) {
      fieldset.classList.remove('dragging');
      if (fieldset.parentElement) {
        updateSectionNumbers(fieldset.parentElement);
      }
    }

    // Trigger update and save
    const formatRadio = document.querySelector('input[name="format"]:checked');
    if (formatRadio) {
      updatePreview(formatRadio.value);
      const data = getFormValues();
      saveDataToLocalStorage(data);
    }
  });

  formContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    if (!dragging) return;

    // Ensure we are dragging over the correct list
    const listContainer = e.target.closest('div[id$="-list"]');
    if (!listContainer) return;
    if (listContainer !== dragging.parentElement) return;

    const afterElement = getDragAfterElement(listContainer, e.clientY);
    if (afterElement == null) {
      listContainer.appendChild(dragging);
    } else {
      listContainer.insertBefore(dragging, afterElement);
    }
  });
}
