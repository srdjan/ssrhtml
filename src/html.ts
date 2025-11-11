import { createTemplateResult, type TemplateResult } from './template-result.ts';

/**
 * Tagged template function for creating HTML templates.
 * Pure function that returns an immutable TemplateResult.
 *
 * @example
 * const template = html`<div>${content}</div>`;
 */
export const html = (
  strings: TemplateStringsArray,
  ...values: unknown[]
): TemplateResult => createTemplateResult(strings, values);
