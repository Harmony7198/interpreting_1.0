/**
 * Layout Component
 * ------------------------
 * Renders the main application layout.
 */

export function renderLayout() {
  const app = document.getElementById("app");

  if (!app) {
    throw new Error("Application root (#app) not found.");
  }

  app.replaceChildren();

  const wrapper = document.createElement("div");
  wrapper.className = "d-flex min-vh-100";

  wrapper.append(
    createSidebar(),
    createMainArea()
  );

  app.appendChild(wrapper);
}

/**
 * Sidebar
 */
function createSidebar() {
  const sidebar = document.createElement("aside");

  sidebar.className =
    "bg-dark text-white d-flex flex-column p-3";
  sidebar.style.width = "260px";

  // Logo
  const logo = document.createElement("h3");
  logo.className = "text-center mb-4";
  logo.textContent = "Interpreting 1.0";

  sidebar.appendChild(logo);

  const nav = document.createElement("nav");
  nav.className = "nav flex-column";

  const menus = [
    {
      page: "dashboard",
      icon: "bi-speedometer2",
      text: "Dashboard"
    },
    {
      page: "translations",
      icon: "bi-translate",
      text: "Translations"
    },
    {
      page: "tags",
      icon: "bi-tags",
      text: "Tags"
    },
    {
      page: "statistics",
      icon: "bi-bar-chart",
      text: "Statistics"
    },
    {
      page: "settings",
      icon: "bi-gear",
      text: "Settings"
    }
  ];

  menus.forEach((menu) => {
    nav.appendChild(createMenuItem(menu));
  });

  sidebar.appendChild(nav);

  return sidebar;
}

/**
 * Sidebar menu item
 */
function createMenuItem(menu) {
  const button = document.createElement("button");

  button.type = "button";
  button.className =
    "btn btn-dark text-start mb-2";

  button.dataset.page = menu.page;
  button.dataset.testid = `menu-${menu.page}`;

  button.addEventListener("click", () => {
    window.location.hash = `#/${menu.page}`;
  });

  const icon = document.createElement("i");
  icon.className = `bi ${menu.icon} me-2`;

  button.append(
    icon,
    document.createTextNode(menu.text)
  );

  return button;
}

/**
 * Main content area
 */
function createMainArea() {
  const main = document.createElement("main");

  main.className = "flex-grow-1 d-flex flex-column";

  // Topbar
  const header = document.createElement("header");
  header.className =
    "border-bottom bg-white px-4 py-3";

  const title = document.createElement("h4");
  title.className = "mb-0";
  title.textContent = "Dashboard";
  title.setAttribute(
    "data-testid",
    "page-title"
  );

  header.appendChild(title);

  // Content
  const content = document.createElement("div");
  content.className = "p-4 flex-grow-1";
  content.setAttribute(
    "data-testid",
    "main-content"
  );

  main.append(
    header,
    content
  );

  return main;
}