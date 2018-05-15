import pkg from './package.json';

import filesize from 'rollup-plugin-filesize';
import uglify from 'rollup-plugin-uglify';

const packageName = 'TemplateTemplate';
const releaseYear = 2018;
const srcFilePath = 'src/templatetemplate.js';

const filesizePluginOptions = {
  format: {
    exponent: 0,
    fullform: true
  },
  theme: 'light'
};

const preamble = `/*!
 *  ${packageName} v${pkg.version}
 *
 *  ${pkg.description}
 *
 *  Source code available at: ${pkg.homepage}
 *
 *  (c) ${releaseYear}-present ${pkg.author.name} (${pkg.author.url})
 *
 *  ${packageName} may be freely distributed under the ${pkg.license} license.
 */
`;

export default [
  // templatetemplate.es.js and templatetemplate.js
  {
    input: srcFilePath,
    output: [
      {
        file: 'dist/templatetemplate.es.js',
        format: 'es'
      },
      {
        file: 'dist/templatetemplate.js',
        format: 'umd',
        name: packageName
      }
    ],
    plugins: [
      filesize(filesizePluginOptions),
      uglify({
        compress: false,
        mangle: false,
        output: {
          beautify: true,
          indent_level: 2,
          preamble: preamble
        }
      })
    ]
  },

  // templatetemplate.min.js
  {
    input: srcFilePath,
    output: {
      file: 'dist/templatetemplate.min.js',
      format: 'umd',
      name: packageName
    },
    plugins: [
      filesize(filesizePluginOptions),
      uglify({
        output: {
          preamble: preamble
        }
      })
    ]
  }
];
