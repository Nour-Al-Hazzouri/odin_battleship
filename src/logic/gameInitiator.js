import Player from "../Classes/Player.js";
import { renderPlayground } from "../ui/main/playground.js";
import { startBattleship } from "./gameController.js";

/**
 * Initiates the active gameplay session.
 * Instantiates the computer player, mounts the playground battle view,
 * and launches game controller routines.
 */
export function initiateGame(player) {
  const computer = new Player("c");
  renderPlayground(player.Grid, computer.Grid);
  startBattleship(player, player.Grid, computer);
}
