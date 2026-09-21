class Ship {
  #length;
  #hitCount = 0;
  #sinkStatus = false;
  #direction;
  constructor(length, direction) {
    this.#length = length;
    this.#direction = direction;
  }

  get Length() {
    return this.#length;
  }
  get HitCount() {
    return this.#hitCount;
  }
  get SinkStatus() {
    return this.#sinkStatus;
  }
  get Direction() {
    return this.#direction;
  }

  hit() {
    this.#hitCount += 1;
  }
  isSunk() {
    if (this.#hitCount === this.#length) {
      this.#sinkStatus = true;
      return true;
    }
    return false;
  }
}

export default Ship;
