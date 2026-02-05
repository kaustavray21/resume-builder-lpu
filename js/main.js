import { getFormValues, loadDataFromLocalStorage, saveDataToLocalStorage } from "./data.js";
import {
  addSection,
  removeSection,
  updatePreview,
  populateFormWithData,
  showToast,
  setupValidationListeners,
  setupResponsivePreview,
  setupDragAndDrop,
} from "./ui.js";
import { debounce } from "./utils.js";
import { AUTO_SAVE_DELAY } from "./config.js";
import { DEFAULT_RESUME_DATA } from "./defaultData.js";

let currentFormat = "general";

// Create debounced auto-save function
const debouncedAutoSave = debounce(() => {
  const data = getFormValues();
  const saved = saveDataToLocalStorage(data);
  if (saved) {
    showToast('Resume saved', 'success', 2000);
  }
}, AUTO_SAVE_DELAY);

function cgpaToPercentage(cgpa) {
  if (cgpa === "" || isNaN(cgpa)) { return ""; }
  const percentage = parseFloat(cgpa) * 9.5;
  return percentage > 100 ? 100 : percentage.toFixed(2);
}

function percentageToCgpa(percentage) {
  if (percentage === "" || isNaN(percentage)) { return ""; }
  const cgpa = parseFloat(percentage) / 9.5;
  return cgpa > 10 ? 10 : cgpa.toFixed(2);
}

function initializeFormWithDefaultData() {
  populateFormWithData(DEFAULT_RESUME_DATA, currentFormat);
  updatePreview(currentFormat);
}

function setupEventListeners() {
  const locationContainer = document.getElementById("location-container");

  document
    .getElementById("resume-form")
    .addEventListener("keyup", () => {
      updatePreview(currentFormat);
      debouncedAutoSave();
    });
  document
    .getElementById("resume-form")
    .addEventListener("change", () => {
      updatePreview(currentFormat);
      debouncedAutoSave();
    });

  const experienceLink = document.querySelector('a[href="#experience"]');
  const hobbiesLink = document.querySelector('a[href="#hobbies"]');

  document
    .querySelectorAll('.format-toggle input[name="format"]')
    .forEach((radio) => {
      radio.addEventListener("change", (event) => {
        currentFormat = event.target.value;
        if (currentFormat === "company") {
          locationContainer.style.display = "block";
          experienceLink.style.display = "flex";
          hobbiesLink.style.display = "none";
        } else {
          locationContainer.style.display = "none";
          experienceLink.style.display = "none";
          hobbiesLink.style.display = "flex";
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
  document
    .getElementById("add-experience-btn")
    .addEventListener("click", () => addSection("experience", currentFormat));

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
    const element = document.getElementById("resume-preview");
    const name = document.getElementById("name").value || "Resume";

    showToast('Generating PDF...', 'info', 2000);

    const opt = {
      margin: 0,
      filename: `${name.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: {
        unit: 'in',
        format: 'letter',
        orientation: 'portrait'
      }
    };

    // eslint-disable-next-line no-undef
    html2pdf().set(opt).from(element).save().then(() => {
      showToast('PDF downloaded successfully!', 'success');
    }).catch(() => {
      showToast('Failed to generate PDF', 'error');
    });
  });

  // Clear form button
  document.getElementById("clear-btn").addEventListener("click", () => {
    if (confirm('Are you sure you want to clear all form data? This cannot be undone.')) {
      // Clear localStorage
      localStorage.removeItem('resumeBuilderData');
      showToast('Form cleared', 'success');
      // Reload page to reset form
      setTimeout(() => location.reload(), 500);
    }
  });

  // Export JSON
  document.getElementById("export-json-btn").addEventListener("click", () => {
    const data = getFormValues();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    const downloadAnchorNode = document.createElement('a');
    const name = document.getElementById("name").value || "Resume";

    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${name.replace(/\s+/g, '_')}_backup.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();

    showToast('Backup exported successfully', 'success');
  });

  // Import JSON trigger
  document.getElementById("import-json-btn").addEventListener("click", () => {
    document.getElementById("import-file").click();
  });

  // Import File Handler
  document.getElementById("import-file").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) { return; }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);

        // Basic validation
        if (!importedData.personal || !importedData.skills) {
          throw new Error("Invalid resume data");
        }

        saveDataToLocalStorage(importedData);
        showToast('Resume data imported', 'success');

        // Reload to apply changes cleanly
        setTimeout(() => location.reload(), 500);
      } catch (error) {
        showToast('Invalid JSON file', 'error');
        console.error("Import error:", error);
      }
    };
    reader.readAsText(file);
  });


}

window.onload = () => {
  // Set initial state of location field and format-specific sections
  const locationContainer = document.getElementById("location-container");
  const experienceLink = document.querySelector('a[href="#experience"]');
  const hobbiesLink = document.querySelector('a[href="#hobbies"]');

  if (document.getElementById("toggle-company").checked) {
    locationContainer.style.display = "block";
    experienceLink.style.display = "flex";
    hobbiesLink.style.display = "none";
  } else {
    locationContainer.style.display = "none";
    experienceLink.style.display = "none";
    hobbiesLink.style.display = "flex";
  }

  const savedData = loadDataFromLocalStorage();
  if (savedData) {
    populateFormWithData(savedData, currentFormat);
  } else {
    initializeFormWithDefaultData();
  }
  setupEventListeners();
  setupValidationListeners();
  setupResponsivePreview();
  setupDragAndDrop();
};
