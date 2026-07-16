import { render as renderTranslations } from "./pages/translations/translations.js";
import { render as renderSettings } from "./pages/settings/settings.js";
import { render as renderNotFound } from "./pages/not-found/not-found.js";

const routes = {
  translations: renderTranslations,
  settings: renderSettings
};

export function initializeRouter() {
  window.addEventListener("hashchange", navigate);
  navigate();
}

export function navigate() {
  const page = getCurrentPage();

  highlightActiveMenu(page);

  const container = document.querySelector(
    '[data-testid="main-content"]'
  );

  if (!container) {
    console.error("Main content container not found.");
    return;
  }

  const render = routes[page];

  if (!render) {
    document.title = "404 | Interpreting 1.0";

    const title = document.querySelector(
      '[data-testid="page-title"]'
    );

    if (title) {
      title.textContent = "404";
    }

    renderNotFound(container);
    return;
  }

  document.title =
    `${capitalize(page)} | Interpreting 1.0`;

  const title = document.querySelector(
    '[data-testid="page-title"]'
  );

  if (title) {
    title.textContent = capitalize(page);
  }

  render(container);
}

function getCurrentPage() {
  const hash = window.location.hash;

  if (!hash) {
    window.location.hash = "#/translations";
    return "translations";
  }

  const page = hash.replace("#/", "");

  return page || "translations";
}

function highlightActiveMenu(page) {
  const menus = document.querySelectorAll("[data-page]");

  menus.forEach((menu) => {
    if (menu.dataset.page === page) {
      menu.classList.remove("btn-dark");
      menu.classList.add("btn-primary");
    } else {
      menu.classList.remove("btn-primary");
      menu.classList.add("btn-dark");
    }
  });
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}