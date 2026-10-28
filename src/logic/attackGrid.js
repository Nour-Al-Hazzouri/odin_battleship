import { showGameOverDialog } from "./gameController.js";
import { getQueries } from "./gameState.js";

// detect each attacked cell to render correct information
export default function attackGrid(player, computer, e) {
  const queries = getQueries();
  const target = e.target;
  const coordinates = JSON.parse(e.target.dataset.coordinates);
  const [x, y] = [coordinates[0], coordinates[1]];
  computer.Gameboard.receiveAttack([x, y]);
  e.target.disabled = true;
  if (computer.Board[x][y].Ship === null) target.textContent = "X";
  else target.textContent = "🔥";
  queries.computerGrid.style.pointerEvents = "none";
  if (computer.Gameboard.AllShipsStatus) {
    showGameOverDialog("Player has won!");
    return;
  }
  // wait 1.5s before computer's attack on player's board
  setTimeout(() => {
    attackPlayerGrid(player);
  }, 1500);
}

function attackPlayerGrid(player) {
  const queries = getQueries();
  queries.playerStatus.textContent = "Computer's turn...";
  queries.computerStatus.textContent = "";
  let attackSuccessful = false;
  while (!attackSuccessful) {
    const randomX = Math.floor(Math.random() * 10);
    const randomY = Math.floor(Math.random() * 10);
    try {
      player.Gameboard.receiveAttack([randomX, randomY]);
      const playerCell = document.querySelector(
        `[data-coordinates="[${randomX}, ${randomY}]"].player-cell-button`,
      );
      if (playerCell) {
        if (player.Board[randomX][randomY].Ship === null)
          playerCell.textContent = "X";
        else {
          playerCell.textContent = "🔥";
        }
      }
      queries.computerGrid.style.pointerEvents = "auto";
      attackSuccessful = true;

      queries.playerStatus.textContent = "";
      queries.computerStatus.textContent = "Player's turn...";

      if (player.Gameboard.AllShipsStatus) {
        showGameOverDialog("Computer has won!");
        return;
      }
    } catch (e) {
      continue;
    }
  }
}
