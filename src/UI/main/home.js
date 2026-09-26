export function renderHome() {
  const main = document.querySelector("main");

  const boardsContainer = document.createElement("div");
  boardsContainer.classList.add("boards-container");

  // First Section: Ships setup panel
  const shipsSection = document.createElement("div");
  shipsSection.classList.add("ships-section");

  const shipsGrid = document.createElement("div");
  shipsGrid.classList.add("ships-grid");

  const axisBtnContainer = document.createElement("div");
  axisBtnContainer.classList.add("axis-btn-container");

  const axisBtn = document.createElement("button");
  axisBtn.classList.add("axis-btn");
  axisBtn.textContent = "vertical";
  axisBtnContainer.appendChild(axisBtn);

  const actualShipsGrid = document.createElement("div");
  actualShipsGrid.classList.add("actual-ships-grid");

  shipsGrid.appendChild(axisBtnContainer);
  shipsGrid.appendChild(actualShipsGrid);

  shipsSection.appendChild(shipsGrid);

  // Second Section: Board grid panel
  const boardSection = document.createElement("div");
  boardSection.classList.add("board-section");

  const boardGrid = document.createElement("div");
  boardGrid.classList.add("board-grid");
  for (let i = 0; i < 100; i++) {
    const cellBtn = document.createElement("button");
    cellBtn.classList.add("cell-btn");
    boardGrid.appendChild(cellBtn);
  }

  const controlsContainer = document.createElement("div");
  controlsContainer.classList.add("controls-container");

  const resetBtn = document.createElement("button");
  resetBtn.classList.add("reset-btn");
  resetBtn.textContent = "Reset";

  const randomizeBtn = document.createElement("button");
  randomizeBtn.classList.add("randomize-btn");
  randomizeBtn.textContent = "Randomize";

  controlsContainer.appendChild(resetBtn);
  controlsContainer.appendChild(randomizeBtn);

  boardSection.appendChild(boardGrid);
  boardSection.appendChild(controlsContainer);

  boardsContainer.appendChild(shipsSection);
  boardsContainer.appendChild(boardSection);

  // Play button at bottom center of main
  const playBtnContainer = document.createElement("div");
  playBtnContainer.classList.add("play-btn-container");

  const playBtn = document.createElement("button");
  playBtn.classList.add("play-btn");
  playBtn.textContent = "Play";
  playBtnContainer.appendChild(playBtn);

  main.appendChild(boardsContainer);
  main.appendChild(playBtnContainer);
}
