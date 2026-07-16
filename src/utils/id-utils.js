/**
 * ID Utilities
 * ------------------------
 * Generates unique string IDs for application entities.
 */

/**
 * Creates a unique ID.
 *
 * Examples:
 * tr_1721134289123_ab12cd
 * tag_1721134289124_ef34gh
 *
 * @param {string} prefix
 * @returns {string}
 */
export function generateId(prefix = "id") {
  if (typeof prefix !== "string" || prefix.trim() === "") {
    throw new Error("ID prefix must be a non-empty string.");
  }

  const timestamp = Date.now();

  const random = Math.random()
    .toString(36)
    .substring(2, 8);

  return `${prefix}_${timestamp}_${random}`;
}

/**
 * Returns true if the value is a valid ID
 * with the specified prefix.
 *
 * @param {string} id
 * @param {string} prefix
 * @returns {boolean}
 */
export function isValidId(id, prefix = "id") {
  if (typeof id !== "string") {
    return false;
  }

  return id.startsWith(`${prefix}_`);
}