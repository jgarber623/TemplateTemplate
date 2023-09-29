const config = require('@jgarber/eslint-config');
const globals = require('globals');

const pluginAva = require('eslint-plugin-ava');

module.exports = [
  ...config,
  {
    ignores: ['dist']
  },
  {
    files: ['src/**/*.?(m)js'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },
  {
    files: ['test/**/*.?(m)js'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      ava: pluginAva
    },
    rules: pluginAva.configs.recommended.rules
  }
];
