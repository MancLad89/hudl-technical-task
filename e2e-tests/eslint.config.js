const { defineConfig, globalIgnores } = require('eslint/config');

const globals = require('globals');
const playwright = require('eslint-plugin-playwright');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: 'latest',
      parserOptions: {},
    },

    plugins: {
      playwright,
    },

    extends: compat.extends('eslint:recommended', 'prettier'),

    rules: {
      'playwright/missing-playwright-await': 'error',

      camelcase: [
        'error',
        {
          properties: 'never',
          allow: ['user_id', 'gone_social'],
        },
      ],

      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],

      'no-unused-vars': 'error',
      'no-useless-escape': 'off',
      'no-var': 'error',
    },
  },
  globalIgnores(['playwright-report/**/*']),
]);
