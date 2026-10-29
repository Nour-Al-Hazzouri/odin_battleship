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
