// error dialog to force user into home screen
import { renderHome } from "../main/home.js";

export function createOverDialog(message, closeButton) {
  const dialog = document.createElement("dialog");
  dialog.classList.add("game-over-dialog");
  // add option to close dialog if closeButton
  if (closeButton) {
    const xButton = document.createElement("button");
    xButton.classList.add("close-x-btn");
    xButton.textContent = "X";
    xButton.addEventListener("click", () => {
      dialog.close();
      dialog.remove();
    });
    dialog.appendChild(xButton);
  }

  const msgText = document.createElement("p");
  msgText.textContent = message;
  dialog.appendChild(msgText);
  // remove dialog amd return to home screen if 'ok' clicked
  const okayButton = document.createElement("button");
  okayButton.textContent = "Close";
  okayButton.addEventListener("click", () => {
    dialog.close();
    dialog.remove();
    renderHome();
  });
  dialog.appendChild(okayButton);

  return dialog;
}
