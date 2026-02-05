/**
 * Configuration constants for the Resume Builder application
 * Centralizes all magic strings and configuration values
 */

// Signature info (existing)
export const SIGNATURE = "kaustav ray 21";
export const COPYRIGHT_HOLDER = "Kaustav Kr. Sinha Ray";

// Resume format types
export const FORMATS = {
    GENERAL: 'general',
    COMPANY: 'company',
};

// Section types for dynamic form sections
export const SECTION_TYPES = {
    PROJECT: 'project',
    EDUCATION: 'education',
    ACHIEVEMENT: 'achievement',
    CERTIFICATION: 'certification',
    SKILL: 'skill',
    HOBBY: 'hobby',
    EXPERIENCE: 'experience',
};

// LocalStorage keys
export const STORAGE_KEYS = {
    RESUME_DATA: 'resumeBuilderData',
    PREFERENCES: 'resumeBuilderPrefs',
};

// DOM Element IDs
export const ELEMENT_IDS = {
    PREVIEW: 'preview',
    FORM_CONTAINER: 'form-container',
    PRINT_BTN: 'print-btn',
    FORMAT_TOGGLE: 'toggle-company',
    LOCATION_CONTAINER: 'location-container',
};

// CSS Classes
export const CSS_CLASSES = {
    ACTIVE: 'active',
    HIDDEN: 'hidden',
    SIDEBAR_LINK: 'sidebar-link',
    FORM_CONTENT: 'form-content',
    REMOVE_BTN: 'remove-section-btn',
};

// Default values for new sections
export const DEFAULTS = {
    EMPTY_SKILL: { name: '', details: '' },
    EMPTY_PROJECT: { title: '', date: '', tech: '', desc: [] },
    EMPTY_EDUCATION: { school: '', location: '', degree: '', dates: '', grade: '', gradeType: 'cgpa' },
    EMPTY_ACHIEVEMENT: { title: '', date: '' },
    EMPTY_CERTIFICATION: { title: '', date: '' },
    EMPTY_HOBBY: { title: '' },
    EMPTY_EXPERIENCE: { title: '', startDate: '', endDate: '', desc: [] },
};

// Debounce delay in milliseconds
export const DEBOUNCE_DELAY = 500;

// Auto-save delay in milliseconds  
export const AUTO_SAVE_DELAY = 1000;
