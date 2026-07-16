/**
 * Tags Page
 * ------------------------
 * Displays the list of tags.
 * CRUD functionality will be implemented in a later milestone.
 */

export function render(container) {
  if (!container) {
    throw new Error("Tags container was not provided.");
  }

  container.replaceChildren();

  const page = document.createElement("section");
  page.className = "container-fluid";
  page.setAttribute("data-testid", "tags-page");

  // ==========================
  // Header
  // ==========================

  const header = document.createElement("div");
  header.className =
    "d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3";

  const titleGroup = document.createElement("div");

  const title = document.createElement("h1");
  title.className = "display-6 mb-1";
  title.textContent = "Tags";

  const description = document.createElement("p");
  description.className = "text-muted mb-0";
  description.textContent =
    "Organize translations by creating and managing tags.";

  titleGroup.append(
    title,
    description
  );

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "btn btn-primary";
  addButton.setAttribute("data-testid", "add-tag-button");

  const icon = document.createElement("i");
  icon.className = "bi bi-plus-lg me-2";

  addButton.append(
    icon,
    document.createTextNode("New Tag")
  );

  addButton.addEventListener("click", () => {
    alert("Tag management will be implemented in a later milestone.");
  });

  header.append(
    titleGroup,
    addButton
  );

  // ==========================
  // Search Card
  // ==========================

  const searchCard = document.createElement("div");
  searchCard.className = "card shadow-sm mb-4";

  const searchBody = document.createElement("div");
  searchBody.className = "card-body";

  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.className = "form-control";
  searchInput.placeholder = "Search tags...";
  searchInput.setAttribute("data-testid", "tag-search");

  searchBody.appendChild(searchInput);
  searchCard.appendChild(searchBody);

  // ==========================
  // Table
  // ==========================

  const tableCard = document.createElement("div");
  tableCard.className = "card shadow-sm";

  const tableBody = document.createElement("div");
  tableBody.className = "card-body";

  const responsive = document.createElement("div");
  responsive.className = "table-responsive";

  const table = document.createElement("table");
  table.className = "table table-hover align-middle";
  table.setAttribute("data-testid", "tag-table");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  [
    "Tag Name",
    "Color",
    "Description",
    "Translations",
    "Actions"
  ].forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);

  const tbody = document.createElement("tbody");
  tbody.setAttribute("data-testid", "tag-table-body");

  const row = document.createElement("tr");

  const cell = document.createElement("td");
  cell.colSpan = 5;
  cell.className = "text-center py-5 text-muted";

  const emptyIcon = document.createElement("i");
  emptyIcon.className = "bi bi-tags display-6 d-block mb-3";

  const titleText = document.createElement("div");
  titleText.textContent = "No tags available.";

  const helpText = document.createElement("small");
  helpText.textContent = "Create your first tag to organize translations.";

  cell.append(
    emptyIcon,
    titleText,
    helpText
  );

  row.appendChild(cell);
  tbody.appendChild(row);

  table.append(
    thead,
    tbody
  );

  responsive.appendChild(table);

  tableBody.appendChild(responsive);

  tableCard.appendChild(tableBody);

  // ==========================
  // Assemble
  // ==========================

  page.append(
    header,
    searchCard,
    tableCard
  );

  container.appendChild(page);
}