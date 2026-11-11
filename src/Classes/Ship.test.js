import Ship from "./Ship.js";

describe("Testing Ship Functionalities", () => {
  const ship = new Ship(3, "v");
  describe("Methods function correctly", () => {
    it("should increase hit counter when hit() is called", () => {
      ship.hit();
      expect(ship.HitCount).toBe(1);
    });
    it("should not be sunk yet", () => {
      expect(ship.isSunk()).toBeFalsy();
    });
    it("should sink after number of hits equals ship's length", () => {
      for (let i = 0; i < 2; i++) ship.hit();
      expect(ship.isSunk()).toBeTruthy();
    });
  });
});
