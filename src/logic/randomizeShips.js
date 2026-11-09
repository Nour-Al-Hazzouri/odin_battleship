import {
  getPlacedShips,
  incrementPlacedShips,
  resetPlacedShips,
} from "./gameState.js";

// ensure 5 ships exactly are placed correctly
export default function randomizeShips(player) {
  player.Gameboard.resetBoard();
  resetPlacedShips();
  const sizes = [2, 3, 3, 4, 5];
  while (getPlacedShips() <= 4)
    boardPlaceShips(player, sizes[getPlacedShips()]);
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
    incrementPlacedShips();
    return true;
  }
  return false;
}
