// ensure 5 ships exactly are placed correctly
export default function randomizeShips(player) {
  player.Gameboard.resetBoard();
  const boardGrid = document.querySelector(".board-grid");
  let placedShips = 0;
  const sizes = [2, 3, 3, 4, 5];
  while (placedShips <= 4) {
    const placed = boardPlaceShips(player, sizes[placedShips]);
    if (placed) {
      const currentShip = document.querySelector(`#svg-${placedShips}`);
      currentShip.style.position = "absolute";
      if (placed.ori === 0) {
        currentShip.style.left = `${(placed.row + 1) * 40}px`;
        currentShip.style.top = `${placed.col * 40}px`;
        currentShip.querySelector("svg").classList.add("vertical");
      } else {
        currentShip.style.left = `${placed.row * 40}px`;
        currentShip.style.top = `${placed.col * 40}px`;
      }
      boardGrid.appendChild(currentShip);
      placedShips += 1;
    }
  }
}
// ensure the placedShips counter increment for ships not errors
function boardPlaceShips(boardPlayer, size) {
  let orientation = ["v", "h"];
  try {
    const shipDetails = {
      col: Math.floor(Math.random() * 10),
      row: Math.floor(Math.random() * 10),
      ori: Math.floor(Math.random() * 2),
    };
    boardPlayer.Gameboard.placeShip(
      size,
      [shipDetails.col, shipDetails.row],
      orientation[shipDetails.ori],
    );
    return shipDetails;
  } catch (error) {
    // handle cases with invalid positions
    if (error.message === "invalid ship position") {
      return false;
    }
  }
}
