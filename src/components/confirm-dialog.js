let dialogElement = null;
let dialogInstance = null;

let titleElement = null;
let messageElement = null;
let confirmButton = null;

let confirmCallback = null;

/**
 * Creates the shared confirmation dialog.
 * Safe to call multiple times.
 */
export function createConfirmDialog() {
  if (dialogElement) {
    return dialogElement;
  }

  dialogElement = document.createElement("div");
  dialogElement.className = "modal fade";
  dialogElement.id = "confirm-dialog";
  dialogElement.tabIndex = -1;
  dialogElement.setAttribute("aria-labelledby", "confirm-dialog-title");
  dialogElement.setAttribute("aria-hidden", "true");
  dialogElement.setAttribute("data-testid", "confirm-dialog");

  const modalDialog = document.createElement("div");
  modalDialog.className = "modal-dialog modal-dialog-centered";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  modalContent.append(
    createHeader(),
    createBody(),
    createFooter()
  );

  modalDialog.appendChild(modalContent);
  dialogElement.appendChild(modalDialog);

  document.body.appendChild(dialogElement);

  dialogInstance = new bootstrap.Modal(dialogElement);

  dialogElement.addEventListener("hidden.bs.modal", () => {
    confirmCallback = null;
  });

  return dialogElement;
}

/**
 * Opens the confirmation dialog.
 *
 * @param {Object} options
 * @param {string} options.title
 * @param {string} options.message
 * @param {string} options.confirmText
 * @param {string} options.cancelText
 * @param {Function} options.onConfirm
 */
export function showConfirmDialog({
  title = "Confirmation",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm = null
} = {}) {
  createConfirmDialog();

  titleElement.textContent = title;
  messageElement.textContent = message;

  confirmButton.textContent = confirmText;

  const cancelButton = dialogElement.querySelector(
    "[data-testid='confirm-cancel-button']"
  );

  cancelButton.textContent = cancelText;

  confirmCallback = onConfirm;

  dialogInstance.show();
}

/**
 * Closes the dialog.
 */
export function hideConfirmDialog() {
  if (!dialogInstance) {
    return;
  }

  dialogInstance.hide();
}

function createHeader() {
  const header = document.createElement("div");
  header.className = "modal-header";

  titleElement = document.createElement("h5");
  titleElement.className = "modal-title";
  titleElement.id = "confirm-dialog-title";
  titleElement.setAttribute("data-testid", "confirm-title");
  titleElement.textContent = "Confirmation";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "btn-close";
  closeButton.setAttribute("data-bs-dismiss", "modal");
  closeButton.setAttribute("aria-label", "Close");
  closeButton.setAttribute("data-testid", "confirm-close-button");

  header.append(
    titleElement,
    closeButton
  );

  return header;
}

function createBody() {
  const body = document.createElement("div");
  body.className = "modal-body";

  messageElement = document.createElement("p");
  messageElement.className = "mb-0";
  messageElement.setAttribute("data-testid", "confirm-message");
  messageElement.textContent = "Are you sure?";

  body.appendChild(messageElement);

  return body;
}

function createFooter() {
  const footer = document.createElement("div");
  footer.className = "modal-footer";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.className = "btn btn-secondary";
  cancelButton.textContent = "Cancel";
  cancelButton.setAttribute("data-bs-dismiss", "modal");
  cancelButton.setAttribute("data-testid", "confirm-cancel-button");

  confirmButton = document.createElement("button");
  confirmButton.type = "button";
  confirmButton.className = "btn btn-danger";
  confirmButton.textContent = "Confirm";
  confirmButton.setAttribute("data-testid", "confirm-confirm-button");

  confirmButton.addEventListener("click", () => {
    if (typeof confirmCallback === "function") {
      confirmCallback();
    }

    hideConfirmDialog();
  });

  footer.append(
    cancelButton,
    confirmButton
  );

  return footer;
}