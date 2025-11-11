import { DOMTemplate } from './index.ts';

// Extract html from DOMTemplate as shown in the example
const { html } = DOMTemplate;

// Define a "template function" - a function that evaluates a template
// expression and returns a TemplateResult:
const page = (title: string, body: string) => html`
  <h1>${title}</h1>
  <p>${body}</p>
`;

// For SSR, we create a mock document.body
const document = {
  body: DOMTemplate.createMockBody(),
};

console.log('=== SSR HTML Template Example ===\n');

// Render the page once:
document.body.render!(page('Hello Templates', 'abc'));
console.log('First render:');
console.log(document.body.innerHTML);
console.log();

// Re-render the page with different data:
document.body.render!(page('Hello Updates', 'def'));
console.log('Second render:');
console.log(document.body.innerHTML);
console.log();

// Additional examples
console.log('=== Additional Examples ===\n');

// Nested templates
const card = (title: string, content: string) => html`
  <div class="card">
    <h2>${title}</h2>
    <div class="content">${content}</div>
  </div>
`;

const pageWithCards = (cards: unknown[]) => html`
  <div class="container">
    ${cards}
  </div>
`;

const cardsBody = DOMTemplate.createMockBody();
cardsBody.render!(pageWithCards([
  card('Card 1', 'Content for card 1'),
  card('Card 2', 'Content for card 2'),
  card('Card 3', 'Content for card 3'),
]));

console.log('Nested templates with array:');
console.log(cardsBody.innerHTML);
console.log();

// HTML escaping for safety
const userInput = '<script>alert("XSS")</script>';
const safePage = html`
  <div>User input: ${userInput}</div>
`;

const safeBody = DOMTemplate.createMockBody();
safeBody.render!(safePage);

console.log('HTML escaping (preventing XSS):');
console.log(safeBody.innerHTML);
console.log();

// Using renderToString directly
const directRender = DOMTemplate.renderToString(
  page('Direct Render', 'No body object needed'),
);
console.log('Direct string rendering:');
console.log(directRender);
console.log();

// Functional programming example: curried renderer
console.log('=== Functional Programming Example ===\n');
const body = DOMTemplate.createMockBody();
const renderToBody = DOMTemplate.createRenderer(body);

// Now we can use the curried function
renderToBody(page('Curried Render', 'Using functional composition'));
console.log('Curried renderer:');
console.log(body.innerHTML);
