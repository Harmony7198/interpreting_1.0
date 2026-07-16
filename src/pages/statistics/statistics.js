/**
 * Statistics Page
 * ------------------------
 * Displays application statistics.
 * Charts and analytics will be implemented in a later milestone.
 */

export function render(container) {
  if (!container) {
    throw new Error("Statistics container was not provided.");
  }

  container.replaceChildren();

  const page = document.createElement("section");
  page.className = "container-fluid";
  page.setAttribute("data-testid", "statistics-page");

  // ==========================
  // Header
  // ==========================

  const title = document.createElement("h1");
  title.className = "display-6 mb-1";
  title.textContent = "Statistics";

  const description = document.createElement("p");
  description.className = "text-muted mb-4";
  description.textContent =
    "View statistics and insights about your translations.";

  page.append(title, description);

  // ==========================
  // Summary Cards
  // ==========================

  const row = document.createElement("div");
  row.className = "row g-4 mb-4";

  const cards = [
    {
      title: "Total Translations",
      value: "0",
      icon: "bi-journal-text",
      color: "primary"
    },
    {
      title: "Total Tags",
      value: "0",
      icon: "bi-tags",
      color: "success"
    },
    {
      title: "Languages",
      value: "0",
      icon: "bi-translate",
      color: "warning"
    },
    {
      title: "Favorites",
      value: "0",
      icon: "bi-star-fill",
      color: "danger"
    }
  ];

  cards.forEach((card) => {
    row.appendChild(createSummaryCard(card));
  });

  page.appendChild(row);

  // ==========================
  // Charts Placeholder
  // ==========================

  const chartCard = document.createElement("div");
  chartCard.className = "card shadow-sm";

  const chartBody = document.createElement("div");
  chartBody.className = "card-body text-center py-5";

  const icon = document.createElement("i");
  icon.className = "bi bi-bar-chart-line display-3 text-primary";

  const heading = document.createElement("h3");
  heading.className = "mt-3";
  heading.textContent = "Charts Coming Soon";

  const text = document.createElement("p");
  text.className = "text-muted mb-0";
  text.textContent =
    "Chart.js dashboards will be implemented in a later milestone.";

  chartBody.append(
    icon,
    heading,
    text
  );

  chartCard.appendChild(chartBody);

  page.appendChild(chartCard);

  container.appendChild(page);
}

/**
 * Creates one statistics summary card.
 *
 * @param {Object} card
 * @returns {HTMLDivElement}
 */
function createSummaryCard(card) {
  const column = document.createElement("div");
  column.className = "col-12 col-sm-6 col-lg-3";

  const wrapper = document.createElement("div");
  wrapper.className = "card shadow-sm h-100";

  const body = document.createElement("div");
  body.className = "card-body";

  const icon = document.createElement("i");
  icon.className = `bi ${card.icon} text-${card.color} fs-2`;

  const title = document.createElement("h6");
  title.className = "text-muted mt-3";
  title.textContent = card.title;

  const value = document.createElement("h2");
  value.className = "fw-bold";
  value.textContent = card.value;

  body.append(
    icon,
    title,
    value
  );

  wrapper.appendChild(body);
  column.appendChild(wrapper);

  return column;
}