import { showGameOverDialog } from "./gameController.js";

// detect each attacked cell to render correct information
export default function attackGrid(player, computer, e) {
  const playerStatus = document.querySelector(".player-status-text");
  const computerStatus = document.querySelector(".computer-status-text");

  const target = e.target;
  const coordinates = JSON.parse(e.target.dataset.coordinates);
  const [x, y] = [coordinates[0], coordinates[1]];
  computer.Gameboard.receiveAttack([x, y]);
  e.target.disabled = true;
  if (computer.Board[x][y].Ship === null) target.textContent = "X";
  else target.textContent = "🔥";
  const computerGrid = document.querySelector(".computer-grid");
  computerGrid.style.pointerEvents = "none";

  if (playerStatus && computerStatus) {
    playerStatus.textContent = "Computer's turn...";
    computerStatus.textContent = "";
  }

  if (computer.Gameboard.AllShipsStatus) {
    showGameOverDialog("Player has won!");
    return;
  }
  // wait 1.5s before computer's attack on player's board
  setTimeout(() => {
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
          else playerCell.textContent = "🔥";
        }
        computerGrid.style.pointerEvents = "auto";
        attackSuccessful = true;

        if (playerStatus && computerStatus) {
          playerStatus.textContent = "";
          computerStatus.textContent = "Player's turn...";
        }

        if (player.Gameboard.AllShipsStatus) {
          showGameOverDialog("Computer has won!");
          return;
        }
      } catch (e) {
        continue;
      }
    }
  }, 1500);
}
