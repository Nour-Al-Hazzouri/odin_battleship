import Gameboard from "./Gameboard.js";

class Player {
  #type;
  #gameboard = new Gameboard();

  constructor(type) {
    this.#type = type;
  }

  get Type() {
    return this.#type;
  }
  get Board() {
    return this.#gameboard;
  }
}

export default Player;
