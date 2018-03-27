/*!
 *  TemplateTemplate 0.1.2
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
    var fragment = document.importNode(template.content, true);
    Object.entries(insertions).forEach(function(insertionArray) {
      var node = fragment.querySelector(insertionArray[0]), insertion = insertionArray[1];
      if (insertion instanceof Array) {
        Object.entries(insertion[1]).forEach(function(attributesArray) {
          node.setAttribute(attributesArray[0], attributesArray[1]);
        });
        insertion = insertion[0];
      }
      if (insertion instanceof DocumentFragment || insertion instanceof HTMLElement) {
        node.appendChild(insertion);
      } else {
        node.textContent = insertion;
      }
    });
    return fragment;
  };
});