import { initiateGame } from "../../logic/gameInitiator.js";
import { createBoardGrid } from "../components/grid.js";
import { resetElement } from "../components/resetElement.js";
// ships assets
import shipTwo from "../../../assets/ship-2.svg";
import shipThree from "../../../assets/ship-3.svg";
import shipFour from "../../../assets/ship-4.svg";
import shipFive from "../../../assets/ship-5.svg";

// main function to render home page
export function renderHome() {
  const main = document.querySelector("main");
  // remove all elements in main to ensure no other pages overlap
  resetElement(main);
  // ensure section are correctly aligned with a flex column parent container
  const boardsContainer = document.createElement("div");
  boardsContainer.classList.add("boards-container");

  // First Section: Ships setup panel
  const shipsSection = document.createElement("div");
  shipsSection.classList.add("ships-section");
  // main grid to hold axis button and actual grid
  const shipsGrid = document.createElement("div");
  shipsGrid.classList.add("ships-grid");

  const axisBtnContainer = document.createElement("div");
  axisBtnContainer.classList.add("axis-btn-container");

  const axisBtn = document.createElement("button");
  axisBtn.classList.add("axis-btn");
  axisBtn.textContent = "vertical";
  axisBtnContainer.appendChild(axisBtn);
  // actual grid to have the ship correctly aligned
  const actualShipsGrid = document.createElement("div");
  actualShipsGrid.classList.add("actual-ships-grid");

  shipsGrid.appendChild(axisBtnContainer);

  // create same element with a loop for each ship size
  const shipSVGs = [shipTwo, shipThree, shipThree, shipFour, shipFive];
  shipSVGs.forEach((shipSVG, i) => {
    const svgDiv = document.createElement("div");
    svgDiv.innerHTML = shipSVG;
    svgDiv.id = `svg-${i}`;
    actualShipsGrid.append(svgDiv);
  });

  shipsGrid.append(actualShipsGrid);
  shipsSection.appendChild(shipsGrid);

  // Second Section: Board grid panel
  const boardSection = document.createElement("div");
  boardSection.classList.add("board-section");
  // 10x10 buttons grid gameboard
  const boardGrid = createBoardGrid();

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

  playBtn.addEventListener("click", initiateGame);

  main.appendChild(boardsContainer);
  main.appendChild(playBtnContainer);
}
