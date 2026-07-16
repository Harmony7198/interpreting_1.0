import { storageService } from "./storage-service.js";

import {
  createTranslation,
  updateTranslation,
  deleteTranslation,
  findTranslationById,
  searchTranslations
} from "../business/translation-business.js";

/**
 * Translation Service
 * ------------------------
 * Coordinates business logic and storage.
 */
class TranslationService {
  /**
   * Returns all translations.
   *
   * @returns {Array}
   */
  getAll() {
    return storageService.getTranslations();
  }

  /**
   * Returns one translation.
   *
   * @param {string} id
   * @returns {Object|null}
   */
  getById(id) {
    const translations = storageService.getTranslations();

    return findTranslationById(
      translations,
      id
    );
  }

  /**
   * Creates a translation.
   *
   * @param {Object} input
   * @returns {Object}
   */
  create(input) {
    const translations =
      storageService.getTranslations();

    const translation =
      createTranslation(input);

    translations.push(translation);

    storageService.saveTranslations(
      translations
    );

    return translation;
  }

  /**
   * Updates a translation.
   *
   * @param {string} id
   * @param {Object} updates
   * @returns {Object}
   */
  update(id, updates) {
    const translations =
      storageService.getTranslations();

    const index = translations.findIndex(
      (translation) => translation.id === id
    );

    if (index === -1) {
      throw new Error(
        "Translation not found."
      );
    }

    const updated = updateTranslation(
      translations[index],
      updates
    );

    translations[index] = updated;

    storageService.saveTranslations(
      translations
    );

    return updated;
  }

  /**
   * Deletes a translation.
   *
   * @param {string} id
   */
  delete(id) {
    const translations =
      storageService.getTranslations();

    const exists = translations.some(
      (translation) => translation.id === id
    );

    if (!exists) {
      throw new Error(
        "Translation not found."
      );
    }

    const updatedTranslations =
      deleteTranslation(
        translations,
        id
      );

    storageService.saveTranslations(
      updatedTranslations
    );
  }

  /**
   * Searches translations.
   *
   * @param {string} keyword
   * @returns {Array}
   */
  search(keyword) {
    const translations =
      storageService.getTranslations();

    return searchTranslations(
      translations,
      keyword
    );
  }

  /**
   * Returns favorite translations.
   *
   * @returns {Array}
   */
  getFavorites() {
    return storageService
      .getTranslations()
      .filter(
        (translation) =>
          translation.isFavorite
      );
  }

  /**
   * Toggles favorite status.
   *
   * @param {string} id
   * @returns {Object}
   */
  toggleFavorite(id) {
    const translation =
      this.getById(id);

    if (!translation) {
      throw new Error(
        "Translation not found."
      );
    }

    return this.update(id, {
      isFavorite:
        !translation.isFavorite
    });
  }
}

export const translationService =
  new TranslationService();