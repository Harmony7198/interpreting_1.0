import {
  startSpeechRecognition,
  stopSpeechRecognition
} from "../services/speech-service.js";

/**
 * Translation Form Modal
 */

let modalElement = null;
let modalInstance = null;
let form = null;

let saveCallback = null;

export function initializeTranslationForm() {

  if (modalElement) {
    return;
  }

  modalElement = createModal();

  document.body.appendChild(modalElement);

  modalInstance = new bootstrap.Modal(modalElement);

  form = modalElement.querySelector("form");

  form.addEventListener(
    "submit",
    handleSubmit
  );

  const speechButton =
    modalElement.querySelector("#speech-button");

  const stopButton =
    modalElement.querySelector("#stop-button");

  speechButton.addEventListener(
    "click",
    handleSpeech
  );

  stopButton.addEventListener(
    "click",
    stopSpeechRecognition
  );
const translationSpeechButton =
    modalElement.querySelector(
        "#translation-speech-button"
    );

translationSpeechButton.addEventListener(
    "click",
    handleTranslationSpeech
);
}

export function openTranslationForm({
  mode = "create",
  data = {},
  onSave
}) {

  if (!modalElement) {
    initializeTranslationForm();
  }

  saveCallback = onSave;

  form.reset();

  const title =
    modalElement.querySelector(".modal-title");

  if (mode === "edit") {

    title.textContent =
      "Edit Translation";

    fillForm(data);

  } else {

    title.textContent =
      "New Translation";

  }

  modalInstance.show();

}

function fillForm(data) {

  form.title.value =
    data.title ?? "";

  form.sourceLanguage.value =
    data.sourceLanguage ?? "en";

  form.targetLanguage.value =
    data.targetLanguage ?? "vi";

  form.originalText.value =
    data.originalText ?? "";

  form.translatedText.value =
    data.translatedText ?? "";

}

function handleSubmit(event) {

  event.preventDefault();

  const data = {

    title:
      form.title.value.trim(),

    sourceLanguage:
      form.sourceLanguage.value,

    targetLanguage:
      form.targetLanguage.value,

    originalText:
      form.originalText.value.trim(),

    translatedText:
      form.translatedText.value.trim()

  };

  if (typeof saveCallback === "function") {
    saveCallback(data);
  }

  modalInstance.hide();

}

function handleSpeech() {

  const speechButton =
    modalElement.querySelector("#speech-button");

  try {

    startSpeechRecognition({

      language: form.sourceLanguage.value,

      onStart() {

        speechButton.textContent =
          "🔴 Listening...";

        speechButton.disabled = true;

      },

onResult(text, isFinal) {

    if (isFinal) {

        form.originalText.value +=
            text + " ";

    }

},

      onEnd() {

        speechButton.textContent =
          "🎤 Start Recording";

        speechButton.disabled = false;

      },

      onError(error) {

        alert(
          "Speech recognition error: " +
          error
        );

        speechButton.textContent =
          "🎤 Start Recording";

        speechButton.disabled = false;

      }

    });

  } catch (error) {

    alert(error.message);

  }

}

function handleTranslationSpeech() {

    const button =
        modalElement.querySelector(
            "#translation-speech-button"
        );

    try {

        startSpeechRecognition({

            language:
                form.targetLanguage.value,

            onStart() {

                button.textContent =
                    "🔴 Listening...";

                button.disabled = true;

            },

onResult(text, isFinal) {

    if (isFinal) {

        form.translatedText.value +=
            text + " ";

    }

},

            onEnd() {

                button.textContent =
                    "🎤 Record Translation";

                button.disabled = false;

            },

            onError(error) {

                alert(
                    "Speech recognition error: " +
                    error
                );

                button.textContent =
                    "🎤 Record Translation";

                button.disabled = false;

            }

        });

    } catch (error) {

        alert(error.message);

    }

}
function createModal() {

  const wrapper =
    document.createElement("div");

  wrapper.className =
    "modal fade";

  wrapper.id =
    "translation-form";

  wrapper.innerHTML = `

<div class="modal-dialog modal-xl">

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

<option value="en">
English
</option>

<option value="fr">
French
</option>

<option value="ja">
Japanese
</option>

<option value="vi">
Vietnamese
</option>

</select>

</div>

<div class="col-md-6 mb-3">

<label class="form-label">
Target Language
</label>

<select
class="form-select"
name="targetLanguage">

<option value="vi">
Vietnamese
</option>

<option value="en">
English
</option>

<option value="fr">
French
</option>

<option value="ja">
Japanese
</option>

</select>

</div>

</div>

<div class="row">

<div class="col-md-6">

<label class="form-label">
Original Text
</label>

<textarea
class="form-control"
rows="12"
name="originalText"
required></textarea>

<div class="d-flex gap-2 mt-2">

<button
type="button"
class="btn btn-outline-primary"
id="speech-button">

🎤 Start Recording

</button>

<button
type="button"
class="btn btn-outline-danger"
id="stop-button">

⏹ Stop

</button>

</div>

</div>

<div class="col-md-6">

<label class="form-label">
Translated Text
</label>

<textarea
class="form-control"
rows="12"
name="translatedText"
required></textarea>

<div class="d-flex gap-2 mt-2">

<button
type="button"
class="btn btn-outline-success"
id="translation-speech-button">

🎤 Record Translation

</button>

</div>

</div>

</div>

</div>

<div class="modal-footer">

<button
type="button"
class="btn btn-secondary"
data-bs-dismiss="modal">

Cancel

</button>

<button
type="submit"
class="btn btn-primary">

Save

</button>

</div>

</form>

</div>

</div>

`;

  return wrapper;

}