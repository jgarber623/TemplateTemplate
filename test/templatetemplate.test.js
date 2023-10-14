import test from 'ava';
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

  const { DocumentFragment, HTMLElement, HTMLTemplateElement, document } = window;

  Object.assign(globalThis, { DocumentFragment, HTMLElement, HTMLTemplateElement, document, window });
});

test('is a function', t => {
  t.is(typeof TemplateTemplate, 'function');
});

test('when `template` argument is null', t => {
  t.throws(() => TemplateTemplate(), {
    instanceOf: TypeError,
    message: /is not an HTMLTemplateElement$/
  });
});

test('when `template` argument is not an HTMLTemplateElement', t => {
  t.throws(() => TemplateTemplate(document.createElement('div')), {
    instanceOf: TypeError,
    message: /is not an HTMLTemplateElement$/
  });
});

test('when `template` argument references an element that does not exist', t => {
  t.throws(() => TemplateTemplate('#foo'), {
    instanceOf: TypeError,
    message: /is not an HTMLTemplateElement$/
  });
});

test('when `template` argument is an HTMLElement', t => {
  const renderedTemplate = TemplateTemplate(document.querySelector('#templ'));

  t.true(renderedTemplate instanceof DocumentFragment);
  t.is(renderedTemplate.querySelector('div').innerHTML, '<a></a>');
});

test('when `template` argument is a string', t => {
  const renderedTemplate = TemplateTemplate('#templ');

  t.true(renderedTemplate instanceof DocumentFragment);
  t.is(renderedTemplate.querySelector('div').innerHTML, '<a></a>');
});

test('when `insertions` argument is not an object', t => {
  const template = document.createElement('template');

  const expectation = {
    instanceOf: TypeError,
    message: /is not an Object$/
  };

  t.throws(() => TemplateTemplate(template, 'foo'), expectation);
  t.throws(() => TemplateTemplate(template, null), expectation);
  t.throws(() => TemplateTemplate(template, []), expectation);
});

test('when `insertions` argument includes a null value', t => {
  const renderedTemplate = TemplateTemplate('#templ', { div: null });

  t.is(renderedTemplate.querySelector('div').outerHTML, '<div><a></a></div>');
});

test('when `insertions` argument includes a string value', t => {
  const renderedTemplate = TemplateTemplate('#templ', { a: 'foo' });

  t.is(renderedTemplate.querySelector('div').innerHTML, '<a>foo</a>');
});

test('when `insertions` argument includes an array value', t => {
  const insertions = { a: ['foo', { href: 'https://example.com' }] };
  const renderedTemplate = TemplateTemplate('#templ', insertions);

  t.is(renderedTemplate.querySelector('div').innerHTML, '<a href="https://example.com">foo</a>');
});

test('when `insertions` argument includes an array value with null text', t => {
  const insertions = { div: [null, { class: 'example' }] };
  const renderedTemplate = TemplateTemplate('#templ', insertions);

  t.is(renderedTemplate.querySelector('div').outerHTML, '<div class="example"><a></a></div>');
});

test('when `insertions` argument includes an HTMLElement value', t => {
  const renderedTemplate = TemplateTemplate('#templ', { a: document.createElement('span') });

  t.is(renderedTemplate.querySelector('div').innerHTML, '<a><span></span></a>');
});

test('when `insertions` argument includes a TemplateTemplate value', t => {
  const template = document.createElement('template');

  template.id = 'templ2';
  template.innerHTML = '<b></b>';

  document.body.append(template);

  const insertions = { a: TemplateTemplate('#templ2', { b: ['foo', { class: 'bar' }] }) };
  const renderedTemplate = TemplateTemplate('#templ', insertions);

  t.is(renderedTemplate.querySelector('div').innerHTML, '<a><b class="bar">foo</b></a>');
});
