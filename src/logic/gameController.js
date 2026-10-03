export function startBattleship(player, computer) {
  // start by setting computer's board
  let placedShips = 0;
  const sizes = [2, 3, 3, 4, 5];
  while (placedShips <= 4) {
    // ensure to place only 5 ships with correct sizes
    if (boardPlaceShips(computer, sizes[placedShips])) placedShips += 1;
  }
  // allow for each cell to be used to attack
  const gridButtons = document.querySelectorAll(".computer-cell-button");
  gridButtons.forEach((button) => {
    button.addEventListener("click", (e) => attackGrid(computer, e));
  });
}

// place computer ships randomly
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

// detect each attacked cell to render correct information
function attackGrid(computer, e) {
  const target = e.target;
  const coordinates = JSON.parse(e.target.dataset.coordinates);
  const [x, y] = [coordinates[0], coordinates[1]];
  computer.Gameboard.receiveAttack([x, y]);
  e.target.disabled = true;
  if (computer.Board[x][y].Ship === null) target.textContent = "X";
  else target.textContent = "🔥";
}
