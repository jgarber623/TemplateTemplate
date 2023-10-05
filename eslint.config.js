import config from '@jgarber/eslint-config';
import globals from 'globals';

import pluginAva from 'eslint-plugin-ava';

export default [
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
