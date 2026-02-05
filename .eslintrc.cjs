module.exports = {
    env: {
        browser: true,
        es2022: true,
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        // Best Practices
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'prefer-const': 'error',
        'no-var': 'error',

        // Code Style
        'eqeqeq': ['error', 'always'],
        'curly': ['error', 'all'],
        'no-console': ['warn', { allow: ['warn', 'error'] }],

        // ES6+
        'arrow-body-style': ['error', 'as-needed'],
        'prefer-arrow-callback': 'error',
        'prefer-template': 'error',

        // Formatting (handled by Prettier, disable conflicting rules)
        'indent': 'off',
        'quotes': 'off',
        'semi': 'off',
    },
};
