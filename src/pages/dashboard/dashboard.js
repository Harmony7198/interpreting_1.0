/**
 * Dashboard Page
 * ------------------------
 * Renders the Dashboard page.
 * This is currently a placeholder and will later display
 * summary cards, recent translations and charts.
 */

export function render(container) {
  if (!container) {
    throw new Error("Dashboard container was not provided.");
  }

  container.replaceChildren();

  const page = document.createElement("section");
  page.className = "container-fluid";
  page.setAttribute("data-testid", "dashboard-page");

  // Page Title
  const title = document.createElement("h1");
  title.className = "display-6 mb-3";
  title.textContent = "Dashboard";

  // Description
  const description = document.createElement("p");
  description.className = "text-muted mb-4";
  description.textContent =
    "Welcome to Interpreting 1.0. This dashboard will provide an overview of your translations and application statistics.";

  // Placeholder Card
  const row = document.createElement("div");
  row.className = "row g-4";

  const column = document.createElement("div");
  column.className = "col-12";

  const card = document.createElement("div");
  card.className = "card shadow-sm";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body text-center py-5";

  const icon = document.createElement("i");
  icon.className = "bi bi-speedometer2 display-3 text-primary";

  const heading = document.createElement("h3");
  heading.className = "mt-3";
  heading.textContent = "Dashboard";

  const text = document.createElement("p");
  text.className = "text-muted mb-0";
  text.textContent =
    "Dashboard widgets will be implemented in a later milestone.";

  cardBody.append(
    icon,
    heading,
    text
  );

  card.appendChild(cardBody);
  column.appendChild(card);
  row.appendChild(column);

  page.append(
    title,
    description,
    row
  );

  container.appendChild(page);
}