/*!
 *  TemplateTemplate v1.0.1
 *
 *  A very small JavaScript <template> manipulation library.
 *
 *  Source code available at: https://github.com/jgarber623/TemplateTemplate
 *
 *  (c) 2018-present Jason Garber (https://sixtwothree.org)
 *
 *  TemplateTemplate may be freely distributed under the MIT license.
 */
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
    return currentNode.textContent = insertion;
  }));
  return importedNode;
}

export { TemplateTemplate as default };
