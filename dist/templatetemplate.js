/**
 * @name TemplateTemplate
 * @version 1.0.4
 *
 * @file A very small JavaScript <template> manipulation library.
 *
 * {@link https://github.com/jgarber623/TemplateTemplate}
 *
 * @copyright 2018-2023 Jason Garber (https://sixtwothree.org)
 * @license MIT
 */
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, 
  global.TemplateTemplate = factory());
})(this, (function() {
  "use strict";
  function TemplateTemplate(template, insertions = {}) {
    template = template instanceof HTMLElement ? template : document.querySelector(template);
    if (template === null || !(template instanceof HTMLTemplateElement)) {
      throw new TypeError(`${template} is not an HTMLTemplateElement`);
    }
    if (typeof insertions !== "object") {
      throw new TypeError(`${insertions} is not an Object`);
    }
    const importedNode = document.importNode(template.content, true);
    Object.entries(insertions).forEach((([selector, insertion]) => {
      const currentNode = importedNode.querySelector(selector);
      if (insertion instanceof Array) {
        const [textContent, attributes] = insertion;
        Object.entries(attributes).forEach((([name, value]) => currentNode.setAttribute(name, value)));
        insertion = textContent;
      }
      if (insertion instanceof DocumentFragment || insertion instanceof HTMLElement) {
        return currentNode.appendChild(insertion);
      }
      currentNode.textContent = insertion;
    }));
    return importedNode;
  }
  return TemplateTemplate;
}));
