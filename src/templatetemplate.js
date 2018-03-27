(function(root, factory) {
  root.TemplateTemplate = factory();
}(this, function() {
  'use strict';

  return function(template, insertions) {
    template = template instanceof HTMLElement ? template : document.querySelector(template);

    var fragment = document.importNode(template.content, true);

    Object.entries(insertions).forEach(function(insertionArray) {
      var node = fragment.querySelector(insertionArray[0]),
          insertion = insertionArray[1];

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
}));
