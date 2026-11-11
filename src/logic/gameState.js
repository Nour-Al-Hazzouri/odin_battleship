/**
 * Default relative coordinate offsets for AI ship targeting.
 * Probes the 4 cardinal directions (up, left, down, right).
 */
const defaultAnchorPositions = () => [
  [0, -1],
  [-1, 0],
  [0, +1],
  [+1, 0],
];

/**
 * Factory creating an isolated state container for cached DOM element queries.
 * Prevents redundant DOM lookups during gameplay updates.
 */
export function createQueryState() {
  let queries = {
    computerGrid: null,
    playerStatus: null,
    computerStatus: null,
  };

  return {
    getQueries: () => queries,
    updateQueries: (newQueries) => {
      queries = { ...queries, ...newQueries };
    },
    reset: () => {
      queries = {
        computerGrid: null,
        playerStatus: null,
        computerStatus: null,
      };
    },
  };
}

export function createTargetingState() {
  let anchorPositions = defaultAnchorPositions();
  let state = {
    originalAnchor: null,
    currentAnchor: null,
    shipLocked: false,
  };

  return {
    getState: () => state,
    updateState: (newState) => {
      state = { ...state, ...newState };
    },
    getAnchorPositions: () => anchorPositions,
    shiftAnchorPosition: () => anchorPositions.shift(),
    updateAnchorPosition: (value) => {
      anchorPositions[0] = value;
    },
    reset: () => {
      anchorPositions = defaultAnchorPositions();
      state = {
        originalAnchor: null,
        currentAnchor: null,
        shipLocked: false,
      };
    },
  };
}

export function createShipPlacementState() {
  let shipDetails = {
    selectedShip: null,
    orientation: "h",
  };
  let placedShips = 0;

  return {
    getShipDetails: () => shipDetails,
    updateShipDetails: (newDetails) => {
      shipDetails = { ...shipDetails, ...newDetails };
    },
    getPlacedShips: () => placedShips,
    incrementPlacedShips: () => {
      placedShips += 1;
    },
    resetPlacedShips: () => {
      placedShips = 0;
    },
    reset: () => {
      shipDetails = {
        selectedShip: null,
        orientation: "h",
      };
      placedShips = 0;
    },
  };
}

// Standard fleet configuration
const ships = [
  { name: "Carrier", size: 5, id: "carrier" },
  { name: "Battleship", size: 4, id: "battleship" },
  { name: "Cruiser", size: 3, id: "cruiser" },
  { name: "Submarine", size: 3, id: "submarine" },
  { name: "Destroyer", size: 2, id: "destroyer" },
];

export const getShips = () => ships;

// Export default instances for active game session
export const queryState = createQueryState();
export const targetingState = createTargetingState();
export const shipPlacementState = createShipPlacementState();
