export function startBattleship(player, computer) {
  // start by setting both boards
  let playerPlacedShips = 0;
  let computerPlacedShips = 0;
  const sizes = [2, 3, 3, 4, 5];
  // ensure to place only 5 ships with correct sizes
  while (playerPlacedShips <= 4)
    if (boardPlaceShips(computer, sizes[playerPlacedShips]))
      playerPlacedShips += 1;
  while (computerPlacedShips <= 4)
    if (boardPlaceShips(player, sizes[computerPlacedShips]))
      computerPlacedShips += 1;
  // allow for each computer cell to be used to attack
  const gridButtons = document.querySelectorAll(".computer-cell-button");
  gridButtons.forEach((button) => {
    button.addEventListener("click", (e) => attackGrid(player, computer, e));
  });
}

// place ships randomly
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
function attackGrid(player, computer, e) {
  const target = e.target;
  const coordinates = JSON.parse(e.target.dataset.coordinates);
  const [x, y] = [coordinates[0], coordinates[1]];
  computer.Gameboard.receiveAttack([x, y]);
  e.target.disabled = true;
  if (computer.Board[x][y].Ship === null) target.textContent = "X";
  else target.textContent = "🔥";
  const computerGrid = document.querySelector(".computer-grid");
  computerGrid.style.pointerEvents = "none";
  // wait 1.5s before computer's attack on player's board
  setTimeout(() => {
    const randomX = Math.floor(Math.random() * 10);
    const randomY = Math.floor(Math.random() * 10);
    // TODO: add a try catch block for same position attack errors
    player.Gameboard.receiveAttack([randomX, randomY]);
    const playerCell = document.querySelector(
      `[data-coordinates="[${randomX}, ${randomY}]"].player-cell-button`,
    );
    if (playerCell) {
      if (player.Board[randomX][randomY].Ship === null)
        playerCell.textContent = "X";
      else playerCell.textContent = "🔥";
    }
    computerGrid.style.pointerEvents = "auto";
  }, 1500);
}
