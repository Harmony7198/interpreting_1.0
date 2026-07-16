import "./styles/main.css";

import { renderLayout } from "./components/layout.js";
import { initializeRouter } from "./router.js";

document.addEventListener("DOMContentLoaded", initializeApp);

function initializeApp() {
  try {
    renderLayout();
    initializeRouter();
  } catch (error) {
    console.error("Application failed to start.", error);

    document.body.innerHTML = `
      <div class="container py-5">
        <div class="alert alert-danger">
          <h4>Application Error</h4>
          <p>Unable to start Interpreting 1.0.</p>
        </div>
      </div>
    `;
  }
}