import { showGameOverDialog } from "./gameController.js";
import { targetingState } from "./gameState.js";
import anchorShip from "./anchorShip.js";
import changeStatus from "../ui/components/changeStatus.js";
import renderAttackResult from "../ui/components/renderAttackResult.js";
import waterDropSound from "../../assets/water-drop.wav";
import explosionSound from "../../assets/explosion.wav";

export default function attackPlayerGrid(player) {
  // get global state to work with it each round
  const state = targetingState.getState();
  // attack randomly if no ship is locked by the global state
  if (!state.shipLocked) {
    let attackSuccessful = false;
    while (!attackSuccessful) {
      const randomX = Math.floor(Math.random() * 10);
      const randomY = Math.floor(Math.random() * 10);
      if (player.Gameboard.receiveAttack([randomX, randomY])) {
        renderAttackResult(player, randomX, randomY);
        if (player.Board[randomX][randomY].Ship === null) {
          new Audio(waterDropSound).play();
        } else {
          new Audio(explosionSound).play();
        }
        changeStatus("p");

        attackSuccessful = true;

        if (player.Gameboard.AllShipsStatus) {
          showGameOverDialog("Computer has won!");
          return;
        }
      }
    }
  } else {
    // anchor position to know next way to go if ship not sunk
    anchorShip(player);
  }
}
