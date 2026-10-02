export function startBattleship(player, computer) {
  computer.Gameboard.placeShip(2, [0, 0], "h");
  computer.Gameboard.placeShip(3, [1, 0], "h");
  computer.Gameboard.placeShip(3, [2, 0], "h");
  computer.Gameboard.placeShip(4, [3, 0], "h");
  computer.Gameboard.placeShip(5, [4, 0], "h");
  const gridButtons = document.querySelectorAll(".computer-cell-button");
  gridButtons.forEach((button) => {
    button.addEventListener("click", (e) => attackGrid(computer, e));
  });
}

function attackGrid(computer, e) {
  const target = e.target;
  const coordinates = JSON.parse(e.target.dataset.coordinates);
  const [x, y] = [coordinates[0], coordinates[1]];
  computer.Gameboard.receiveAttack([x, y]);
  if (computer.Board[x][y].Ship === null) target.textContent = "X";
  else target.textContent = "🔥";
  e.target.disabled = true;
}
