import { anchorPositions, updateState } from "./gameState.js";

export default function gameStateReset() {
  anchorPositions.length = 0;
  anchorPositions.push([0, -1], [-1, 0], [0, +1], [+1, 0]);
  updateState({
    originalAnchor: null,
    currentAnchor: null,
    shipLocked: false,
  });
}
