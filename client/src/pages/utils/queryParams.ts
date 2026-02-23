/**
 * Query parameter parsing utilities.
 *
 * These helpers safely convert URL search-parameter strings into typed values
 * with sensible defaults, used by the Editor page to configure the editor
 * from query parameters.
 */

/**
 * Parse a string value as a boolean with a fallback default.
 * Returns `false` only for the literal strings "false" and "0".
 * Returns the default when the value is null (parameter absent).
 */
export function parseBool(value: string | null, defaultValue: boolean): boolean {
  if (value === null) return defaultValue;
  return value !== 'false' && value !== '0';
}

/**
 * Parse a string value as a clamped integer with a fallback default.
 * Returns the default when the value is null or not a number.
 * The result is floored and clamped to [min, max].
 */
export function parseIntSafe(value: string | null, defaultValue: number, min: number, max: number): number {
  if (value === null) return defaultValue;
  const n = Number(value);
  if (isNaN(n)) return defaultValue;
  return Math.max(min, Math.min(max, Math.floor(n)));
}
