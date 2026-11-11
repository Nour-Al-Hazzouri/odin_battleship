/**
 * Represents a single cell/slot on a 10x10 Gameboard.
 * Tracks whether a ship occupies the cell and whether it has received an attack.
 */
class Node {
  #ship = null;
  #hitStatus = false;

  set ship(newShip) {
    this.#ship = newShip;
  }
  get Ship() {
    return this.#ship;
  }
  get HitStatus() {
    return this.#hitStatus;
  }
  hit() {
    this.#hitStatus = true;
  }
}

export default Node;
