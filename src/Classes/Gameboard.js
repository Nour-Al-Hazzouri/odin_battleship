import Ship from "./Ship.js";
import Node from "./Node.js";

class Gameboard {
  #board = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => new Node()),
  );
  #ships = [];
  #allShipsSunk = false;

  get Ships() {
    return this.#ships;
  }
  get Board() {
    return this.#board;
  }
  get allShipsStatus() {
    return this.#allShipsSunk;
  }
  #reportAllSunkShips() {
    if (!this.#allShipsSunk) this.#allShipsSunk = true;
  }

  // validate coordinates to be between [0][0] and [9][9]
  #validateCoordinates(x, y) {
    if (x < 0 || x > 9 || y < 0 || y > 9) return false;
    return true;
  }
  // (AI-Assisted refactor) validate direction to be within valid coordinates and not hitting any ships
  #validatePossibilities(x, y, direction, length) {
    // use a for loop to dynamically apply rules to different lengths instead of multiple nested 'if's
    for (let step = 0; step < length; step++) {
      let currentX = x;
      let currentY = y;
      // keep incrementing until reaching full length
      if (direction === "v") {
        currentX = x + step;
      } else if (direction === "h") {
        currentY = y + step;
      }
      // check if ship became out-of-bounds
      const offLeftEdge = currentX < 0;
      const offRightEdge = currentX > 9;
      const offTopEdge = currentY < 0;
      const offBottomEdge = currentY > 9;
      if (offLeftEdge || offRightEdge || offTopEdge || offBottomEdge) {
        return false;
      }
      // check if ship bumped into another ship
      const targetCell = this.#board[currentX][currentY].Ship;
      const isCellOccupied = targetCell !== null;
      if (isCellOccupied) {
        return false;
      }
    }
    return true;
  }
  // place the ship based on coordinates and direction while accounting for edges and other ships
  placeShip(length, coordinates, direction) {
    // destructuring coordinates for easier usage
    const [x, y] = [coordinates[0], coordinates[1]];
    // validate coordinates
    if (!this.#validateCoordinates(x, y))
      throw new Error("out-of-bound coordinates are not acceptable");
    // create new ship and validate its position
    const newShip = new Ship(length);
    if (!this.#validatePossibilities(x, y, direction, length))
      throw new Error("invalid ship position");
    // assign ship to corresponding board slots
    for (let i = 0; i < length; i++) {
      if (direction === "v") this.#board[x + i][y].ship = newShip;
      else this.#board[x][y + i].ship = newShip;
    }
    this.#ships.push(newShip);
  }
  receiveAttack(coordinates) {
    // destructuring coordinates for easier usage
    const [x, y] = [coordinates[0], coordinates[1]];
    const attackedSlot = this.#board[x][y];
    if (!this.#validateCoordinates(x, y))
      throw new Error("out-of-bound coordinates are not acceptable");
    if (!attackedSlot.HitStatus) attackedSlot.hit();
    if (attackedSlot.Ship) {
      attackedSlot.Ship.hit();
      attackedSlot.Ship.isSunk();
    }
    // report if all ships in gameboard have sunk
    const ships = this.#ships;
    let sunkShips = 0;
    for (let i = 0; i < ships.length; i++) {
      if (ships[i].isSunk()) sunkShips += 1;
    }
    if (sunkShips === 5) this.#reportAllSunkShips();
  }
}

export default Gameboard;
