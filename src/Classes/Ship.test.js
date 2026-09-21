import Ship from "./Ship.js";

describe("Properties & Methods", () => {
  const ship = new Ship(3, "v");
  describe("Properties return correct data", () => {
    it("should return correct length", () => {
      expect(ship.Length).toBe(3);
    });
    it("should have a default hit count of 0", () => {
      expect(ship.HitCount).toBe(0);
    });
    it("should have a default sunk status of false", () => {
      expect(ship.SinkStatus).toBeFalsy();
    });
    it("should return direction correctly", () => {
      expect(ship.Direction).toBe("v");
    });
  });
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
