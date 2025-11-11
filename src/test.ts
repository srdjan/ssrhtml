import { assertEquals, assertExists } from 'jsr:@std/assert';
import { createMockBody, DOMTemplate, html, renderToString } from './index.ts';

Deno.test('html tagged template creates TemplateResult', () => {
  const result = html`<div>Hello</div>`;
  assertExists(result);
  assertEquals(typeof result.strings, 'object');
  assertEquals(Array.isArray(result.values), true);
});

Deno.test('simple template renders to HTML string', () => {
  const template = html`<div>Hello World</div>`;
  const output = renderToString(template);
  assertEquals(output, '<div>Hello World</div>');
});

Deno.test('template with interpolated values', () => {
  const name = 'Alice';
  const template = html`<div>Hello ${name}</div>`;
  const output = renderToString(template);
  assertEquals(output, '<div>Hello Alice</div>');
});

Deno.test('template with multiple interpolated values', () => {
  const title = 'Welcome';
  const body = 'This is the content';
  const template = html`<h1>${title}</h1><p>${body}</p>`;
  const output = renderToString(template);
  assertEquals(output, '<h1>Welcome</h1><p>This is the content</p>');
});

Deno.test('HTML escaping prevents XSS', () => {
  const userInput = '<script>alert("XSS")</script>';
  const template = html`<div>${userInput}</div>`;
  const output = renderToString(template);
  assertEquals(output, '<div>&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;</div>');
});

Deno.test('nested templates work correctly', () => {
  const inner = html`<span>Inner</span>`;
  const outer = html`<div>${inner}</div>`;
  const output = renderToString(outer);
  assertEquals(output, '<div><span>Inner</span></div>');
});

Deno.test('array of templates renders correctly', () => {
  const items = [
    html`<li>Item 1</li>`,
    html`<li>Item 2</li>`,
    html`<li>Item 3</li>`,
  ];
  const template = html`<ul>${items}</ul>`;
  const output = renderToString(template);
  assertEquals(output, '<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>');
});

Deno.test('null and undefined render as empty string', () => {
  const template1 = html`<div>${null}</div>`;
  const template2 = html`<div>${undefined}</div>`;
  assertEquals(renderToString(template1), '<div></div>');
  assertEquals(renderToString(template2), '<div></div>');
});

Deno.test('numbers render correctly', () => {
  const template = html`<div>${42}</div>`;
  const output = renderToString(template);
  assertEquals(output, '<div>42</div>');
});

Deno.test('createMockBody creates renderable object', () => {
  const body = createMockBody();
  assertExists(body.render);
  assertEquals(body.innerHTML, '');
});

Deno.test('render method updates innerHTML', () => {
  const body = createMockBody();
  const template = html`<div>Test</div>`;
  body.render!(template);
  assertEquals(body.innerHTML, '<div>Test</div>');
});

Deno.test('render can be called multiple times', () => {
  const body = createMockBody();

  body.render!(html`<div>First</div>`);
  assertEquals(body.innerHTML, '<div>First</div>');

  body.render!(html`<div>Second</div>`);
  assertEquals(body.innerHTML, '<div>Second</div>');
});

Deno.test('DOMTemplate namespace exports work correctly', () => {
  const { html } = DOMTemplate;
  const template = html`<div>Test</div>`;
  const output = DOMTemplate.renderToString(template);
  assertEquals(output, '<div>Test</div>');
});

Deno.test('template function pattern works', () => {
  const { html } = DOMTemplate;

  const page = (title: string, body: string) => html`
    <h1>${title}</h1>
    <p>${body}</p>
  `;

  const document = {
    body: DOMTemplate.createMockBody(),
  };

  // First render
  document.body.render!(page('Hello Templates', 'abc'));
  assertEquals(document.body.innerHTML.includes('<h1>Hello Templates</h1>'), true);
  assertEquals(document.body.innerHTML.includes('<p>abc</p>'), true);

  // Second render
  document.body.render!(page('Hello Updates', 'def'));
  assertEquals(document.body.innerHTML.includes('<h1>Hello Updates</h1>'), true);
  assertEquals(document.body.innerHTML.includes('<p>def</p>'), true);
});

Deno.test('special characters are escaped properly', () => {
  const template = html`<div>${'&<>"\'test'}</div>`;
  const output = renderToString(template);
  assertEquals(output, '<div>&amp;&lt;&gt;&quot;&#39;test</div>');
});

Deno.test('boolean values render as strings', () => {
  const template1 = html`<div>${true}</div>`;
  const template2 = html`<div>${false}</div>`;
  assertEquals(renderToString(template1), '<div>true</div>');
  assertEquals(renderToString(template2), '<div>false</div>');
});

Deno.test('createRenderer returns curried function', () => {
  const body = DOMTemplate.createMockBody();
  const render = DOMTemplate.createRenderer(body);

  const template = html`<div>Curried</div>`;
  render(template);

  assertEquals(body.innerHTML, '<div>Curried</div>');
});

Deno.test('functional composition with createRenderer', () => {
  const body1 = DOMTemplate.createMockBody();
  const body2 = DOMTemplate.createMockBody();

  const render1 = DOMTemplate.createRenderer(body1);
  const render2 = DOMTemplate.createRenderer(body2);

  const template = html`<div>Test</div>`;

  render1(template);
  render2(template);

  assertEquals(body1.innerHTML, '<div>Test</div>');
  assertEquals(body2.innerHTML, '<div>Test</div>');
});
