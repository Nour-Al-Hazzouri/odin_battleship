import Player from "../Classes/Player.js";
import { renderPlayground } from "../ui/main/playground.js";
import { startBattleship } from "./gameController.js";

export function initiateGame(player) {
  const computer = new Player("c");
  renderPlayground(player.Grid, computer.Grid);
  startBattleship(player, computer);
}
