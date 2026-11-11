import Ship from "./Ship.js";
import Node from "./Node.js";
import validateCoordinates from "../logic/validateCoordinates.js";
import resetShipSelection from "../ui/components/resetShipSelection.js";
import toggleShipButtons from "../ui/components/toggleShipButtons.js";

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
  get AllShipsStatus() {
    return this.#allShipsSunk;
  }
  #reportAllSunkShips() {
    if (!this.#allShipsSunk) this.#allShipsSunk = true;
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
      if (isCellOccupied) return false;
    }
    return true;
  }
  // place the ship based on coordinates and direction while accounting for edges and other ships
  placeShip(length, coordinates, direction) {
    if (typeof length !== "number" || length < 2 || length > 5) {
      throw new Error("length must be between 2 and 5");
    }
    if (
      !Array.isArray(coordinates) ||
      coordinates.length !== 2 ||
      !validateCoordinates(coordinates[0], coordinates[1])
    ) {
      throw new Error("coordinates must be [0-9, 0-9]");
    }
    if (direction !== "v" && direction !== "h") {
      throw new Error("direction must be 'v' or 'h'");
    }

    if (this.#ships.length >= 5) return false;

    // destructuring coordinates for easier usage
    const [x, y] = [coordinates[0], coordinates[1]];

    // create new ship and validate its position
    const newShip = new Ship(length);
    if (!this.#validatePossibilities(x, y, direction, length)) return false;

    // assign ship to corresponding board slots
    for (let i = 0; i < length; i++) {
      if (direction === "v") this.#board[x + i][y].ship = newShip;
      else this.#board[x][y + i].ship = newShip;
    }
    this.#ships.push(newShip);
    return true;
  }
  receiveAttack(coordinates) {
    if (
      !Array.isArray(coordinates) ||
      coordinates.length !== 2 ||
      !validateCoordinates(coordinates[0], coordinates[1])
    ) {
      throw new Error("coordinates must be [0-9, 0-9]");
    }
    // destructuring coordinates for easier usage
    const [x, y] = [coordinates[0], coordinates[1]];
    const attackedSlot = this.#board[x][y];

    if (!attackedSlot.HitStatus) attackedSlot.hit();
    else return false;
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
    return true;
  }
  resetBoard() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.#board[i][j].ship = null;
      }
    }
    this.#ships.length = 0;
    resetShipSelection();
    toggleShipButtons(false);
  }
}

export default Gameboard;
