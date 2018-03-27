#!/usr/bin/env node

const colors = require('colors');
const exec = require('child_process').exec;
const pkg = require('../package.json');

const preamble = `/*!
 *  TemplateTemplate ${pkg.version}
 *
 *  ${pkg.description}
 *
 *  Source code available at: ${pkg.homepage}
 *
 *  (c) 2018-present ${pkg.author.name} (${pkg.author.url})
 *
 *  TemplateTemplate may be freely distributed under the ${pkg.license} license.
 */
`;

exec(`$(npm bin)/uglifyjs src/templatetemplate.js --beautify 'indent-level=2' --preamble '${preamble}' --output dist/templatetemplate.js`);
exec(`$(npm bin)/uglifyjs src/templatetemplate.js --compress --mangle --preamble '${preamble}' --output dist/templatetemplate.min.js`);

console.log(colors.green(`TemplateTemplate ${pkg.version} built successfully!`));
