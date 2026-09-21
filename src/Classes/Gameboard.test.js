import Gameboard from "./Gameboard.js";

describe("Board Functionalities", () => {
  describe("Placing a ship", () => {
    const gameboard = new Gameboard();
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
    it("should throw an error for valid coordinates but invalid ship position", () => {
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
    });
    it("should return true for valid coordinates and valid ship position", () => {
      expect(() => gameboard.placeShip(4, [0, 0], "h")).toBeTruthy();
      expect(() => gameboard.placeShip(5, [9, 2], "v")).toBeTruthy();
      expect(() => gameboard.placeShip(2, [4, 3], "h")).toBeTruthy();
      expect(() => gameboard.placeShip(3, [6, 6], "v")).toBeTruthy();
    });
  });
});
