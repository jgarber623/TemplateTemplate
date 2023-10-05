import ava from '@jgarber/eslint-config/ava';
import config from '@jgarber/eslint-config';
import globals from 'globals';

export default [
  {
    ignores: ['coverage', 'dist']
  },
  ...config,
  ...ava,
  {
    files: ['src/*.js', 'test/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }
];
