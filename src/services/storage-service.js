import { STORAGE_KEYS } from "../constants/storage-keys.js";
import { createDefaultData } from "../data/default-data.js";

/**
 * Storage Service
 * ------------------------
 * The only module that should access LocalStorage directly.
 */
class StorageService {
  /**
   * Initialize LocalStorage with default data.
   * Safe to call multiple times.
   */
  initialize() {
    const defaults = createDefaultData();

    this.#initializeCollection(
      STORAGE_KEYS.TRANSLATIONS,
      defaults.translations
    );

    this.#initializeCollection(
      STORAGE_KEYS.SETTINGS,
      defaults.settings
    );
  }

  /**
   * Get all translations.
   * @returns {Array}
   */
  getTranslations() {
    return this.#read(STORAGE_KEYS.TRANSLATIONS, []);
  }

  /**
   * Save translations.
   * @param {Array} translations
   */
  saveTranslations(translations) {
    if (!Array.isArray(translations)) {
      throw new Error("Translations must be an array.");
    }

    this.#write(STORAGE_KEYS.TRANSLATIONS, translations);
  }


  /**
   * Get application settings.
   * @returns {Object}
   */
  getSettings() {
    return this.#read(STORAGE_KEYS.SETTINGS, {});
  }

  /**
   * Save settings.
   * @param {Object} settings
   */
  saveSettings(settings) {
    if (settings === null || typeof settings !== "object") {
      throw new Error("Settings must be an object.");
    }

    this.#write(STORAGE_KEYS.SETTINGS, settings);
  }

  /**
   * Remove all application data.
   */
  clear() {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  }

  // ============================
  // Private Methods
  // ============================

  #initializeCollection(key, defaultValue) {
    if (localStorage.getItem(key) === null) {
      this.#write(key, defaultValue);
    }
  }

  #read(key, fallback) {
    try {
      const value = localStorage.getItem(key);

      if (value === null) {
        return fallback;
      }

      return JSON.parse(value);
    } catch (error) {
      console.error(`Failed to read '${key}'.`, error);
      return fallback;
    }
  }

  #write(key, value) {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch (error) {
      console.error(`Failed to write '${key}'.`, error);
      throw new Error(`Unable to save '${key}'.`);
    }
  }
}

export const storageService = new StorageService();