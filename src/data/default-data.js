/**
 * Default Application Data
 * ------------------------
 * Used to initialize LocalStorage
 * the first time the application runs.
 */

/**
 * Default translations collection.
 */
export const DEFAULT_TRANSLATIONS = [];



/**
 * Default application settings.
 */
export const DEFAULT_SETTINGS = {
  defaultSourceLanguage: "en",
  defaultTargetLanguage: "vi",
  speechLanguage: "en-US",
  theme: "light",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

/**
 * Returns a fresh copy of the default application data.
 * This prevents accidental mutation of shared objects.
 */
export function createDefaultData() {
  return {
    translations: [...DEFAULT_TRANSLATIONS],
    settings: {
      ...DEFAULT_SETTINGS
    }
  };
}