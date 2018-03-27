# TemplateTemplate

**A very small JavaScript `<template>` manipulation library.**

[![npm](https://img.shields.io/npm/v/@jgarber/templatetemplate.svg?style=for-the-badge)](https://www.npmjs.com/package/@jgarber/templatetemplate)
[![Downloads](https://img.shields.io/npm/dt/@jgarber/templatetemplate.svg?style=for-the-badge)](https://www.npmjs.com/package/@jgarber/templatetemplate)

### Key Features

- Uses established Web standards (e.g. `<template>`, `document.querySelector`)
- Dependency-free

TemplateTemplate is also really tiny:

<table>
  <tbody>
    <tr>
      <th>Uncompressed</th>
      <td>1,529 bytes</td>
    </tr>
    <tr>
      <th>Minified</th>
      <td>878 bytes</td>
    </tr>
    <tr>
      <th>Minified and gzipped</th>
      <td>493 bytes</td>
    </tr>
  </tbody>
</table>

## Getting TemplateTemplate

You've got a couple options for adding TemplateTemplate to your project:

- [Download a tagged version](https://github.com/jgarber623/TemplateTemplate/tags) from GitHub and do it yourself (old school).
- Install using [npm](https://www.npmjs.com/package/@jgarber/templatetemplate): `npm install @jgarber/templatetemplate`
- Install using [Yarn](https://yarnpkg.com/en/package/@jgarber/templatetemplate): `yarn add @jgarber/templatetemplate`

## Usage

TemplateTemplate takes two arguments: a reference to a `<template>` element and a hash of `insertions` defining the content to insert into the `<template>`.

### Basic

A basic example, inserting a row into a `<table>`:

```html
<table id="projects">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Author</th>
      <th scope="col">URL</th>
      <th scope="col">Languages</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

<template id="row-template">
  <tr>
    <th class="name" scope="row"></th>
    <td class="author"></td>
    <td class="url"></td>
    <td class="languages"></td>
  </tr>
</template>

<script>
  var tbody = document.querySelector('#projects tbody');

  var emptyTemplate = document.querySelector('#row-template');

  var insertions = {
    '.name': 'TemplateTemplate',
    '.author': 'Jason Garber',
    '.url': 'https://github.com/jgarber623/TemplateTemplate',
    '.languages': 'JavaScript'
  };

  var renderedTemplate = TemplateTemplate(emptyTemplate, insertions);

  tbody.appendChild(renderedTemplate);
</script>
```

In the example above, a reference to the `<template>` element is passed to TemplateTemplate using [`document.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector). The `insertions` hash is a map of key/value pairs where the key (e.g. `'.name'`) is a valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) and the `value` (e.g. `'TemplateTemplate'`) is a string of text to insert into the selected node.

### Advanced

A more complex example, inserting a row into a `<table>` with different types of insertions.

```html
<table id="projects">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Author</th>
      <th scope="col">URL</th>
      <th scope="col">Languages</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

<template id="row-template">
  <tr>
    <th class="name" scope="row"></th>
    <td class="author"></td>
    <td class="url"></td>
    <td class="languages"></td>
  </tr>
</template>

<template id="anchor-template">
  <a></a>
</template>

<script>
  var tbody = document.querySelector('#projects tbody');

  var anchor = document.createElement('a');

  anchor.setAttribute('href', 'https://sixtwothree.org');
  anchor.textContent = 'Jason Garber';

  tbody.appendChild(
    TemplateTemplate('#row-template', {
      'th': 'CashCash',
      'th + td': anchor,
      '.url': ['github.com/jgarber623/CashCash', {
        'style': 'font-weight: bold;'
      }],
      'td:last-child': TemplateTemplate('#anchor-template', {
        'a': ['JavaScript', {
          'href': 'https://github.com/search?q=language%3AJavaScript',
          'target': '_blank'
        }]
      })
    })
  );
</script>
```

The example above demonstrates a handful of additional features that you may find useful. Let's break it down with a commented version of the most interesting bits:

```js
// The first argument to TemplateTemplate may also be a valid CSS selector.
TemplateTemplate('#row-template', {
  'th': 'CashCash',
  // TemplateTemplate will use `appendChild` when given an instance of
  // a `DocumentFragment` or an `HTMLElement`.
  'th + td': anchor,
  // When an array is passed as a value, TemplateTemplate will use the
  // first index in the array as the `textContent` for the node. The
  // second index is a hash of key/value pairs which are added to the
  // node as HTML attributes.
  '.url': ['github.com/jgarber623/CashCash', {
    'style': 'font-weight: bold;'
  }],
  // TemplateTemplate may also be used to generate content from another
  // `<template>` and reuse it on the fly!
  'td:last-child': TemplateTemplate('#anchor-template', {
    'a': ['JavaScript', {
      'href': 'https://github.com/search?q=language%3AJavaScript',
      'target': '_blank'
    }]
  })
})
```

## Browser Support

TemplateTemplate works in all modern browsers. The library makes use of several new(ish) JavaScript features, including:

- `document.querySelector` ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector))
- `document.importNode` ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/importNode))
- `Object.entries` ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries))
- `Array.prototype.forEach()` ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach))

Support for `document.querySelector` first appeared in Internet Explorer in version 8. To avoid throwing JavaScript errors in browsers that don't support this method, you can [cut the mustard](http://responsivenews.co.uk/post/18948466399/cutting-the-mustard):

```js
if (document.querySelector) {
  // Your scripts here…
}
```

TemplateTemplate, in an effort to remain as lightweight and dependency-free as possible, leaves it up to you to choose whether or not to polyfill features for older browsers.

## Acknowledgments

TemplateTemplate is written and maintained by [Jason Garber](https://sixtwothree.org/) and is another in a growing collection of small, curiously-named JavaScript utilities:

- [CashCash](https://github.com/jgarber623/CashCash), a very small DOM library inspired by jQuery.
- [RadioRadio](https://github.com/jgarber623/RadioRadio), a very small [PubSub](https://en.wikipedia.org/wiki/Publish–subscribe_pattern) library.
- [RouterRouter](https://github.com/jgarber623/RouterRouter), a very small routing library extracted from [Backbone's Router](http://backbonejs.org/docs/backbone.html#section-169).

## License

TemplateTemplate is freely available under the [MIT License](https://opensource.org/licenses/MIT). Use it, learn from it, fork it, improve it, change it, tailor it to your needs.
