/**
 * Renders the computer attack outcome onto the player's DOM board cell.
 * Displays 'X' for a miss or '🔥' for a successful hit.
 */
export default function renderComputerAttackResult(x, y, wasShipHit) {
  const playerCell = document.querySelector(
    `[data-coordinates="[${x}, ${y}]"].player-cell-button`,
  );
  if (playerCell) {
    if (!wasShipHit) {
      playerCell.textContent = "X";
    } else {
      playerCell.textContent = "🔥";
    }
  }
}
