import { readFileSync } from 'node:fs';

import terser from '@rollup/plugin-terser';

const pkg = JSON.parse(readFileSync('./package.json'));

const input = './src/templatetemplate.mjs';
const name = 'TemplateTemplate';

const banner = `/**
 * @name ${name}
 * @version ${pkg.version}
 *
 * @file ${pkg.description}
 *
 * {@link ${pkg.homepage}}
 *
 * @copyright 2018-${new Date().getFullYear()} ${pkg.author.name} (${pkg.author.url})
 * @license ${pkg.license}
 */
`;

const terserConfig = {
  compress: false,
  mangle: false,
  output: {
    beautify: true,
    indent_level: 2
  }
};

export default [
  {
    input,
    output: {
      banner,
      file: pkg.module,
      format: 'es'
    },
    plugins: [terser(terserConfig)]
  },
  {
    input,
    output: {
      banner,
      file: pkg.main,
      format: 'umd',
      name
    },
    plugins: [terser(terserConfig)]
  },
  {
    input,
    output: {
      banner,
      file: pkg.browser,
      format: 'umd',
      name
    },
    plugins: [terser()]
  }
];
