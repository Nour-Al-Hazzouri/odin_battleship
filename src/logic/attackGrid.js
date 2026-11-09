import { showGameOverDialog } from "./gameController.js";
import { getQueries } from "./gameState.js";
import attackPlayerGrid from "./attackPlayerGrid.js";
import changeStatus from "../ui/components/changeStatus.js";

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
  if (computer.Gameboard.AllShipsStatus) {
    showGameOverDialog("Player has won!");
    return;
  }
  changeStatus("c");
  // wait 1.5s before computer's attack on player's board
  setTimeout(() => {
    attackPlayerGrid(player);
  }, 1500);
}
