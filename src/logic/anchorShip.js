import { showGameOverDialog } from "./gameController.js";
import {
  getState,
  updateState,
  anchorPositions,
  shiftAnchorPosition,
  updateAnchorPosition,
} from "./gameState.js";
import validateCoordinates from "./validateCoordinates.js";
import gameStateReset from "./gameStateReset.js";
import attackPlayerGrid from "./attackPlayerGrid.js";
import changeStatus from "../ui/components/changeStatus.js";
import renderComputerAttackResult from "../ui/components/renderComputerAttackResult.js";
import waterDropSound from "../../assets/water-drop.wav";
import explosionSound from "../../assets/explosion.wav";

export default function anchorShip(player) {
  const state = getState();
  const currentAnchor = state.currentAnchor;
  const originalAnchor = state.originalAnchor;
  // 1. add anchorPosition[0] with currentAnchor to go to current position
  const positionAnchor = currentAnchor.map(
    (anchor, i) => anchor + anchorPositions[0][i],
  );
  const [posX, posY] = positionAnchor;

  if (validateCoordinates(posX, posY) && !player.Board[posX][posY].HitStatus) {
    // 2. hit coordinate
    const wasShipHit = player.Board[posX][posY].Ship !== null;
    player.Gameboard.receiveAttack([posX, posY]);

    renderComputerAttackResult(posX, posY, wasShipHit);
    if (!wasShipHit) {
      new Audio(waterDropSound).play();
    } else {
      new Audio(explosionSound).play();
    }
    changeStatus("p");

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
