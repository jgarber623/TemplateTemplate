/*!
 *  TemplateTemplate 0.1.0
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
  "use strict";
  return function(template, insertions) {
    template = template instanceof HTMLElement ? template : document.querySelector(template);
    var fragment = document.importNode(template.content, true);
    Object.entries(insertions).forEach(function(insertionArray) {
      var node = fragment.querySelector(insertionArray[0]), insertion = insertionArray[1];
      if (insertion instanceof HTMLElement || insertion instanceof DocumentFragment) {
        node.appendChild(insertion);
      } else if (insertion instanceof Array) {
        node.textContent = insertion[0];
        Object.entries(insertion[1]).forEach(function(attributesArray) {
          node.setAttribute(attributesArray[0], attributesArray[1]);
        });
      } else {
        node.textContent = insertion;
      }
    });
    return fragment;
  };
});