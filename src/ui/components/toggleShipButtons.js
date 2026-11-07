export default function toggleShipButtons(disabled) {
  const shipsButtons = document.querySelectorAll(".actual-ships-grid button");
  shipsButtons.forEach((ship) => {
    ship.disabled = disabled;
  });
}
