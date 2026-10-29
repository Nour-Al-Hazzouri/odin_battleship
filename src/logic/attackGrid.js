import { showGameOverDialog } from "./gameController.js";
import {
  getQueries,
  getState,
  updateState,
  anchorPositions,
  shiftAnchorPosition,
  updateAnchorPosition,
} from "./gameState.js";
import validateCoordinates from "./validateCoordinates.js";
import gameStateReset from "./gameStateReset.js";

// detect each attacked cell to render correct information
export default function attackGrid(player, computer, e) {
  const queries = getQueries();
  // modify computer board based on player's click events
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
  queries.playerStatus.textContent = "Computer's turn...";
  queries.computerStatus.textContent = "";
  // wait 1.5s before computer's attack on player's board
  setTimeout(() => {
    attackPlayerGrid(player);
  }, 1500);
}

function attackPlayerGrid(player) {
  // get global queries and state to work with it each round
  const queries = getQueries();
  const state = getState();
  // attack randomly if no ship is locked by the global state
  if (!state.shipLocked) {
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
            updateState({
              originalAnchor: [randomX, randomY],
              currentAnchor: [randomX, randomY],
              shipLocked: true,
            });
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
  } else {
    // anchor position to know next way to go if ship not sunk
    const state = getState();
    const currentAnchor = state.currentAnchor;
    const originalAnchor = state.originalAnchor;
    // 1. add anchorPosition[0] with currentAnchor to go to current position
    const positionAnchor = currentAnchor.map(
      (anchor, i) => anchor + anchorPositions[0][i],
    );
    const [posX, posY] = positionAnchor;

    if (
      validateCoordinates(posX, posY) &&
      !player.Board[posX][posY].HitStatus
    ) {
      // 2. hit coordinate
      const wasShipHit = player.Board[posX][posY].Ship !== null;
      player.Gameboard.receiveAttack([posX, posY]);

      const playerCell = document.querySelector(
        `[data-coordinates="[${posX}, ${posY}]"].player-cell-button`,
      );
      if (playerCell) {
        if (!wasShipHit) playerCell.textContent = "X";
        else playerCell.textContent = "🔥";
      }

      queries.computerGrid.style.pointerEvents = "auto";
      queries.playerStatus.textContent = "";
      queries.computerStatus.textContent = "Player's turn...";

      if (player.Gameboard.AllShipsStatus) {
        showGameOverDialog("Computer has won!");
        return;
      }

      // 3. if hit successful, continue through the same direction
      if (wasShipHit) {
        const hitShip = player.Board[posX][posY].Ship;
        if (hitShip && hitShip.isSunk()) {
          gameStateReset();
        } else {
          let [offsetX, offsetY] = anchorPositions[0];
          if (offsetX === 0) {
            if (offsetY < 0) offsetY -= 1;
            else if (offsetY > 0) offsetY += 1;
          } else if (offsetY === 0) {
            if (offsetX < 0) offsetX -= 1;
            else if (offsetX > 0) offsetX += 1;
          }
          updateAnchorPosition([offsetX, offsetY]);
        }
      } else {
        // missed: shift anchor position and switch to next direction from originalAnchor
        shiftAnchorPosition();
        if (anchorPositions.length > 0) {
          updateState({ currentAnchor: originalAnchor });
        } else {
          gameStateReset();
        }
      }
    } else {
      // coordinate invalid or already attacked: shift direction and retry
      shiftAnchorPosition();
      if (anchorPositions.length > 0) {
        updateState({ currentAnchor: originalAnchor });
      } else {
        gameStateReset();
      }
      attackPlayerGrid(player);
    }
  }
}
