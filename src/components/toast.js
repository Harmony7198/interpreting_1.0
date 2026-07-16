let toastContainer = null;

/**
 * Create the shared toast container.
 * This function is safe to call multiple times.
 */
export function createToastContainer() {
  if (toastContainer) {
    return toastContainer;
  }

  toastContainer = document.createElement("div");
  toastContainer.className = "toast-container position-fixed top-0 end-0 p-3";
  toastContainer.id = "toast-container";
  toastContainer.setAttribute("data-testid", "toast-container");

  document.body.appendChild(toastContainer);

  return toastContainer;
}

/**
 * Show a Bootstrap toast.
 *
 * @param {Object} options
 * @param {string} options.message
 * @param {"success"|"danger"|"warning"|"info"} [options.type]
 * @param {number} [options.delay]
 */
export function showToast({
  message,
  type = "info",
  delay = 3000
} = {}) {
  if (!message) {
    throw new Error("Toast message is required.");
  }

  const container = createToastContainer();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.role = "alert";
  toast.ariaLive = "assertive";
  toast.ariaAtomic = "true";
  toast.setAttribute("data-testid", "toast");

  const header = document.createElement("div");
  header.className = `toast-header ${getHeaderClass(type)}`;

  const icon = document.createElement("i");
  icon.className = `${getIconClass(type)} me-2`;

  const title = document.createElement("strong");
  title.className = "me-auto";
  title.textContent = getTitle(type);

  const time = document.createElement("small");
  time.textContent = "Now";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "btn-close ms-2";
  closeButton.setAttribute("data-bs-dismiss", "toast");
  closeButton.setAttribute("aria-label", "Close");

  header.append(
    icon,
    title,
    time,
    closeButton
  );

  const body = document.createElement("div");
  body.className = "toast-body";
  body.textContent = message;

  toast.append(
    header,
    body
  );

  container.appendChild(toast);

  const bsToast = new bootstrap.Toast(toast, {
    autohide: true,
    delay
  });

  toast.addEventListener("hidden.bs.toast", () => {
    toast.remove();
  });

  bsToast.show();

  return bsToast;
}

/**
 * Remove all visible toasts.
 */
export function clearToasts() {
  if (!toastContainer) {
    return;
  }

  toastContainer.replaceChildren();
}

function getTitle(type) {
  switch (type) {
    case "success":
      return "Success";

    case "danger":
      return "Error";

    case "warning":
      return "Warning";

    default:
      return "Information";
  }
}

function getHeaderClass(type) {
  switch (type) {
    case "success":
      return "bg-success text-white";

    case "danger":
      return "bg-danger text-white";

    case "warning":
      return "bg-warning";

    default:
      return "bg-info text-white";
  }
}

function getIconClass(type) {
  switch (type) {
    case "success":
      return "bi bi-check-circle-fill";

    case "danger":
      return "bi bi-x-circle-fill";

    case "warning":
      return "bi bi-exclamation-triangle-fill";

    default:
      return "bi bi-info-circle-fill";
  }
}