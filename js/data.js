/**
 * Data management module for Resume Builder
 * Handles form data extraction and localStorage persistence
 */

import { STORAGE_KEYS } from './config.js';

const STORAGE_KEY = STORAGE_KEYS.RESUME_DATA;

export const sectionCounters = {
  project: 0,
  education: 0,
  achievement: 0,
  certification: 0,
  skill: 0,
  hobby: 0,
  experience: 0,
};

/**
 * Safely gets an element's value by ID
 * @param {string} id - Element ID
 * @param {string} defaultValue - Default value if element not found
 * @returns {string} - Element value or default
 */
function getElementValue(id, defaultValue = '') {
  try {
    const element = document.getElementById(id);
    return element ? element.value : defaultValue;
  } catch (error) {
    console.warn(`Error getting element ${id}:`, error);
    return defaultValue;
  }
}

/**
 * Loads resume data from localStorage
 * @returns {Object|null} - Parsed resume data or null if not found/invalid
 */
export function loadDataFromLocalStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return null;
    }
    const parsed = JSON.parse(data);
    // Validate basic structure
    if (typeof parsed !== 'object' || !parsed.personal) {
      console.warn('Invalid data structure in localStorage');
      return null;
    }
    return parsed;
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    return null;
  }
}

/**
 * Saves resume data to localStorage
 * @param {Object} data - Resume data to save
 * @returns {boolean} - True if saved successfully
 */
export function saveDataToLocalStorage(data) {
  try {
    if (!data || typeof data !== 'object') {
      console.warn('Invalid data provided to save');
      return false;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
    // Handle quota exceeded error
    if (error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded');
    }
    return false;
  }
}

/**
 * Clears resume data from localStorage
 * @returns {boolean} - True if cleared successfully
 */
export function clearLocalStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
}

/**
 * Creates an array of indices for a given section type
 * @param {string} type - Section type key in sectionCounters
 * @returns {number[]} - Array of indices [0, 1, 2, ...]
 */
function getIndices(type) {
  return Array.from({ length: sectionCounters[type] }, (_, i) => i);
}

/**
 * Parses multi-line description text into array of non-empty lines
 * @param {string} text - Multi-line text
 * @returns {string[]} - Array of trimmed, non-empty lines
 */
function parseDescriptionLines(text) {
  if (!text) {
    return [];
  }
  return text.split('\n').filter(line => line.trim());
}

/**
 * Extracts all form values into a structured object
 * @returns {Object} - Complete resume data object
 */
export function getFormValues() {
  try {
    const getValue = (parent, selector) => {
      const el = parent.querySelector(selector);
      return el ? el.value : '';
    };

    const getDescLines = (parent, selector) => {
      const el = parent.querySelector(selector);
      return parseDescriptionLines(el ? el.value : '');
    };

    const values = {
      personal: {
        name: getElementValue("name"),
        email: getElementValue("email"),
        mobile: getElementValue("mobile"),
        linkedin: getElementValue("linkedin"),
        github: getElementValue("github"),
        location: getElementValue("location"),
      },

      // Extract skills via DOM order
      skills: Array.from(document.querySelectorAll('#skills-list fieldset')).map(el => ({
        name: getValue(el, '[id^="skill_name_"]'),
        details: getValue(el, '[id^="skill_details_"]'),
      })),

      // Extract experiences
      experiences: Array.from(document.querySelectorAll('#experiences-list fieldset')).map(el => ({
        title: getValue(el, '[id^="exp_title_"]'),
        startDate: getValue(el, '[id^="exp_start_date_"]'),
        endDate: getValue(el, '[id^="exp_end_date_"]'),
        desc: getDescLines(el, '[id^="exp_desc_"]'),
      })),

      // Extract projects
      projects: Array.from(document.querySelectorAll('#projects-list fieldset')).map(el => ({
        title: getValue(el, '[id^="project_title_"]'),
        date: getValue(el, '[id^="project_date_"]'),
        tech: getValue(el, '[id^="project_tech_"]'),
        desc: getDescLines(el, '[id^="project_desc_"]'),
      })),

      // Extract education
      education: Array.from(document.querySelectorAll('#educations-list fieldset')).map(el => ({
        school: getValue(el, '[id^="edu_school_"]'),
        location: getValue(el, '[id^="edu_location_"]'),
        degree: getValue(el, '[id^="edu_degree_"]'),
        dates: getValue(el, '[id^="edu_dates_"]'),
        grade: getValue(el, '[id^="edu_grade_"]'),
        gradeType: getValue(el, '[id^="edu_grade_type_"]'),
      })),

      // Extract achievements
      achievements: Array.from(document.querySelectorAll('#achievements-list fieldset')).map(el => ({
        title: getValue(el, '[id^="ach_title_"]'),
        date: getValue(el, '[id^="ach_date_"]'),
      })),

      // Extract certifications
      certifications: Array.from(document.querySelectorAll('#certifications-list fieldset')).map(el => ({
        title: getValue(el, '[id^="cert_title_"]'),
        date: getValue(el, '[id^="cert_date_"]'),
      })),

      // Extract hobbies
      hobbies: Array.from(document.querySelectorAll('#hobbies-list fieldset')).map(el => ({
        title: getValue(el, '[id^="hobby_title_"]'),
      })),
    };

    return values;
  } catch (error) {
    console.error('Error extracting form values:', error);
    // Return empty structure on error
    return {
      personal: { name: '', email: '', mobile: '', linkedin: '', github: '', location: '' },
      skills: [],
      hobbies: [],
      projects: [],
      education: [],
      achievements: [],
      certifications: [],
      experiences: [],
    };
  }
}

