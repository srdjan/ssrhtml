/**
 * SSR HTML Template Library
 *
 * A lightweight library for rendering HTML templates using tagged template literals,
 * designed to work in both browser and server-side (SSR) environments.
 */

export { TemplateResult } from './template-result.js';
export { html } from './html.js';
export { render, renderToString, makeRenderable, createMockBody, RenderTarget } from './render.js';
export { DOMTemplate } from './dom-template.js';
