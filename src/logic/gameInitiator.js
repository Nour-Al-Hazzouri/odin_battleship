import { renderPlayground } from "../ui/main/playground.js";
import { createBoardGrid } from "../ui/components/grid.js";
import Gameboard from "../Classes/Gameboard.js";
import { startBattleship } from "./gameController.js";

export function initiateGame() {
  // let moves = 0;
  const playerBoard = new Gameboard("p");
  const computerBoard = new Gameboard("c");
  const playerGameboard = createBoardGrid();
  const computerGameboard = createBoardGrid("c");
  renderPlayground(playerGameboard, computerGameboard);
  startBattleship(
    playerBoard,
    computerBoard,
    playerGameboard,
    computerGameboard,
  );
}
