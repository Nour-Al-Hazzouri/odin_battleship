import Gameboard from "./Gameboard.js";
import { createBoardGrid } from "../ui/components/grid.js";

/**
 * Represents a game participant (human player 'p' or computer 'c').
 * Owns a Gameboard model instance and a corresponding DOM board grid.
 */
class Player {
  #type;
  #gameboard = new Gameboard();
  #grid;
  constructor(type) {
    this.#type = type;
    this.#grid = createBoardGrid(type);
  }
  get Type() {
    return this.#type;
  }
  get Gameboard() {
    return this.#gameboard;
  }
  get Board() {
    return this.#gameboard.Board;
  }
  get Grid() {
    return this.#grid;
  }
}

export default Player;
