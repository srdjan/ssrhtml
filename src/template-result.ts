/**
 * Represents a template result from a tagged template literal.
 * Stores the static strings and dynamic values separately for efficient processing.
 */
export class TemplateResult {
  /**
   * The static string parts of the template
   */
  readonly strings: TemplateStringsArray;

  /**
   * The dynamic values interpolated into the template
   */
  readonly values: any[];

  constructor(strings: TemplateStringsArray, values: any[]) {
    this.strings = strings;
    this.values = values;
  }

  /**
   * Convert this template result to an HTML string.
   * Handles nested TemplateResults and escapes values for safety.
   */
  toHTML(): string {
    let result = '';

    for (let i = 0; i < this.strings.length; i++) {
      result += this.strings[i];

      if (i < this.values.length) {
        const value = this.values[i];
        result += this.stringifyValue(value);
      }
    }

    return result;
  }

  /**
   * Convert a value to a string, handling special cases like nested templates
   */
  private stringifyValue(value: any): string {
    if (value instanceof TemplateResult) {
      // Recursively render nested templates
      return value.toHTML();
    } else if (Array.isArray(value)) {
      // Handle arrays (e.g., lists of templates)
      return value.map(v => this.stringifyValue(v)).join('');
    } else if (value === null || value === undefined) {
      return '';
    } else {
      // Escape HTML entities for safety
      return this.escapeHTML(String(value));
    }
  }

  /**
   * Escape HTML special characters to prevent XSS
   */
  private escapeHTML(str: string): string {
    const escapeMap: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };

    return str.replace(/[&<>"']/g, char => escapeMap[char]);
  }
}
