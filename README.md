# SSR HTML Template Library

A lightweight, proof-of-concept TypeScript library for rendering HTML using tagged template literals, designed for Server-Side Rendering (SSR).

## Features

- 🏷️ **Tagged Template Literals**: Use familiar JavaScript template syntax
- 🔒 **XSS Protection**: Automatic HTML escaping for safety
- 🎯 **TypeScript Support**: Full type definitions included
- 🔄 **Nested Templates**: Compose templates within templates
- 📦 **Zero Dependencies**: Lightweight and standalone
- 🚀 **SSR Ready**: Works in Node.js server environments

## Installation

```bash
npm install
npm run build
```

## Quick Start

```typescript
import { DOMTemplate } from './src/index';

const { html } = DOMTemplate;

// Define a template function
const page = (title: string, body: string) => html`
  <h1>${title}</h1>
  <p>${body}</p>
`;

// Create a mock document.body for SSR
const document = {
  body: DOMTemplate.createMockBody()
};

// Render the page
document.body.render(page('Hello Templates', 'abc'));
console.log(document.body.innerHTML);
// Output: <h1>Hello Templates</h1><p>abc</p>

// Re-render with different data
document.body.render(page('Hello Updates', 'def'));
console.log(document.body.innerHTML);
// Output: <h1>Hello Updates</h1><p>def</p>
```

## API Reference

### `html` Tagged Template

Creates a template result from a tagged template literal:

```typescript
const template = html`<div>${content}</div>`;
```

### `renderToString(template)`

Converts a template to an HTML string:

```typescript
const htmlString = DOMTemplate.renderToString(template);
```

### `createMockBody()`

Creates a mock document.body object for SSR:

```typescript
const body = DOMTemplate.createMockBody();
body.render(template);
console.log(body.innerHTML);
```

### `makeRenderable(target)`

Adds a `render` method to any object:

```typescript
const element = DOMTemplate.makeRenderable({});
element.render(template);
```

## Examples

### Basic Usage

```typescript
const { html } = DOMTemplate;

const greeting = html`<h1>Hello, World!</h1>`;
const output = DOMTemplate.renderToString(greeting);
```

### Interpolating Values

```typescript
const name = 'Alice';
const template = html`<div>Hello ${name}!</div>`;
// Output: <div>Hello Alice!</div>
```

### Nested Templates

```typescript
const header = html`<h1>Title</h1>`;
const body = html`<p>Content</p>`;
const page = html`
  <div>
    ${header}
    ${body}
  </div>
`;
```

### Arrays of Templates

```typescript
const items = ['Apple', 'Banana', 'Cherry'];
const list = html`
  <ul>
    ${items.map(item => html`<li>${item}</li>`)}
  </ul>
`;
```

### XSS Protection

```typescript
const userInput = '<script>alert("XSS")</script>';
const safe = html`<div>${userInput}</div>`;
// Output: <div>&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;</div>
```

### Template Functions

Create reusable template functions:

```typescript
const card = (title: string, content: string) => html`
  <div class="card">
    <h2>${title}</h2>
    <div class="content">${content}</div>
  </div>
`;

const page = html`
  <div class="container">
    ${card('Card 1', 'Content 1')}
    ${card('Card 2', 'Content 2')}
  </div>
`;
```

## Running Examples

```bash
npm run build
npm run example
```

## Running Tests

```bash
npm run build
npm test
```

## Architecture

The library consists of several key components:

1. **TemplateResult**: Stores template strings and interpolated values
2. **html**: Tagged template function that creates TemplateResult instances
3. **renderToString**: Converts templates to HTML strings
4. **makeRenderable**: Extends objects with render capabilities
5. **DOMTemplate**: Namespace that exports the public API

### How It Works

1. The `html` tagged template function captures both the static strings and dynamic values
2. A `TemplateResult` object stores these separately
3. When rendering, values are escaped for XSS protection
4. Nested templates and arrays are recursively processed
5. The final HTML string is generated

## Type Safety

The library is written in TypeScript and provides full type definitions:

```typescript
import { TemplateResult, RenderTarget } from './src/index';

const template: TemplateResult = html`<div>Test</div>`;
const body: RenderTarget = DOMTemplate.createMockBody();
```

## Security

All interpolated values are automatically escaped to prevent XSS attacks:

- `<` becomes `&lt;`
- `>` becomes `&gt;`
- `&` becomes `&amp;`
- `"` becomes `&quot;`
- `'` becomes `&#39;`

Nested `TemplateResult` instances are not escaped, allowing safe composition.

## Limitations

This is a proof-of-concept library with the following limitations:

- No attribute binding syntax (e.g., `<div class=${className}>`)
- No event handlers
- No DOM diffing/patching for client-side updates
- Basic escaping (no context-aware escaping for attributes, scripts, etc.)
- No streaming support

## License

MIT

## Contributing

This is a proof-of-concept. Feel free to fork and extend for your needs!
