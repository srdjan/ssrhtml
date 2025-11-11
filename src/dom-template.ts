import { html as htmlFn } from './html.js';
import {
  render as renderFn,
  renderToString as renderToStringFn,
  makeRenderable as makeRenderableFn,
  createMockBody as createMockBodyFn
} from './render.js';
import { TemplateResult as TemplateResultClass } from './template-result.js';

/**
 * DOMTemplate namespace - main API for the library
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
   * TemplateResult class
   */
  export type TemplateResult = TemplateResultClass;
}
