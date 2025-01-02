/**
 * @param {(HTMLTemplateElement|string)} template An HTML `<template>` element
 *     or a string representing a valid CSS selector referencing an HTML
 *     `<template>` element.
 * @param {object} insertions An object whose keys are strings representing
 *    valid CSS selectors and whose values are strings, arrays, or instances of
 *    TemplateTemplate.
 * @returns {DocumentFragment} The rendered HTMLTemplateElement.
 * @throws {TypeError} Argument must be a string or an HTMLTemplateElement.
 * @throws {TypeError} Argument must be an object.
 */
export default function TemplateTemplate(template, insertions = {}) {
  template = template instanceof HTMLElement ? template : document.querySelector(template);

  if (template === null || !(template instanceof HTMLTemplateElement)) {
    throw new TypeError(`${template} is not an HTMLTemplateElement`);
  }

  if (typeof insertions !== "object" || insertions === null || Array.isArray(insertions)) {
    throw new TypeError(`${insertions} is not an Object`);
  }

  const importedNode = document.importNode(template.content, true);

  for (let [selector, insertion] of Object.entries(insertions)) {
    const currentNode = importedNode.querySelector(selector);

    if (Array.isArray(insertion)) {
      const [textContent, attributes] = insertion;

      for (const [name, value] of Object.entries(attributes)) {
        currentNode.setAttribute(name, value);
      }

      insertion = textContent;
    }

    if (insertion instanceof DocumentFragment || insertion instanceof HTMLElement) {
      currentNode.append(insertion);
    } else if (insertion !== null) {
      currentNode.textContent = insertion;
    }
  }

  return importedNode;
}
