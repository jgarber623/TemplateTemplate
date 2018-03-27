#!/usr/bin/env node

const cliTable = require('cli-table');
const commaNumber = require('comma-number');
const fs = require('fs');
const gzipSize = require('gzip-size');

const table = new cliTable({
  style: {
    head: ['cyan']
  }
});

table.push(
  { 'Uncompressed': `${commaNumber(fs.statSync('dist/templatetemplate.js').size)} bytes` },
  { 'Minified': `${commaNumber(fs.statSync('dist/templatetemplate.min.js').size)} bytes` },
  { 'Minified + gzipped': `${commaNumber(gzipSize.sync(fs.readFileSync('dist/templatetemplate.min.js')))} bytes` }
);

console.log(table.toString());