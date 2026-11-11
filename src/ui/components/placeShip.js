// visualize placed ships on the player board
import { shipPlacementState } from "../../logic/gameState.js";
import { createErrorDialog } from "./errorDialog.js";
import placeShipSound from "../../../assets/place-ship.wav";

export default function placeShip(player, board) {
  // board should be a div with 100 buttons created through './grid.js'
  for (const cellBtn of board.children) {
    cellBtn.addEventListener("click", () => {
      const { selectedShip, orientation } = shipPlacementState.getShipDetails();
      if (!selectedShip) return;
      const [row, col] = JSON.parse(cellBtn.dataset.coordinates);
      // check if a ship is placeable
      if (
        player.Gameboard.placeShip(selectedShip.size, [row, col], orientation)
      ) {
        new Audio(placeShipSound).play();
        // check oriantation and change bg clr for each cell based on ship size
        for (let i = 0; i < selectedShip.size; i++) {
          const r = orientation === "v" ? row + i : row;
          const c = orientation === "h" ? col + i : col;
          const shipCell = board.children[r * 10 + c];
          shipCell.style.backgroundColor = "steelblue";
        }
        // disable placed ship button to avoid exceeding limit
        const queriedShip = document.querySelector(`#${selectedShip.id}`);
        queriedShip.disabled = true;
        shipPlacementState.updateShipDetails({ selectedShip: null });
      } else {
        // notify user move is invalid
        const errorDialog = createErrorDialog("The move was illegal");
        const main = document.querySelector("main");
        main.appendChild(errorDialog);
        errorDialog.showModal();
      }
    });
  }
}
