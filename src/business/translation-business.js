import { generateId } from "../utils/id-utils.js";
import { getCurrentIsoDate } from "../utils/date-utils.js";

/**
 * Creates a new translation object.
 *
 * @param {Object} input
 * @returns {Object}
 */
export function createTranslation(input) {
  validateTranslation(input);

  const now = getCurrentIsoDate();

  return {
    id: generateId("tr"),

    title: input.title.trim(),

    sourceLanguage: input.sourceLanguage,

    targetLanguage: input.targetLanguage,

    originalText: input.originalText.trim(),

    translatedText: input.translatedText.trim(),

    tags: Array.isArray(input.tags)
      ? [...input.tags]
      : [],

    isFavorite: Boolean(input.isFavorite),

    createdAt: now,

    updatedAt: now
  };
}

/**
 * Updates an existing translation.
 *
 * @param {Object} translation
 * @param {Object} updates
 * @returns {Object}
 */
export function updateTranslation(
  translation,
  updates
) {
  const updated = {
    ...translation,
    ...updates,
    updatedAt: getCurrentIsoDate()
  };

  validateTranslation(updated);

  return updated;
}

/**
 * Returns a new array without the translation.
 *
 * @param {Array} translations
 * @param {string} id
 * @returns {Array}
 */
export function deleteTranslation(
  translations,
  id
) {
  return translations.filter(
    (translation) => translation.id !== id
  );
}

/**
 * Finds a translation by ID.
 *
 * @param {Array} translations
 * @param {string} id
 * @returns {Object|null}
 */
export function findTranslationById(
  translations,
  id
) {
  return (
    translations.find(
      (translation) => translation.id === id
    ) ?? null
  );
}

/**
 * Searches translations by title,
 * original text or translated text.
 *
 * @param {Array} translations
 * @param {string} keyword
 * @returns {Array}
 */
export function searchTranslations(
  translations,
  keyword
) {
  if (!keyword) {
    return [...translations];
  }

  const query = keyword.toLowerCase();

  return translations.filter((translation) => {
    return (
      translation.title
        .toLowerCase()
        .includes(query) ||

      translation.originalText
        .toLowerCase()
        .includes(query) ||

      translation.translatedText
        .toLowerCase()
        .includes(query)
    );
  });
}

/**
 * Validates a translation object.
 *
 * Throws Error when invalid.
 *
 * @param {Object} translation
 */
export function validateTranslation(
  translation
) {
  if (!translation) {
    throw new Error(
      "Translation is required."
    );
  }

  if (
    typeof translation.title !== "string" ||
    translation.title.trim() === ""
  ) {
    throw new Error(
      "Title is required."
    );
  }

  if (
    typeof translation.originalText !==
      "string" ||
    translation.originalText.trim() === ""
  ) {
    throw new Error(
      "Original text is required."
    );
  }

  if (
    typeof translation.translatedText !==
      "string" ||
    translation.translatedText.trim() === ""
  ) {
    throw new Error(
      "Translated text is required."
    );
  }

  if (
    typeof translation.sourceLanguage !==
      "string" ||
    translation.sourceLanguage.trim() === ""
  ) {
    throw new Error(
      "Source language is required."
    );
  }

  if (
    typeof translation.targetLanguage !==
      "string" ||
    translation.targetLanguage.trim() === ""
  ) {
    throw new Error(
      "Target language is required."
    );
  }

  if (
    translation.sourceLanguage ===
    translation.targetLanguage
  ) {
    throw new Error(
      "Source and target languages cannot be the same."
    );
  }

  if (
    translation.tags &&
    !Array.isArray(translation.tags)
  ) {
    throw new Error(
      "Tags must be an array."
    );
  }
}
/**
 * Filters translations by language.
 *
 * @param {Array} translations
 * @param {string} language
 * @returns {Array}
 */
export function filterByLanguage(
  translations,
  language
) {

  if (!language) {
    return [...translations];
  }


  return translations.filter(
    (translation) =>
      translation.sourceLanguage === language ||
      translation.targetLanguage === language
  );
}


/**
 * Filters favorite translations.
 *
 * @param {Array} translations
 * @param {string} status
 * @returns {Array}
 */
export function filterByFavorite(
  translations,
  status
) {

  if (status === "favorite") {

    return translations.filter(
      (translation) =>
        translation.isFavorite === true
    );

  }


  if (status === "normal") {

    return translations.filter(
      (translation) =>
        translation.isFavorite === false
    );

  }


  return [...translations];
}