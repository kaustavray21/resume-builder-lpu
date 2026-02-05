/**
 * Utility functions for the Resume Builder application
 * Provides security, validation, and helper functions
 */

/**
 * Escapes HTML special characters to prevent XSS attacks
 * @param {string} text - The text to escape
 * @returns {string} - The escaped text safe for HTML insertion
 */
export function escapeHtml(text) {
    if (text === null || text === undefined) {
        return '';
    }

    const str = String(text);
    const htmlEntities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    };

    return str.replace(/[&<>"']/g, (char) => htmlEntities[char]);
}

/**
 * Sanitizes a URL to prevent javascript: and data: protocol attacks
 * @param {string} url - The URL to sanitize
 * @returns {string} - The sanitized URL or empty string if invalid
 */
export function sanitizeUrl(url) {
    if (!url || typeof url !== 'string') {
        return '';
    }

    const trimmedUrl = url.trim();

    // Block dangerous protocols
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:'];
    const lowerUrl = trimmedUrl.toLowerCase();

    for (const protocol of dangerousProtocols) {
        if (lowerUrl.startsWith(protocol)) {
            return '';
        }
    }

    return trimmedUrl;
}

/**
 * Escapes an array of strings
 * @param {string[]} arr - Array of strings to escape
 * @returns {string[]} - Array of escaped strings
 */
export function escapeHtmlArray(arr) {
    if (!Array.isArray(arr)) {
        return [];
    }
    return arr.map(item => escapeHtml(item));
}

// ============================================
// TIMING UTILITIES
// ============================================

/**
 * Creates a debounced version of a function
 * @param {Function} func - The function to debounce
 * @param {number} wait - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait = 300) {
    let timeoutId = null;

    const debouncedFn = function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
            timeoutId = null;
        }, wait);
    };

    // Allow canceling the debounced call
    debouncedFn.cancel = function () {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    };

    return debouncedFn;
}

/**
 * Creates a throttled version of a function
 * @param {Function} func - The function to throttle
 * @param {number} limit - Minimum time between calls in milliseconds
 * @returns {Function} - Throttled function
 */
export function throttle(func, limit = 100) {
    let inThrottle = false;

    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

// ============================================
// INPUT VALIDATION FUNCTIONS
// ============================================

/**
 * Validates an email address format
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid email format
 */
export function validateEmail(email) {
    if (!email || typeof email !== 'string') {
        return false;
    }
    // RFC 5322 compliant email regex (simplified)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

/**
 * Validates a phone number format (allows various formats)
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - True if valid phone format
 */
export function validatePhone(phone) {
    if (!phone || typeof phone !== 'string') {
        return false;
    }
    // Allow: digits, spaces, dashes, parentheses, plus sign
    // Must have at least 7 digits
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}

/**
 * Validates a URL format
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if valid URL format
 */
export function validateUrl(url) {
    if (!url || typeof url !== 'string') {
        return false;
    }
    try {
        const parsed = new URL(url.trim());
        return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
        return false;
    }
}

/**
 * Checks if a value is not empty (after trimming whitespace)
 * @param {string} value - The value to check
 * @returns {boolean} - True if not empty
 */
export function isNotEmpty(value) {
    if (value === null || value === undefined) {
        return false;
    }
    return String(value).trim().length > 0;
}

/**
 * Validates multiple required fields
 * @param {Object} fields - Object with field names as keys and values to validate
 * @returns {Object} - Object with 'valid' boolean and 'errors' array
 */
export function validateRequired(fields) {
    const errors = [];

    for (const [fieldName, value] of Object.entries(fields)) {
        if (!isNotEmpty(value)) {
            errors.push(`${fieldName} is required`);
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Validates a complete form data object
 * @param {Object} data - The form data to validate
 * @returns {Object} - Object with 'valid' boolean and 'errors' array
 */
export function validateFormData(data) {
    const errors = [];

    // Validate personal info
    if (!isNotEmpty(data.personal?.name)) {
        errors.push('Name is required');
    }
    if (data.personal?.email && !validateEmail(data.personal.email)) {
        errors.push('Invalid email format');
    }
    if (data.personal?.mobile && !validatePhone(data.personal.mobile)) {
        errors.push('Invalid phone number format');
    }
    if (data.personal?.linkedin && !validateUrl(data.personal.linkedin)) {
        errors.push('Invalid LinkedIn URL');
    }
    if (data.personal?.github && !validateUrl(data.personal.github)) {
        errors.push('Invalid GitHub URL');
    }

    return {
        valid: errors.length === 0,
        errors
    };
}
