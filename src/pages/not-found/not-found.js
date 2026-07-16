/**
 * Not Found Page (404)
 * ------------------------
 * Displayed when the requested route does not exist.
 */

export function render(container) {
  if (!container) {
    throw new Error("Not Found container was not provided.");
  }

  container.replaceChildren();

  const page = document.createElement("section");
  page.className = "container-fluid";
  page.setAttribute("data-testid", "not-found-page");

  const wrapper = document.createElement("div");
  wrapper.className = "row justify-content-center";

  const column = document.createElement("div");
  column.className = "col-lg-8";

  const card = document.createElement("div");
  card.className = "card shadow-sm";

  const body = document.createElement("div");
  body.className = "card-body text-center py-5";

  // Icon
  const icon = document.createElement("i");
  icon.className = "bi bi-exclamation-circle display-1 text-danger";

  // Error Code
  const code = document.createElement("h1");
  code.className = "display-3 fw-bold mt-3";
  code.textContent = "404";

  // Title
  const title = document.createElement("h3");
  title.className = "mb-3";
  title.textContent = "Page Not Found";

  // Description
  const description = document.createElement("p");
  description.className = "text-muted mb-4";
  description.textContent =
    "The page you are looking for does not exist or has been moved.";

  // Back Button
  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn btn-primary";
  button.setAttribute("data-testid", "back-dashboard-button");

  const buttonIcon = document.createElement("i");
  buttonIcon.className = "bi bi-house-door me-2";

  button.append(
    buttonIcon,
    document.createTextNode("Go to Dashboard")
  );

  button.addEventListener("click", () => {
    window.location.hash = "#/dashboard";
  });

  body.append(
    icon,
    code,
    title,
    description,
    button
  );

  card.appendChild(body);
  column.appendChild(card);
  wrapper.appendChild(column);
  page.appendChild(wrapper);

  container.appendChild(page);
}