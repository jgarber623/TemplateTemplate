export default function TemplateTemplate(template, insertions = {}) {
  template = template instanceof HTMLElement ? template : document.querySelector(template);

  if (template === null || !(template instanceof HTMLTemplateElement)) {
    throw new TypeError(`${template} is not an HTMLTemplateElement`);
  }

  if (typeof insertions !== 'object') {
    throw new TypeError(`${insertions} is not an Object`);
  }

  const importedNode = document.importNode(template.content, true);

  Object.entries(insertions).forEach(([selector, insertion]) => {
    const currentNode = importedNode.querySelector(selector);

    if (insertion instanceof Array) {
      const [textContent, attributes] = insertion;

      Object.entries(attributes).forEach(([name, value]) => {
        return currentNode.setAttribute(name, value);
      });

      insertion = textContent;
    }

    if (insertion instanceof DocumentFragment || insertion instanceof HTMLElement) {
      return currentNode.appendChild(insertion);
    }

    if (insertion !== null) {
      currentNode.textContent = insertion;
    }
  });

  return importedNode;
}
