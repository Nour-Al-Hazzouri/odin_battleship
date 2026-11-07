import { getShipDetails } from "../../logic/gameState.js";
import { createErrorDialog } from "./errorDialog.js";

export default function placeShip(player, board) {
  for (const cellBtn of board.children) {
    cellBtn.addEventListener("click", () => {
      const { selectedShip, orientation } = getShipDetails();
      if (!selectedShip) return;
      const [row, col] = JSON.parse(cellBtn.dataset.coordinates);
      try {
        player.Gameboard.placeShip(selectedShip.size, [row, col], orientation);
        for (let i = 0; i < selectedShip.size; i++) {
          const r = orientation === "v" ? row + i : row;
          const c = orientation === "h" ? col + i : col;
          if (player.Board[r][c].Ship !== null) {
            const shipCell = board.children[r * 10 + c];
            shipCell.style.backgroundColor = "steelblue";
          }
        }
      } catch (error) {
        const errorDialog = createErrorDialog("The move was illegal");
        const main = document.querySelector("main");
        main.appendChild(errorDialog);
        errorDialog.showModal();
      }
    });
  }
}
