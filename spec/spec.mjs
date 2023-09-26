import TemplateTemplate from '../src/templatetemplate.mjs';

describe('TemplateTemplate', () => {
  const typeErrorMessage = /is not an HTMLTemplateElement$/;

  function buildTemplateElement(id = 'templ', innerHTML = '<div><a></a></div>') {
    const $template = document.createElement('template');

    $template.id = id;
    $template.innerHTML = innerHTML;

    return $template;
  }

  it('is a function', () => {
    expect(typeof TemplateTemplate).toBe('function');
  });

  describe('when `template` argument is null', () => {
    it('throws an error', () => {
      expect(() => TemplateTemplate()).toThrowError(TypeError, typeErrorMessage);
    });
  });

  describe('when `template` argument is not an HTMLTemplateElement', () => {
    it('throws an error', () => {
      expect(() => TemplateTemplate(document.createElement('div'))).toThrowError(TypeError, typeErrorMessage);
    });
  });

  describe('when `template` argument references an element that does not exist', () => {
    it('throws an error', () => {
      expect(() => TemplateTemplate('#foo')).toThrowError(TypeError, typeErrorMessage);
    });
  });

  describe('when `template` argument is an HTMLElement', () => {
    beforeAll(() => document.body.appendChild(buildTemplateElement()));

    it('returns a DocumentFragment', () => {
      const $templ = document.querySelector('#templ');

      expect(TemplateTemplate($templ) instanceof DocumentFragment).toBe(true);
    });

    it('returns an empty `<a>`', () => {
      const $templ = document.querySelector('#templ');
      const $div = TemplateTemplate($templ).querySelector('div');

      expect($div).not.toBe(null);
      expect($div.innerHTML).toBe('<a></a>');
    });
  });

  describe('when `template` argument is a string', () => {
    beforeAll(() => document.body.appendChild(buildTemplateElement()));

    it('returns a DocumentFragment', () => {
      expect(TemplateTemplate('#templ') instanceof DocumentFragment).toBe(true);
    });

    it('returns an empty `<a>`', () => {
      const $div = TemplateTemplate('#templ').querySelector('div');

      expect($div).not.toBe(null);
      expect($div.innerHTML).toBe('<a></a>');
    });
  });

  describe('when `insertions` argument is not an object', () => {
    it('throws an error', () => {
      expect(() => TemplateTemplate(document.createElement('template'), 'foo')).toThrowError(TypeError, /is not an Object/);
    });
  });

  describe('when `insertions` argument is an object', () => {
    beforeAll(() => document.body.appendChild(buildTemplateElement()));

    it('renders simple text content', () => {
      const $div = TemplateTemplate('#templ', {
        a: 'foo'
      }).querySelector('div');

      expect($div.innerHTML).toBe('<a>foo</a>');
    });

    it('renders simple text content and HTML attributes', () => {
      const $div = TemplateTemplate('#templ', {
        a: ['foo', {
          href: 'https://example.com'
        }]
      }).querySelector('div');

      expect($div.innerHTML).toBe('<a href="https://example.com">foo</a>');
    });

    it('renders an HTMLElement', () => {
      const $div = TemplateTemplate('#templ', {
        a: document.createElement('span')
      }).querySelector('div');

      expect($div.innerHTML).toBe('<a><span></span></a>');
    });

    it('renders a DocumentFragment', () => {
      document.body.appendChild(buildTemplateElement('templ2', '<b></b>'));

      const $div = TemplateTemplate('#templ', {
        a: TemplateTemplate('#templ2', {
          b: ['foo', {
            class: 'bar'
          }]
        })
      }).querySelector('div');

      expect($div.innerHTML).toBe('<a><b class="bar">foo</b></a>');
    });
  });
});
