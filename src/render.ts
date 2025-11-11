import { TemplateResult } from './template-result.js';

/**
 * Represents a renderable target (for SSR, this is typically a mock DOM node)
 */
export interface RenderTarget {
  innerHTML?: string;
  render?: (template: TemplateResult) => void;
}

/**
 * Render a TemplateResult to an HTML string
 */
export function renderToString(template: TemplateResult): string {
  return template.toHTML();
}

/**
 * Render a TemplateResult to a target object (sets innerHTML property)
 */
export function render(target: RenderTarget, template: TemplateResult): void {
  target.innerHTML = renderToString(template);
}

/**
 * Extend an object with a render method
 */
export function makeRenderable<T extends object>(target: T): T & RenderTarget {
  const renderableTarget = target as T & RenderTarget;

  renderableTarget.render = function(template: TemplateResult) {
    render(this, template);
  };

  return renderableTarget;
}

/**
 * Create a mock document.body-like object for SSR
 */
export function createMockBody(): RenderTarget & { innerHTML: string } {
  return makeRenderable({ innerHTML: '' }) as RenderTarget & { innerHTML: string };
}
