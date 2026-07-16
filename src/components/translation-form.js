/**
 * Translation Form Modal
 * ------------------------
 * Bootstrap modal for creating or editing a translation.
 */

let modalElement;
let modalInstance;
let form;
let saveCallback = null;

export function initializeTranslationForm() {
  if (modalElement) {
    return;
  }

  modalElement = createModal();

  document.body.appendChild(modalElement);

  modalInstance = new bootstrap.Modal(modalElement);

  form = modalElement.querySelector("form");

  form.addEventListener("submit", handleSubmit);
}

export function openTranslationForm(onSave) {
  if (!modalElement) {
    initializeTranslationForm();
  }

  saveCallback = onSave;

  form.reset();

  modalInstance.show();
}

export function closeTranslationForm() {
  modalInstance.hide();
}

function handleSubmit(event) {
  event.preventDefault();

  const data = {
    title: form.title.value.trim(),
    sourceLanguage: form.sourceLanguage.value,
    targetLanguage: form.targetLanguage.value,
    originalText: form.originalText.value.trim(),
    translatedText: form.translatedText.value.trim(),
    tags: [],
    isFavorite: form.isFavorite.checked
  };

  if (saveCallback) {
    saveCallback(data);
  }

  modalInstance.hide();
}

function createModal() {
  const wrapper = document.createElement("div");

  wrapper.className = "modal fade";

  wrapper.tabIndex = -1;

  wrapper.innerHTML = `
<div class="modal-dialog modal-lg">
  <div class="modal-content">

    <form>

      <div class="modal-header">
        <h5 class="modal-title">
          New Translation
        </h5>

        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal">
        </button>
      </div>

      <div class="modal-body">

        <div class="mb-3">
          <label class="form-label">
            Title
          </label>

          <input
            class="form-control"
            name="title"
            required>
        </div>

        <div class="row">

          <div class="col-md-6 mb-3">

            <label class="form-label">
              Source Language
            </label>

            <select
              class="form-select"
              name="sourceLanguage">

              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="ja">Japanese</option>
              <option value="vi">Vietnamese</option>

            </select>

          </div>

          <div class="col-md-6 mb-3">

            <label class="form-label">
              Target Language
            </label>

            <select
              class="form-select"
              name="targetLanguage">

              <option value="vi">Vietnamese</option>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="ja">Japanese</option>

            </select>

          </div>

        </div>

        <div class="mb-3">

          <label class="form-label">
            Original Text
          </label>

          <textarea
            class="form-control"
            rows="5"
            name="originalText"
            required></textarea>

        </div>

        <div class="mb-3">

          <label class="form-label">
            Translated Text
          </label>

          <textarea
            class="form-control"
            rows="5"
            name="translatedText"
            required></textarea>

        </div>

        <div class="form-check">

          <input
            class="form-check-input"
            type="checkbox"
            id="favorite"
            name="isFavorite">

          <label
            class="form-check-label"
            for="favorite">

            Favorite

          </label>

        </div>

      </div>

      <div class="modal-footer">

        <button
          class="btn btn-secondary"
          type="button"
          data-bs-dismiss="modal">

          Cancel

        </button>

        <button
          class="btn btn-primary"
          type="submit">

          Save

        </button>

      </div>

    </form>

  </div>
</div>
`;

  return wrapper;
}