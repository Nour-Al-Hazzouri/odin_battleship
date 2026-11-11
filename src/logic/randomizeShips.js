import { shipPlacementState } from "./gameState.js";

// ensure 5 ships exactly are placed correctly
export default function randomizeShips(player) {
  player.Gameboard.resetBoard();
  shipPlacementState.resetPlacedShips();
  const sizes = [2, 3, 3, 4, 5];
  while (shipPlacementState.getPlacedShips() <= 4)
    boardPlaceShips(player, sizes[shipPlacementState.getPlacedShips()]);
}
// ensure the placedShips counter increment for ships not errors
function boardPlaceShips(boardPlayer, size) {
  let orientation = ["v", "h"];
  if (
    boardPlayer.Gameboard.placeShip(
      size,
      [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
      orientation[Math.floor(Math.random() * 2)],
    )
  ) {
    shipPlacementState.incrementPlacedShips();
    return true;
  }
  return false;
}
