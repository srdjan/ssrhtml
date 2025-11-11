import { html as htmlFn } from './html.ts';
import {
  createMockBody as createMockBodyFn,
  createRenderer as createRendererFn,
  makeRenderable as makeRenderableFn,
  render as renderFn,
  renderToString as renderToStringFn,
} from './render.ts';
import type { TemplateResult as TemplateResultType } from './template-result.ts';

/**
 * DOMTemplate namespace - main API for the library
 * Provides a functional approach to HTML template rendering
 */
export namespace DOMTemplate {
  /**
   * Tagged template function for creating HTML templates
   */
  export const html = htmlFn;

  /**
   * Render a template to a target
   */
  export const render = renderFn;

  /**
   * Render a template to an HTML string
   */
  export const renderToString = renderToStringFn;

  /**
   * Make an object renderable by adding a render method
   */
  export const makeRenderable = makeRenderableFn;

  /**
   * Create a mock document.body for SSR
   */
  export const createMockBody = createMockBodyFn;

  /**
   * Create a render function bound to a specific target (curried)
   */
  export const createRenderer = createRendererFn;

  /**
   * TemplateResult type
   */
  export type TemplateResult = TemplateResultType;
}
