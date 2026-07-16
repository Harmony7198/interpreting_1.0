/**
 * Settings Page
 * ------------------------
 * Displays application settings.
 * Settings functionality will be implemented in a later milestone.
 */

export function render(container) {
  if (!container) {
    throw new Error("Settings container was not provided.");
  }

  container.replaceChildren();

  const page = document.createElement("section");
  page.className = "container-fluid";
  page.setAttribute("data-testid", "settings-page");

  // ==========================
  // Header
  // ==========================

  const title = document.createElement("h1");
  title.className = "display-6 mb-1";
  title.textContent = "Settings";

  const description = document.createElement("p");
  description.className = "text-muted mb-4";
  description.textContent =
    "Configure your application preferences.";

  page.append(
    title,
    description
  );

  // ==========================
  // General Settings
  // ==========================

  const card = document.createElement("div");
  card.className = "card shadow-sm";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const sectionTitle = document.createElement("h5");
  sectionTitle.className = "card-title mb-4";
  sectionTitle.textContent = "General Settings";

  cardBody.appendChild(sectionTitle);

  // Default Source Language
  cardBody.appendChild(
    createSelectField({
      id: "default-source-language",
      label: "Default Source Language",
      testId: "default-source-language",
      options: [
        "English",
        "French",
        "Japanese",
        "Vietnamese"
      ]
    })
  );

  // Default Target Language
  cardBody.appendChild(
    createSelectField({
      id: "default-target-language",
      label: "Default Target Language",
      testId: "default-target-language",
      options: [
        "Vietnamese",
        "English",
        "French",
        "Japanese"
      ]
    })
  );

  // Speech Recognition Language
  cardBody.appendChild(
    createSelectField({
      id: "speech-language",
      label: "Speech Recognition Language",
      testId: "speech-language",
      options: [
        "English",
        "French",
        "Japanese",
        "Vietnamese"
      ]
    })
  );

  // Theme
  cardBody.appendChild(
    createSelectField({
      id: "theme",
      label: "Theme",
      testId: "theme",
      options: [
        "Light",
        "Dark",
        "System"
      ]
    })
  );

  // Save Button
  const actions = document.createElement("div");
  actions.className = "mt-4";

  const saveButton = document.createElement("button");
  saveButton.type = "button";
  saveButton.className = "btn btn-primary";
  saveButton.setAttribute("data-testid", "save-settings-button");

  const icon = document.createElement("i");
  icon.className = "bi bi-floppy me-2";

  saveButton.append(
    icon,
    document.createTextNode("Save Settings")
  );

  saveButton.addEventListener("click", () => {
    alert("Settings will be implemented in a later milestone.");
  });

  actions.appendChild(saveButton);

  cardBody.appendChild(actions);

  card.appendChild(cardBody);

  page.appendChild(card);

  container.appendChild(page);
}

/**
 * Creates a Bootstrap select field.
 *
 * @param {Object} config
 * @returns {HTMLDivElement}
 */
function createSelectField(config) {
  const wrapper = document.createElement("div");
  wrapper.className = "mb-3";

  const label = document.createElement("label");
  label.className = "form-label";
  label.htmlFor = config.id;
  label.textContent = config.label;

  const select = document.createElement("select");
  select.className = "form-select";
  select.id = config.id;
  select.setAttribute("data-testid", config.testId);

  config.options.forEach((optionText) => {
    const option = document.createElement("option");
    option.value = optionText.toLowerCase().replace(/\s+/g, "-");
    option.textContent = optionText;

    select.appendChild(option);
  });

  wrapper.append(
    label,
    select
  );

  return wrapper;
}