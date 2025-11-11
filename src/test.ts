import { test } from 'node:test';
import assert from 'node:assert';
import { html, renderToString, createMockBody, DOMTemplate } from './index.js';

test('html tagged template creates TemplateResult', () => {
  const result = html`<div>Hello</div>`;
  assert.ok(result);
  assert.strictEqual(typeof result.toHTML, 'function');
});

test('simple template renders to HTML string', () => {
  const template = html`<div>Hello World</div>`;
  const output = renderToString(template);
  assert.strictEqual(output, '<div>Hello World</div>');
});

test('template with interpolated values', () => {
  const name = 'Alice';
  const template = html`<div>Hello ${name}</div>`;
  const output = renderToString(template);
  assert.strictEqual(output, '<div>Hello Alice</div>');
});

test('template with multiple interpolated values', () => {
  const title = 'Welcome';
  const body = 'This is the content';
  const template = html`<h1>${title}</h1><p>${body}</p>`;
  const output = renderToString(template);
  assert.strictEqual(output, '<h1>Welcome</h1><p>This is the content</p>');
});

test('HTML escaping prevents XSS', () => {
  const userInput = '<script>alert("XSS")</script>';
  const template = html`<div>${userInput}</div>`;
  const output = renderToString(template);
  assert.strictEqual(output, '<div>&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;</div>');
});

test('nested templates work correctly', () => {
  const inner = html`<span>Inner</span>`;
  const outer = html`<div>${inner}</div>`;
  const output = renderToString(outer);
  assert.strictEqual(output, '<div><span>Inner</span></div>');
});

test('array of templates renders correctly', () => {
  const items = [
    html`<li>Item 1</li>`,
    html`<li>Item 2</li>`,
    html`<li>Item 3</li>`
  ];
  const template = html`<ul>${items}</ul>`;
  const output = renderToString(template);
  assert.strictEqual(output, '<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>');
});

test('null and undefined render as empty string', () => {
  const template1 = html`<div>${null}</div>`;
  const template2 = html`<div>${undefined}</div>`;
  assert.strictEqual(renderToString(template1), '<div></div>');
  assert.strictEqual(renderToString(template2), '<div></div>');
});

test('numbers render correctly', () => {
  const template = html`<div>${42}</div>`;
  const output = renderToString(template);
  assert.strictEqual(output, '<div>42</div>');
});

test('createMockBody creates renderable object', () => {
  const body = createMockBody();
  assert.ok(body.render);
  assert.strictEqual(body.innerHTML, '');
});

test('render method updates innerHTML', () => {
  const body = createMockBody();
  const template = html`<div>Test</div>`;
  body.render!(template);
  assert.strictEqual(body.innerHTML, '<div>Test</div>');
});

test('render can be called multiple times', () => {
  const body = createMockBody();

  body.render!(html`<div>First</div>`);
  assert.strictEqual(body.innerHTML, '<div>First</div>');

  body.render!(html`<div>Second</div>`);
  assert.strictEqual(body.innerHTML, '<div>Second</div>');
});

test('DOMTemplate namespace exports work correctly', () => {
  const { html } = DOMTemplate;
  const template = html`<div>Test</div>`;
  const output = DOMTemplate.renderToString(template);
  assert.strictEqual(output, '<div>Test</div>');
});

test('template function pattern works', () => {
  const { html } = DOMTemplate;

  const page = (title: string, body: string) => html`
    <h1>${title}</h1>
    <p>${body}</p>
  `;

  const document = {
    body: DOMTemplate.createMockBody()
  };

  // First render
  document.body.render!(page('Hello Templates', 'abc'));
  assert.ok(document.body.innerHTML.includes('<h1>Hello Templates</h1>'));
  assert.ok(document.body.innerHTML.includes('<p>abc</p>'));

  // Second render
  document.body.render!(page('Hello Updates', 'def'));
  assert.ok(document.body.innerHTML.includes('<h1>Hello Updates</h1>'));
  assert.ok(document.body.innerHTML.includes('<p>def</p>'));
});

test('special characters are escaped properly', () => {
  const template = html`<div>${'&<>"\'test'}</div>`;
  const output = renderToString(template);
  assert.strictEqual(output, '<div>&amp;&lt;&gt;&quot;&#39;test</div>');
});

test('boolean values render as strings', () => {
  const template1 = html`<div>${true}</div>`;
  const template2 = html`<div>${false}</div>`;
  assert.strictEqual(renderToString(template1), '<div>true</div>');
  assert.strictEqual(renderToString(template2), '<div>false</div>');
});

console.log('All tests defined. Run with: npm test');
