/**
 * SSR HTML Template Library for Deno
 *
 * A lightweight, functional library for rendering HTML templates using tagged template literals,
 * designed to work in both browser and server-side (SSR) environments.
 *
 * @module
 */

export type { TemplateResult } from './template-result.ts';
export { html } from './html.ts';
export {
  createMockBody,
  createRenderer,
  makeRenderable,
  render,
  renderToString,
  type RenderTarget,
} from './render.ts';
export { DOMTemplate } from './dom-template.ts';
