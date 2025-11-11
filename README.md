# SSR HTML Template Library for Deno

A lightweight, functional TypeScript library for rendering HTML using tagged template literals, designed for Server-Side Rendering (SSR) in Deno.

## Features

- 🏷️ **Tagged Template Literals**: Use familiar JavaScript template syntax
- 🔒 **XSS Protection**: Automatic HTML escaping for safety
- 🎯 **TypeScript Support**: Full type definitions included
- 🔄 **Nested Templates**: Compose templates within templates
- 📦 **Zero Dependencies**: Lightweight and standalone
- 🚀 **SSR Ready**: Works in Deno and browser environments
- 🧩 **Functional Programming**: Pure functions and immutable data structures
- 🦕 **Deno Native**: Built for Deno 2.5+ with JSR support

## Installation

### From JSR (recommended)

```typescript
import { DOMTemplate } from 'jsr:@ssrhtml/core';
```

### From local file

```typescript
import { DOMTemplate } from './src/index.ts';
```

## Quick Start

```typescript
import { DOMTemplate } from './src/index.ts';

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

Creates an immutable template result from a tagged template literal:

```typescript
const template = html`<div>${content}</div>`;
```

### `renderToString(template)`

Converts a template to an HTML string (pure function):

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

### `createRenderer(target)`

Creates a curried render function bound to a target (functional approach):

```typescript
const body = DOMTemplate.createMockBody();
const renderToBody = DOMTemplate.createRenderer(body);
renderToBody(template); // Renders to body
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

### Functional Programming with Currying

```typescript
const body1 = DOMTemplate.createMockBody();
const body2 = DOMTemplate.createMockBody();

const render1 = DOMTemplate.createRenderer(body1);
const render2 = DOMTemplate.createRenderer(body2);

const template = html`<div>Test</div>`;

// Use curried functions
render1(template);
render2(template);
```

## Running Examples

```bash
deno task example
```

## Running Tests

```bash
deno task test
```

## Type Checking

```bash
deno task check
```

## Linting and Formatting

```bash
deno task lint
deno task fmt
```

## Architecture

The library follows functional programming principles:

### Core Components

1. **TemplateResult**: Immutable type with branded structure
2. **html**: Pure function that creates TemplateResult instances
3. **renderToString**: Pure function that converts templates to HTML
4. **createRenderer**: Curried function for functional composition
5. **DOMTemplate**: Namespace that exports the public API

### Functional Design Principles

- **Pure Functions**: No side effects in core rendering logic
- **Immutable Data**: TemplateResult uses readonly properties
- **Type Safety**: Branded types prevent accidental misuse
- **Composition**: Curried functions enable functional composition
- **No Classes**: Factory functions instead of classes

### How It Works

1. The `html` tagged template function captures strings and values
2. An immutable `TemplateResult` object stores these separately
3. When rendering, values are escaped for XSS protection
4. Nested templates and arrays are recursively processed
5. The final HTML string is generated by pure functions

## Type Safety

The library is written in TypeScript with strict mode enabled:

```typescript
import { TemplateResult, RenderTarget } from './src/index.ts';

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

## Publishing to JSR

To publish this library to JSR:

```bash
deno publish
```

## Limitations

This is a proof-of-concept library with the following limitations:

- No attribute binding syntax (e.g., `<div class=${className}>`)
- No event handlers
- No DOM diffing/patching for client-side updates
- Basic escaping (no context-aware escaping for attributes, scripts, etc.)
- No streaming support

## Deno Compatibility

- Requires Deno 2.5 or later
- Uses Deno-native imports with `.ts` extensions
- Compatible with JSR (JavaScript Registry)
- No Node.js dependencies

## License

MIT

## Contributing

This is a proof-of-concept. Feel free to fork and extend for your needs!

## Roadmap

Future enhancements could include:

- Streaming HTML generation
- Attribute binding syntax
- Context-aware escaping
- Performance optimizations
- Browser-specific features (when not in SSR mode)
