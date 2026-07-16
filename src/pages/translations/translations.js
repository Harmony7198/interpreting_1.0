import {
    initializeTranslationViewer,
    openTranslationViewer
}
from "../../components/translation-view.js";

import { translationService } from "../../services/translation-service.js";

import {
  initializeTranslationForm,
  openTranslationForm
} from "../../components/translation-form.js";

import { showConfirmDialog } from "../../components/confirm-dialog.js";


export function render(container) {

  initializeTranslationForm();
  initializeTranslationViewer();

  container.replaceChildren();


  const header =
    document.createElement("div");

  header.className =
    "d-flex justify-content-between align-items-center mb-4";


  const title =
    document.createElement("h2");

  title.textContent =
    "Translations";


  const addButton =
    document.createElement("button");

  addButton.className =
    "btn btn-primary";

  addButton.innerHTML =
    `
    <i class="bi bi-plus-lg"></i>
    New Translation
    `;


  addButton.addEventListener(
    "click",
    () => {

      openTranslationForm({

        mode: "create",

        onSave(data) {

          try {

            translationService.create(data);

            render(container);

          } catch (error) {

            alert(error.message);

          }

        }

      });

    }
  );


  header.append(
    title,
    addButton
  );


  container.append(
    header,
    createTable(container)
  );

}


function createTable(container) {

  const translations =
    translationService.getAll();


  const wrapper =
    document.createElement("div");

  wrapper.className =
    "table-responsive";


  const table =
    document.createElement("table");


  table.className =
    "table table-bordered table-hover align-middle";


  table.innerHTML =
    `
    <thead class="table-light">

    <tr>
      <th>Title</th>
      <th>Languages</th>
      <th>Created</th>
      <th>Actions</th>

    </tr>

    </thead>
    `;



  const tbody =
    document.createElement("tbody");



  if (translations.length === 0) {

    tbody.innerHTML =
      `
      <tr>

      <td
      colspan="4"
      class="text-center text-muted py-5">

      No translations found.

      </td>

      </tr>
      `;

  }



  translations.forEach(
    (translation) => {

      tbody.appendChild(
        createRow(
          translation,
          container
        )
      );

    }
  );


  table.appendChild(tbody);

  wrapper.appendChild(table);


  return wrapper;

}



function createRow(
  translation,
  container
) {

  const row =
    document.createElement("tr");



  row.innerHTML =
    `

    <td>
    ${translation.title}
    </td>


    <td>
    ${translation.sourceLanguage}
    →
    ${translation.targetLanguage}
    </td>

    <td>

    ${new Date(
      translation.createdAt
    ).toLocaleDateString()

    }

    </td>


    <td>

<button
    class="btn btn-sm btn-outline-primary me-2">

    View

</button>

<button
    class="btn btn-sm btn-outline-secondary me-2">

    Edit

</button>

<button
    class="btn btn-sm btn-outline-danger">

    Delete

</button>


    </td>

    `;



  const buttons =
    row.querySelectorAll("button");


const viewButton = buttons[0];

const editButton = buttons[1];

const deleteButton = buttons[2];

viewButton.addEventListener(
    "click",
    () => {

        openTranslationViewer(
            translation
        );

    }
);

  editButton.addEventListener(
    "click",
    () => {

      openTranslationForm({

        mode: "edit",

        data: translation,


        onSave(data) {

          try {

            translationService.update(
              translation.id,
              data
            );


            render(container);


          } catch (error) {

            alert(error.message);

          }

        }

      });

    }
  );



  deleteButton.addEventListener(
    "click",
    () => {

      showConfirmDialog({

        title:
          "Delete Translation",

        message:
          `Delete "${translation.title}"?`,

        confirmText:
          "Delete",

        cancelText:
          "Cancel",


        onConfirm() {

          translationService.delete(
            translation.id
          );


          render(container);

        }

      });

    }
  );



  return row;

}