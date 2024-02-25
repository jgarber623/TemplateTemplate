import assert from 'node:assert';
import test from 'node:test';

import { JSDOM } from 'jsdom';

import TemplateTemplate from '../src/templatetemplate.js';

const html = `
  <!doctype html>
  <html>
  <body>
    <template id="templ">
      <div><a></a></div>
    </template>
  </body>
  </html>
`;

test.before(() => {
  const { window } = new JSDOM(html);

  const { document, DocumentFragment, HTMLElement, HTMLTemplateElement } = window;

  Object.assign(globalThis, { document, DocumentFragment, HTMLElement, HTMLTemplateElement, window });
});

test('is a function', t => {
  assert.strictEqual(typeof TemplateTemplate, 'function');
});

test('when `template` argument is null', t => {
  assert.throws(() => TemplateTemplate(), {
    name: 'TypeError',
    message: /is not an HTMLTemplateElement$/,
  });
});

test('when `template` argument is not an HTMLTemplateElement', t => {
  assert.throws(() => TemplateTemplate(document.createElement('div')), {
    name: 'TypeError',
    message: /is not an HTMLTemplateElement$/
  });
});

test('when `template` argument references an element that does not exist', t => {
  assert.throws(() => TemplateTemplate('#foo'), {
    name: 'TypeError',
    message: /is not an HTMLTemplateElement$/
  });
});

test('when `template` argument is an HTMLElement', t => {
  const renderedTemplate = TemplateTemplate(document.querySelector('#templ'));

  assert.ok(renderedTemplate instanceof DocumentFragment);
  assert.strictEqual(renderedTemplate.querySelector('div').innerHTML, '<a></a>');
});

test('when `template` argument is a string', t => {
  const renderedTemplate = TemplateTemplate('#templ');

  assert.ok(renderedTemplate instanceof DocumentFragment);
  assert.strictEqual(renderedTemplate.querySelector('div').innerHTML, '<a></a>');
});

test('when `insertions` argument is not an object', t => {
  const template = document.createElement('template');

  const expectation = {
    name: 'TypeError',
    message: /is not an Object$/
  };

  assert.throws(() => TemplateTemplate(template, 'foo'), expectation);
  assert.throws(() => TemplateTemplate(template, null), expectation);
  assert.throws(() => TemplateTemplate(template, []), expectation);
});

test('when `insertions` argument includes a null value', t => {
  const renderedTemplate = TemplateTemplate('#templ', { div: null });

  assert.strictEqual(renderedTemplate.querySelector('div').outerHTML, '<div><a></a></div>');
});

test('when `insertions` argument includes a string value', t => {
  const renderedTemplate = TemplateTemplate('#templ', { a: 'foo' });

  assert.strictEqual(renderedTemplate.querySelector('div').innerHTML, '<a>foo</a>');
});

test('when `insertions` argument includes an array value', t => {
  const insertions = { a: ['foo', { href: 'https://example.com' }] };
  const renderedTemplate = TemplateTemplate('#templ', insertions);

  assert.strictEqual(renderedTemplate.querySelector('div').innerHTML, '<a href="https://example.com">foo</a>');
});

test('when `insertions` argument includes an array value with null text', t => {
  const insertions = { div: [null, { class: 'example' }] };
  const renderedTemplate = TemplateTemplate('#templ', insertions);

  assert.strictEqual(renderedTemplate.querySelector('div').outerHTML, '<div class="example"><a></a></div>');
});

test('when `insertions` argument includes an HTMLElement value', t => {
  const renderedTemplate = TemplateTemplate('#templ', { a: document.createElement('span') });

  assert.strictEqual(renderedTemplate.querySelector('div').innerHTML, '<a><span></span></a>');
});

test('when `insertions` argument includes a TemplateTemplate value', t => {
  const template = document.createElement('template');

  template.id = 'templ2';
  template.innerHTML = '<b></b>';

  document.body.append(template);

  const insertions = { a: TemplateTemplate('#templ2', { b: ['foo', { class: 'bar' }] }) };
  const renderedTemplate = TemplateTemplate('#templ', insertions);

  assert.strictEqual(renderedTemplate.querySelector('div').innerHTML, '<a><b class="bar">foo</b></a>');
});
