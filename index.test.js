import assert from "node:assert";
import test from "node:test";

import { JSDOM } from "jsdom";

import TemplateTemplate from "./index.js";

const html = `\
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

test("is a function", () => {
  assert.strictEqual(typeof TemplateTemplate, "function");
});

test("when `template` argument is null", () => {
  assert.throws(() => TemplateTemplate(), {
    message: /is not an HTMLTemplateElement$/,
    name: "TypeError",
  });
});

test("when `template` argument is not an HTMLTemplateElement", () => {
  assert.throws(() => TemplateTemplate(document.createElement("div")), {
    message: /is not an HTMLTemplateElement$/,
    name: "TypeError",
  });
});

test("when `template` argument references an element that does not exist", () => {
  assert.throws(() => TemplateTemplate("#foo"), {
    message: /is not an HTMLTemplateElement$/,
    name: "TypeError",
  });
});

test("when `template` argument is an HTMLElement", () => {
  const renderedTemplate = TemplateTemplate(document.querySelector("#templ"));

  assert.ok(renderedTemplate instanceof DocumentFragment);
  assert.strictEqual(renderedTemplate.querySelector("div").innerHTML, "<a></a>");
});

test("when `template` argument is a string", () => {
  const renderedTemplate = TemplateTemplate("#templ");

  assert.ok(renderedTemplate instanceof DocumentFragment);
  assert.strictEqual(renderedTemplate.querySelector("div").innerHTML, "<a></a>");
});

test("when `insertions` argument is not an object", () => {
  const template = document.createElement("template");

  const expectation = {
    message: /is not an Object$/,
    name: "TypeError",
  };

  assert.throws(() => TemplateTemplate(template, "foo"), expectation);
  assert.throws(() => TemplateTemplate(template, null), expectation);
  assert.throws(() => TemplateTemplate(template, []), expectation);
});

test("when `insertions` argument includes a null value", () => {
  const renderedTemplate = TemplateTemplate("#templ", { div: null });

  assert.strictEqual(renderedTemplate.querySelector("div").outerHTML, "<div><a></a></div>");
});

test("when `insertions` argument includes a string value", () => {
  const renderedTemplate = TemplateTemplate("#templ", { a: "foo" });

  assert.strictEqual(renderedTemplate.querySelector("div").innerHTML, "<a>foo</a>");
});

test("when `insertions` argument includes an array value", () => {
  const insertions = { a: ["foo", { href: "https://example.com" }] };
  const renderedTemplate = TemplateTemplate("#templ", insertions);

  assert.strictEqual(renderedTemplate.querySelector("div").innerHTML, `<a href="https://example.com">foo</a>`);
});

test("when `insertions` argument includes an array value with null text", () => {
  const insertions = { div: [null, { class: "example" }] };
  const renderedTemplate = TemplateTemplate("#templ", insertions);

  assert.strictEqual(renderedTemplate.querySelector("div").outerHTML, `<div class="example"><a></a></div>`);
});

test("when `insertions` argument includes an HTMLElement value", () => {
  const renderedTemplate = TemplateTemplate("#templ", { a: document.createElement("span") });

  assert.strictEqual(renderedTemplate.querySelector("div").innerHTML, "<a><span></span></a>");
});

test("when `insertions` argument includes a TemplateTemplate value", () => {
  const template = document.createElement("template");

  template.id = "templ2";
  template.innerHTML = "<b></b>";

  document.body.append(template);

  const insertions = { a: TemplateTemplate("#templ2", { b: ["foo", { class: "bar" }] }) };
  const renderedTemplate = TemplateTemplate("#templ", insertions);

  assert.strictEqual(renderedTemplate.querySelector("div").innerHTML, `<a><b class="bar">foo</b></a>`);
});
