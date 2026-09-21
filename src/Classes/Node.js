class Node {
  #coordinates;
  #ship = null;
  #hitStatus = false;
  constructor(coordinates) {
    this.#coordinates = coordinates;
  }

  set ship(newShip) {
    this.#ship = newShip;
  }
  get Coordinates() {
    return this.#coordinates;
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
