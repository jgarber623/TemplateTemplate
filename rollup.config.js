import { readFileSync } from 'node:fs';

import terser from '@rollup/plugin-terser';

const package_ = JSON.parse(readFileSync('./package.json'));

const input = './src/templatetemplate.js';
const name = 'TemplateTemplate';

const banner = `/**
 * @name ${name}
 * @version ${package_.version}
 *
 * @file ${package_.description}
 *
 * {@link ${package_.homepage}}
 *
 * @copyright 2018-${new Date().getFullYear()} ${package_.author.name} (${package_.author.url})
 * @license ${package_.license}
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
      file: package_.exports.import,
      format: 'es'
    },
    plugins: [terser(terserConfig)]
  },
  {
    input,
    output: {
      banner,
      file: package_.exports.require,
      format: 'cjs'
    },
    plugins: [terser(terserConfig)]
  },
  {
    input,
    output: {
      banner,
      file: package_.browser,
      format: 'iife',
      name
    },
    plugins: [terser()]
  }
];
