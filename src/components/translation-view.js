let modalElement = null;
let modalInstance = null;

export function initializeTranslationViewer() {
    if (modalElement) return;

    modalElement = document.createElement("div");
    modalElement.className = "modal fade";
    modalElement.tabIndex = -1;

    modalElement.innerHTML = `
<div class="modal-dialog modal-xl">
    <div class="modal-content">

        <div class="modal-header">
            <h5 class="modal-title">Translation</h5>

            <button
                class="btn-close"
                type="button"
                data-bs-dismiss="modal">
            </button>
        </div>

        <div class="modal-body">

            <h4 id="view-title"></h4>

            <div class="text-muted mb-3">
                <span id="view-language"></span>
            </div>

            <div class="row">

                <div class="col-md-6">

                    <label class="fw-bold mb-2">
                        Original Text
                    </label>

                    <textarea
                        id="view-original"
                        class="form-control"
                        rows="12"
                        readonly>
                    </textarea>

                </div>

                <div class="col-md-6">

                    <label class="fw-bold mb-2">
                        Translation
                    </label>

                    <textarea
                        id="view-translation"
                        class="form-control"
                        rows="12"
                        readonly>
                    </textarea>

                </div>

            </div>

            <div class="mt-3 text-muted small">

                Created:
                <span id="view-created"></span>

            </div>

        </div>

        <div class="modal-footer">

            <button
                class="btn btn-secondary"
                data-bs-dismiss="modal">

                Close

            </button>

        </div>

    </div>
</div>
`;

    document.body.appendChild(modalElement);

    modalInstance =
        new bootstrap.Modal(modalElement);
}

export function openTranslationViewer(
    translation
) {

    if (!modalElement) {
        initializeTranslationViewer();
    }

    modalElement.querySelector(
        "#view-title"
    ).textContent = translation.title;

    modalElement.querySelector(
        "#view-language"
    ).textContent =
        `${translation.sourceLanguage} → ${translation.targetLanguage}`;

    modalElement.querySelector(
        "#view-original"
    ).value =
        translation.originalText;

    modalElement.querySelector(
        "#view-translation"
    ).value =
        translation.translatedText;

    modalElement.querySelector(
        "#view-created"
    ).textContent =
        new Date(
            translation.createdAt
        ).toLocaleString();

    modalInstance.show();
}