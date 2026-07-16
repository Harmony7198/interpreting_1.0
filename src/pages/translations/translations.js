import { showConfirmDialog } from "../../components/confirm-dialog.js";
import { translationService } from "../../services/translation-service.js";
import {
  initializeTranslationForm,
  openTranslationForm
} from "../../components/translation-form.js";

export function render(container) {
  initializeTranslationForm();

  container.replaceChildren();

  // Page header
  const header = document.createElement("div");
  header.className =
    "d-flex justify-content-between align-items-center mb-4";

  const title = document.createElement("h2");
  title.textContent = "Translations";

  const addButton = document.createElement("button");
  addButton.className = "btn btn-primary";
  addButton.innerHTML =
    '<i class="bi bi-plus-lg"></i> New Translation';

  addButton.addEventListener("click", () => {
    openTranslationForm((formData) => {
      try {
        translationService.create(formData);

        render(container);

      } catch (error) {
        alert(error.message);
      }
    });
  });

  header.append(title, addButton);

  // Table
  const table = createTable();

  container.append(header, table);
}

function createTable() {
  const translations =
    translationService.getAll();

  const wrapper = document.createElement("div");
  wrapper.className = "table-responsive";

  const table = document.createElement("table");
  table.className =
    "table table-bordered table-hover align-middle";

  table.innerHTML = `
<thead class="table-light">
<tr>
    <th>Title</th>
    <th>Languages</th>
    <th>Favorite</th>
    <th>Created</th>
    <th width="180">Actions</th>
</tr>
</thead>
`;

  const tbody = document.createElement("tbody");

  if (translations.length === 0) {
    const row = document.createElement("tr");

    row.innerHTML = `
<td colspan="5" class="text-center text-muted py-5">
No translations found.
</td>
`;

    tbody.appendChild(row);
  }

  translations.forEach((translation) => {
    tbody.appendChild(
      createRow(translation)
    );
  });

  table.appendChild(tbody);

  wrapper.appendChild(table);

  return wrapper;
}

function createRow(translation) {
  const row = document.createElement("tr");

  const titleCell = document.createElement("td");
  titleCell.textContent = translation.title;


  const languageCell = document.createElement("td");
  languageCell.textContent =
    `${translation.sourceLanguage} → ${translation.targetLanguage}`;


  const favoriteCell = document.createElement("td");
  favoriteCell.className = "text-center";
  favoriteCell.textContent =
    translation.isFavorite ? "⭐" : "";


  const createdCell = document.createElement("td");
  createdCell.textContent =
    new Date(
      translation.createdAt
    ).toLocaleDateString();


  const actionsCell = document.createElement("td");


  const editButton = document.createElement("button");
  editButton.className =
    "btn btn-sm btn-outline-secondary me-2";

  editButton.textContent = "Edit";

  // Edit will be implemented next milestone
  editButton.disabled = true;


  const deleteButton = document.createElement("button");
  deleteButton.className =
    "btn btn-sm btn-outline-danger";

  deleteButton.textContent = "Delete";

  deleteButton.addEventListener(
    "click",
    () => {

      showConfirmDialog({
        title: "Delete Translation",

        message:
          `Are you sure you want to delete "${translation.title}"?`,

        confirmText: "Delete",

        cancelText: "Cancel",

        onConfirm: () => {

          try {

            translationService.delete(
              translation.id
            );


            const container =
              document.querySelector(
                '[data-testid="main-content"]'
              );


            render(container);

          } catch (error) {

            alert(error.message);

          }

        }
      });

    }
  );


  actionsCell.append(
    editButton,
    deleteButton
  );


  row.append(
    titleCell,
    languageCell,
    favoriteCell,
    createdCell,
    actionsCell
  );


  return row;
}