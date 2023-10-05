# TemplateTemplate

**A very small JavaScript `<template>` manipulation library.**

[![npm](https://img.shields.io/npm/v/@jgarber/templatetemplate.svg?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@jgarber/templatetemplate)
[![Downloads](https://img.shields.io/npm/dt/@jgarber/templatetemplate.svg?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@jgarber/templatetemplate)
[![Build](https://img.shields.io/github/actions/workflow/status/jgarber623/TemplateTemplate/ci.yml?branch=main&logo=github&style=for-the-badge)](https://github.com/jgarber623/TemplateTemplate/actions/workflows/ci.yml)
[![Maintainability](https://img.shields.io/codeclimate/maintainability/jgarber623/TemplateTemplate.svg?logo=code-climate&style=for-the-badge)](https://codeclimate.com/github/jgarber623/TemplateTemplate)
[![Coverage](https://img.shields.io/codeclimate/c/jgarber623/TemplateTemplate.svg?logo=code-climate&style=for-the-badge)](https://codeclimate.com/github/jgarber623/TemplateTemplate/code)

### Key Features

- Uses established Web standards (e.g. `<template>`, `document.querySelector`)
- Dependency-free
- JavaScript module (ESM), CommonJS, and browser global (`window.TemplateTemplate`) support

## Getting TemplateTemplate

You've got a couple options for adding TemplateTemplate to your project:

- [Download a release](https://github.com/jgarber623/TemplateTemplate/releases) from GitHub and do it yourself _(old school)_.
- Install using [npm](https://www.npmjs.com/package/@jgarber/templatetemplate): `npm install @jgarber/templatetemplate --save`
- Install using [Yarn](https://yarnpkg.com/en/package/@jgarber/templatetemplate): `yarn add @jgarber/templatetemplate`

## Usage

If you're comfortable attaching TemplateTemplate to the browser's `window` object, you may do the following:

```html
<script src="./dist/templatetemplate.js"></script>
<script>
  // Verify everything loaded properly...
  console.log(window.TemplateTemplate)
</script>
```

Or, you may use the JavaScript module (ESM) version:

```html
<script type="module">
  import TemplateTemplate from './dist/templatetemplate.mjs';

  // Verify everything loaded properly...
  console.log(TemplateTemplate);
</script>
```

> [!NOTE]\
> Full-featured examples of both of the above approaches are available in the [`example`](https://github.com/jgarber623/TemplateTemplate/blob/main/example) folder.

> [!NOTE]\
> If you're using an asset-bundling system (there are _so many_), refer to its documentation to determine which version of TemplateTemplate you should use (ESM, CommonJS, etc.).

TemplateTemplate takes two arguments: a reference to a `<template>` element and an object of `insertions` defining the content to insert into the `<template>`.

### Basic Example

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
  const tbody = document.querySelector('#projects tbody');

  const emptyTemplate = document.querySelector('#row-template');

  const insertions = {
    '.name': 'TemplateTemplate',
    '.author': 'Jason Garber',
    '.url': 'https://github.com/jgarber623/TemplateTemplate',
    '.languages': 'JavaScript'
  };

  const renderedTemplate = TemplateTemplate(emptyTemplate, insertions);

  tbody.appendChild(renderedTemplate);
</script>
```

In the example above, a reference to the `<template>` element is passed to TemplateTemplate using [`document.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector). The `insertions` argument an object whose keys (e.g. `'.name'`) are valid [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) and whose values (e.g. `'TemplateTemplate'`) are strings of text to insert into the selected node.

### Advanced Example

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
  const tbody = document.querySelector('#projects tbody');

  const anchor = document.createElement('a');

  anchor.setAttribute('href', 'https://sixtwothree.org');
  anchor.textContent = 'Jason Garber';

  tbody.appendChild(
    TemplateTemplate('#row-template', {
      tr: [null, {
        class: 'project',
        id: 'project-cashcash'
      }],
      th: 'CashCash',
      'th + td': anchor,
      '.url': ['https://github.com/jgarber623/CashCash', {
        style: 'font-style: italic;'
      }],
      'td:last-child': TemplateTemplate('#anchor-template', {
        a: ['JavaScript', {
          href: 'https://github.com/search?q=language%3AJavaScript',
          target: '_blank'
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
  // When an array is passed as a value, TemplateTemplate will use the first
  // index in the array as the `textContent` for the node. If this value is
  // `null`, TemplateTemplate skips setting the node's `textContent`.
  //
  // The second index is an object whose properties are added to the node as
  // HTML attributes.
  tr: [null, {
    class: 'project',
    id: 'project-cashcash'
  }],

  th: 'CashCash',

  // TemplateTemplate will use `appendChild` when given an instance of a
  // `DocumentFragment` or an `HTMLElement`.
  'th + td': anchor,

  '.url': ['https://github.com/jgarber623/CashCash', {
    style: 'font-weight: bold;'
  }],

  // TemplateTemplate may also be used to generate content from another
  // `<template>` and reuse it on the fly!
  'td:last-child': TemplateTemplate('#anchor-template', {
    a: ['JavaScript', {
      href: 'https://github.com/search?q=language%3AJavaScript',
      target: '_blank'
    }]
  })
})
```

### Examples

For a full-featured TemplateTemplate demonstration, check out [the included example files](https://github.com/jgarber623/TemplateTemplate/blob/main/example).

## Browser Support

**TemplateTemplate works in modern browsers.** The library makes use of several new(ish) JavaScript features and, in an effort to remain as lightweight and dependency-free as possible, leaves it up to you to choose whether or not to polyfill features for older browsers.

## Acknowledgments

TemplateTemplate is written and maintained by [Jason Garber](https://sixtwothree.org) and is another in a growing collection of small, curiously-named JavaScript utilities:

- [CashCash](https://github.com/jgarber623/CashCash), a very small DOM library inspired by [jQuery](https://jquery.com).
- [RadioRadio](https://github.com/jgarber623/RadioRadio), a very small [PubSub](https://en.wikipedia.org/wiki/Publish–subscribe_pattern) library.
- [RouterRouter](https://github.com/jgarber623/RouterRouter), a very small routing library extracted from [Backbone's Router](http://backbonejs.org/docs/backbone.html#section-185).

## License

TemplateTemplate is freely available under the [MIT License](https://opensource.org/licenses/MIT). Use it, learn from it, fork it, improve it, change it, tailor it to your needs.
