import Gameboard from "./Gameboard.js";

describe("Board Functionalities", () => {
  const gameboard = new Gameboard();
  describe("Validating Coordinates", () => {
    it("should throw error for invalid coordinates", () => {
      expect(() => gameboard.placeShip(3, [10, -9], "h")).toThrow(
        new Error("out-of-bound coordinates are not acceptable"),
      );
      expect(() => gameboard.placeShip(3, [10, 8], "h")).toThrow(
        new Error("out-of-bound coordinates are not acceptable"),
      );
      expect(() => gameboard.placeShip(3, [-1, 5], "h")).toThrow(
        new Error("out-of-bound coordinates are not acceptable"),
      );
    });
  });
  describe("Placing a ship", () => {
    it("should throw an error for invalid ship position", () => {
      // out-of-bound cases
      expect(() => gameboard.placeShip(3, [9, 9], "v")).toThrow(
        new Error("invalid ship position"),
      );
      expect(() => gameboard.placeShip(5, [0, 6], "h")).toThrow(
        new Error("invalid ship position"),
      );
      expect(() => gameboard.placeShip(2, [9, 2], "v")).toThrow(
        new Error("invalid ship position"),
      );
      expect(() => gameboard.placeShip(4, [0, 9], "h")).toThrow(
        new Error("invalid ship position"),
      );
      // ships overlapping cases
      gameboard.placeShip(5, [4, 4], "h"); // Ship 1 (h, len 5): occupies [4, 4] to [4, 8]
      // Vertical ship overlapping with horizontal ship
      expect(() => gameboard.placeShip(5, [3, 4], "v")).toThrow(
        new Error("invalid ship position"),
      ); // v (len 5): tries to occupy [3, 4] to [7, 4], overlaps at [4, 4]
      expect(() => gameboard.placeShip(3, [2, 6], "v")).toThrow(
        new Error("invalid ship position"),
      ); // v (len 3): tries to occupy [2, 6] to [4, 6], overlaps at [4, 6]

      // Horizontal ship overlapping with horizontal ship
      expect(() => gameboard.placeShip(3, [4, 2], "h")).toThrow(
        new Error("invalid ship position"),
      ); // h (len 3): tries to occupy [4, 2] to [4, 4], overlaps at [4, 4]

      gameboard.placeShip(4, [1, 1], "v"); // Ship 2 (v, len 4): occupies [1, 1] to [4, 1]
      // Vertical ship overlapping with vertical ship
      expect(() => gameboard.placeShip(2, [3, 1], "v")).toThrow(
        new Error("invalid ship position"),
      ); // v (len 2): tries to occupy [3, 1] to [4, 1], overlaps at [3, 1] and [4, 1]

      // Horizontal ship overlapping with vertical ship
      expect(() => gameboard.placeShip(2, [2, 0], "h")).toThrow(
        new Error("invalid ship position"),
      ); // h (len 2): tries to occupy [2, 0] to [2, 1], overlaps at [2, 1]
    });
    it("should not throw an error for valid coordinates ship position", () => {
      expect(() => gameboard.placeShip(4, [0, 0], "h")).not.toThrow(
        new Error("invalid ship position"),
      );
      expect(() => gameboard.placeShip(5, [2, 2], "v")).not.toThrow(
        new Error("invalid ship position"),
      );
      expect(() => gameboard.placeShip(3, [6, 6], "v")).not.toThrow(
        new Error("invalid ship position"),
      );
    });
  });
  describe("Receiving Attacks", () => {
    const board = gameboard.Board;
    it("should correctly update the hit status for attacked slots and ships", () => {
      // place ships to correctly test functionality
      gameboard.placeShip(4, [3, 4], "h");
      gameboard.placeShip(3, [5, 1, "v"]);
      gameboard.placeShip(2, [7, 9], "v");
      // receive attacks on ships parts
      gameboard.receiveAttack([3, 4]);
      gameboard.receiveAttack([5, 1]);
      gameboard.receiveAttack([7, 9]);
      // ensure both the slot and the ship record the hit
      expect(board[3][4].HitStatus).toBeTruthy();
      expect(board[5][1].HitStatus).toBeTruthy();
      expect(board[7][9].HitStatus).toBeTruthy();
      expect(board[3][4].Ship.HitCount).toBe(1);
      expect(board[5][1].Ship.HitCount).toBe(1);
      expect(board[7][9].Ship.HitCount).toBe(1);
      // check missed shots with ship-less slots
      gameboard.receiveAttack([9, 9]);
      expect(board[9][9].HitStatus).toBeTruthy();
      expect(board[9][9].Ship).toBeNull();
    });
  });
});
