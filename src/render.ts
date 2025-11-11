import { toHTML, type TemplateResult } from './template-result.ts';

/**
 * Represents a renderable target (for SSR, this is typically a mock DOM node)
 */
export type RenderTarget = {
  innerHTML?: string;
  render?: (template: TemplateResult) => void;
};

/**
 * Render a TemplateResult to an HTML string (pure function)
 */
export const renderToString = (template: TemplateResult): string => toHTML(template);

/**
 * Render a TemplateResult to a target object (side effect: mutates target.innerHTML)
 */
export const render = (target: RenderTarget, template: TemplateResult): void => {
  target.innerHTML = renderToString(template);
};

/**
 * Create a render function bound to a specific target (curried approach)
 */
export const createRenderer = (target: RenderTarget) => (template: TemplateResult): void => {
  render(target, template);
};

/**
 * Extend an object with a render method (functional wrapper)
 */
export const makeRenderable = <T extends object>(target: T): T & RenderTarget => ({
  ...target,
  render(template: TemplateResult): void {
    render(this, template);
  },
});

/**
 * Create a mock document.body-like object for SSR
 */
export const createMockBody = (): RenderTarget & { innerHTML: string } =>
  makeRenderable({ innerHTML: '' }) as RenderTarget & { innerHTML: string };
