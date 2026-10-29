import { createOverDialog } from "../ui/components/overDialog.js";
import randomizeShips from "./randomizeShips.js";
import attackGrid from "./attackGrid.js";
import { updateQueries } from "./gameState.js";

export function startBattleship(player, computer) {
  // update queries into global object to avoid constant re-calling
  updateQueries({
    computerGrid: document.querySelector(".computer-grid"),
    playerStatus: document.querySelector(".player-status-text"),
    computerStatus: document.querySelector(".computer-status-text"),
  });
  // place computer ships randomly
  randomizeShips(computer);
  // allow for each computer cell to be used to attack
  const gridButtons = document.querySelectorAll(".computer-cell-button");
  gridButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      attackGrid(player, computer, e);
    });
  });
  // clarify who's turn it is
  const playerStatus = document.querySelector(".player-status-text");
  const computerStatus = document.querySelector(".computer-status-text");
  if (playerStatus && computerStatus) {
    playerStatus.textContent = "";
    computerStatus.textContent = "Player's turn...";
  }
}

export function showGameOverDialog(message) {
  const dialog = createOverDialog(message, false);
  const main = document.querySelector("main");
  main.appendChild(dialog);
  dialog.showModal();
}
