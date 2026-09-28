import Gameboard from "./Classes/Gameboard.js";
import { renderPlayground } from "./ui/main/playground.js";
import { createErrorDialog } from "./ui/components/errorDialog.js";

export function initiateGame() {
  const playerGameboard = new Gameboard();
  const main = document.querySelector("main");
  // ensure all player ships are placed before starting the game
  if (playerGameboard.Ships.length < 5) {
    const dialog = createErrorDialog("Please place all your ships to proceed");
    main.appendChild(dialog);
    dialog.showModal();
  } else {
    renderPlayground();
  }
}
