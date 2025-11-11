import { TemplateResult } from './template-result.js';

/**
 * Tagged template function for creating HTML templates.
 *
 * @example
 * const template = html`<div>${content}</div>`;
 */
export function html(strings: TemplateStringsArray, ...values: any[]): TemplateResult {
  return new TemplateResult(strings, values);
}
