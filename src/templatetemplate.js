(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.TemplateTemplate = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  return function(template, insertions) {
    template = template instanceof HTMLElement ? template : document.querySelector(template);
    insertions = insertions || {};

    if (template === null || !(template instanceof HTMLTemplateElement)) {
      throw new TypeError(template + ' is not an HTMLTemplateElement');
    }

    if (typeof insertions !== 'object') {
      throw new TypeError(insertions + ' is not an Object');
    }

    var importedNode = document.importNode(template.content, true);

    Object.entries(insertions).forEach(function(insertionArray) {
      var currentNode = importedNode.querySelector(insertionArray[0]),
          insertionValue = insertionArray[1];

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
  };
}));
