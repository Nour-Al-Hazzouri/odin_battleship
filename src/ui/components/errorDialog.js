export function createErrorDialog(message) {
  const errorDialog = document.createElement("dialog");
  errorDialog.classList.add("error-dialog");

  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorDialog.appendChild(errorMessage);

  const okButton = document.createElement("button");
  okButton.textContent = "OK";
  okButton.addEventListener("click", () => {
    errorDialog.close();
    const main = document.querySelector("main");
    main.removeChild(errorDialog);
  });
  errorDialog.appendChild(okButton);
  return errorDialog;
}
