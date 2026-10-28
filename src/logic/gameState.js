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

// dynamic state used for the smart computer algorithm
// keep track of hit ships to sink them
let state = {
  originalAnchor: null,
  currentAnchor: null,
  visitedAnchors: [],
};

export const updateState = (newState) => {
  state = { ...state, ...newState };
};

export const getState = () => state;
