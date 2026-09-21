class Player {
  #type;
  #gameboard;

  constructor(type, gameboard) {
    this.#type = type;
    this.#gameboard = gameboard;
  }

  get Type() {
    return this.#type;
  }
  get Gameboard() {
    return this.#gameboard;
  }
}

export default Player;
