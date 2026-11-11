// warning dialog for information, no force quit
import clickSound from "../../../assets/click.wav";

export function createErrorDialog(message) {
  const errorDialog = document.createElement("dialog");
  errorDialog.classList.add("error-dialog");

  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorDialog.appendChild(errorMessage);
  // append dialog into main then remmove when closed
  const okButton = document.createElement("button");
  okButton.textContent = "OK";
  okButton.addEventListener("click", () => {
    new Audio(clickSound).play();
    errorDialog.close();
    const main = document.querySelector("main");
    main.removeChild(errorDialog);
  });
  errorDialog.appendChild(okButton);
  return errorDialog;
}
