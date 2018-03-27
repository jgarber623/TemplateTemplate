/*!
 *  TemplateTemplate 0.1.3
 *
 *  A very small JavaScript <template> manipulation library.
 *
 *  Source code available at: https://github.com/jgarber623/TemplateTemplate
 *
 *  (c) 2018-present Jason Garber (https://sixtwothree.org)
 *
 *  TemplateTemplate may be freely distributed under the MIT license.
 */

(function(root, factory) {
  root.TemplateTemplate = factory();
})(this, function() {
  return function(template, insertions) {
    template = template instanceof HTMLElement ? template : document.querySelector(template);
    insertions = insertions || {};
    if (template instanceof HTMLTemplateElement) {
      var importedNode = document.importNode(template.content, true);
      Object.entries(insertions).forEach(function(insertionArray) {
        var currentNode = importedNode.querySelector(insertionArray[0]), insertionValue = insertionArray[1];
        if (insertionValue instanceof Array) {
          Object.entries(insertionValue[1]).forEach(function(attributesArray) {
            currentNode.setAttribute(attributesArray[0], attributesArray[1]);
          });
          insertionValue = insertionValue[0];
        }
        if (insertionValue instanceof DocumentFragment || insertionValue instanceof HTMLElement) {
          currentNode.appendChild(insertionValue);
        } else {
          currentNode.textContent = insertionValue;
        }
      });
      return importedNode;
    } else {
      throw new TypeError(template.constructor.name + " is not an HTMLTemplateElement.");
    }
  };
});