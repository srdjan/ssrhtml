/**
 * Represents a template result from a tagged template literal.
 * Uses an immutable data structure approach.
 */
export type TemplateResult = {
  readonly strings: TemplateStringsArray;
  readonly values: readonly unknown[];
  readonly _brand: 'TemplateResult';
};

/**
 * Create a new TemplateResult (factory function)
 */
export const createTemplateResult = (
  strings: TemplateStringsArray,
  values: unknown[],
): TemplateResult => ({
  strings,
  values,
  _brand: 'TemplateResult',
});

/**
 * Type guard to check if a value is a TemplateResult
 */
export const isTemplateResult = (value: unknown): value is TemplateResult =>
  typeof value === 'object' &&
  value !== null &&
  '_brand' in value &&
  value._brand === 'TemplateResult';

/**
 * Escape HTML special characters to prevent XSS
 */
const escapeHTML = (str: string): string => {
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return str.replace(/[&<>"']/g, (char) => escapeMap[char]);
};

/**
 * Convert a value to a string, handling special cases
 */
const stringifyValue = (value: unknown): string => {
  if (isTemplateResult(value)) {
    return toHTML(value);
  }

  if (Array.isArray(value)) {
    return value.map(stringifyValue).join('');
  }

  if (value === null || value === undefined) {
    return '';
  }

  return escapeHTML(String(value));
};

/**
 * Convert a TemplateResult to an HTML string (pure function)
 */
export const toHTML = (template: TemplateResult): string => {
  const parts: string[] = [];

  for (let i = 0; i < template.strings.length; i++) {
    parts.push(template.strings[i]);

    if (i < template.values.length) {
      parts.push(stringifyValue(template.values[i]));
    }
  }

  return parts.join('');
};
