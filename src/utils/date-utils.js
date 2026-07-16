/**
 * Date Utilities
 * ------------------------
 * Helper functions for working with dates.
 */

/**
 * Returns the current date/time in ISO 8601 format.
 *
 * Example:
 * 2026-07-16T13:45:30.123Z
 *
 * @returns {string}
 */
export function getCurrentIsoDate() {
  return new Date().toISOString();
}

/**
 * Formats an ISO date as a local date.
 *
 * Example:
 * 2026-07-16
 * ->
 * Jul 16, 2026
 *
 * @param {string} isoDate
 * @returns {string}
 */
export function formatDate(isoDate) {
  if (!isoDate) {
    return "";
  }

  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

/**
 * Formats an ISO date as a local date and time.
 *
 * Example:
 * 2026-07-16T13:45:30.123Z
 * ->
 * Jul 16, 2026, 8:45 PM
 *
 * @param {string} isoDate
 * @returns {string}
 */
export function formatDateTime(isoDate) {
  if (!isoDate) {
    return "";
  }

  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

/**
 * Returns true if a string is a valid ISO date.
 *
 * @param {string} value
 * @returns {boolean}
 */
export function isValidIsoDate(value) {
  if (typeof value !== "string") {
    return false;
  }

  const date = new Date(value);

  return !Number.isNaN(date.getTime());
}