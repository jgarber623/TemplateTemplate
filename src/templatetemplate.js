(function(root, factory) {
  root.TemplateTemplate = factory();
}(this, function() {
  return function(template, insertions) {
    template = template instanceof HTMLElement ? template : document.querySelector(template);
    insertions = insertions || {};

    var fragment = document.importNode(template.content, true);

    Object.entries(insertions).forEach(function(insertionArray) {
      var node = fragment.querySelector(insertionArray[0]),
          insertion = insertionArray[1];

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
}));
