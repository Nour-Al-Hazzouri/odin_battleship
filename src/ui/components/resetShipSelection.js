import { updateShipDetails } from "../../logic/gameState.js";

export default function resetShipSelection() {
  const selectedShip = document.querySelector(".selected");
  if (selectedShip) {
    selectedShip.classList.remove("selected");
  }
  const cells = document.querySelectorAll(".board-grid .cell-btn");
  cells.forEach((cell) => {
    cell.style.backgroundColor = "";
  });
  updateShipDetails({ selectedShip: null });
}
