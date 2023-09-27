const config = require('@jgarber/eslint-config');
const globals = require('globals');

module.exports = [
  ...config,
  {
    ignores: ['dist']
  },
  {
    files: ['src/**/*.?(m)js'],
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    files: ['spec/**/*[sS]pec.?(m)js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jasmine
      }
    }
  }
];
