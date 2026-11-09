import { updateState } from "../../logic/gameState.js";

export default function renderAttackResult(player, x, y) {
  const playerCell = document.querySelector(
    `[data-coordinates="[${x}, ${y}]"].player-cell-button`,
  );
  if (playerCell) {
    if (player.Board[x][y].Ship === null) {
      playerCell.textContent = "X";
    } else {
      playerCell.textContent = "🔥";
      updateState({
        originalAnchor: [x, y],
        currentAnchor: [x, y],
        shipLocked: true,
      });
    }
  }
}
