import { describe, it, expect } from 'vitest';
import { validateEmail, validatePhone, validateUrl, escapeHtml } from '../utils.js';

describe('Validation Utilities', () => {
    describe('validateEmail', () => {
        it('should validate correct emails', () => {
            expect(validateEmail('test@example.com')).toBe(true);
            expect(validateEmail('user.name@domain.co.uk')).toBe(true);
        });

        it('should reject invalid emails', () => {
            expect(validateEmail('test@')).toBe(false);
            expect(validateEmail('test@example')).toBe(false); // simple regex might allow this, let's check implementation
            expect(validateEmail('test')).toBe(false);
            expect(validateEmail('')).toBe(false);
            expect(validateEmail(null)).toBe(false);
        });
    });

    describe('validatePhone', () => {
        it('should validate common phone formats', () => {
            expect(validatePhone('1234567890')).toBe(true);
            expect(validatePhone('123-456-7890')).toBe(true);
            expect(validatePhone('(123) 456-7890')).toBe(true);
            expect(validatePhone('+1 123 456 7890')).toBe(true);
        });

        it('should reject invalid phone numbers', () => {
            expect(validatePhone('123')).toBe(false);
            expect(validatePhone('abcdefghij')).toBe(false);
            expect(validatePhone('')).toBe(false);
        });
    });

    describe('validateUrl', () => {
        it('should validate http/https URLs', () => {
            expect(validateUrl('https://example.com')).toBe(true);
            expect(validateUrl('http://localhost:3000')).toBe(true);
        });

        it('should reject invalid URLs', () => {
            expect(validateUrl('example.com')).toBe(false); // must have protocol
            expect(validateUrl('ftp://example.com')).toBe(false); // we restrict to http/https
            expect(validateUrl('')).toBe(false);
        });
    });
});

describe('Security Utilities', () => {
    describe('escapeHtml', () => {
        it('should escape input', () => {
            expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
            expect(escapeHtml('&')).toBe('&amp;');
            expect(escapeHtml('"')).toBe('&quot;');
            expect(escapeHtml("'")).toBe('&#39;');
        });

        it('should handle non-string input', () => {
            expect(escapeHtml(null)).toBe('');
            expect(escapeHtml(123)).toBe('123');
        });
    });
});
