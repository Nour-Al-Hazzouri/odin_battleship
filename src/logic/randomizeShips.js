// ensure 5 ships exactly are placed correctly
export default function randomizeShips(player) {
  let placedShips = 0;
  const sizes = [2, 3, 3, 4, 5];
  while (placedShips <= 4)
    if (boardPlaceShips(player, sizes[placedShips])) placedShips += 1;
}
// ensure the placedShips counter increment for ships not errors
function boardPlaceShips(boardPlayer, size) {
  let orientation = ["v", "h"];
  try {
    boardPlayer.Gameboard.placeShip(
      size,
      [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
      orientation[Math.floor(Math.random() * 2)],
    );
    return true;
  } catch (error) {
    // handle cases with invalid positions
    if (error.message === "invalid ship position") {
      return false;
    }
  }
}
