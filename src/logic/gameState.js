// constant global queries used across game state
let globalQueries = {
  computerGrid: null,
  playerStatus: null,
  computerStatus: null,
};

export const updateQueries = (newQueries) => {
  globalQueries = { ...globalQueries, ...newQueries };
};

export const getQueries = () => globalQueries;

/*
dynamic state used for the smart computer algorithm
keep track of hit ships to sink them
*/
export const anchorPositions = [
  [0, -1],
  [-1, 0],
  [0, +1],
  [+1, 0],
];

export const shiftAnchorPosition = () => anchorPositions.shift();
export const updateAnchorPosition = (value) => (anchorPositions[0] = value);

let state = {
  originalAnchor: null,
  currentAnchor: null,
  shipLocked: false,
};

export const updateState = (newState) => {
  state = { ...state, ...newState };
};

export const getState = () => state;

// preserve selected ship state to place it on board
let shipDetails = {
  selectedShip: null,
  orientation: "h",
};

export const getShipDetails = () => shipDetails;
export const updateShipDetails = (newDetails) => {
  shipDetails = { ...shipDetails, ...newDetails };
};

const ships = [
  { name: "Carrier", size: 5, id: "carrier" },
  { name: "Battleship", size: 4, id: "battleship" },
  { name: "Cruiser", size: 3, id: "cruiser" },
  { name: "Submarine", size: 3, id: "submarine" },
  { name: "Destroyer", size: 2, id: "destroyer" },
];

export const getShips = () => ships;

let placedShips = 0;

export const getPlacedShips = () => placedShips;
export const incrementPlacedShips = () => {
  placedShips += 1;
};
export const resetPlacedShips = () => {
  placedShips = 0;
};
