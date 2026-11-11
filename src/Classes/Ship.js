/**
 * Represents a battleship with a set length.
 * Tracks received hits and evaluates whether the ship has sunk.
 */
class Ship {
  #length;
  #hitCount = 0;
  #sinkStatus = false;
  constructor(length) {
    this.#length = length;
  }

  get Length() {
    return this.#length;
  }
  get HitCount() {
    return this.#hitCount;
  }

  hit() {
    this.#hitCount += 1;
  }
  isSunk() {
    if (this.#hitCount === this.#length) {
      this.#sinkStatus = true;
    }
    return this.#sinkStatus;
  }
}

export default Ship;
