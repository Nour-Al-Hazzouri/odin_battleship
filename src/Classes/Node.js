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
