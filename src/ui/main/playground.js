import { resetElement } from "../components/resetElement.js";

export function renderPlayground(playerGameboard, computerGameboard) {
  const main = document.querySelector("main");

  resetElement(main);

  // main section to display player board
  const playerSection = document.createElement("section");
  playerSection.classList.add("playground-section", "player-section");

  const playerTitle = document.createElement("h2");
  playerTitle.textContent = "Player";

  const playerBoard = playerGameboard;

  const playerStatus = document.createElement("span");
  playerStatus.classList.add("status-text", "player-status-text");

  playerSection.appendChild(playerTitle);
  playerSection.appendChild(playerBoard);
  playerSection.appendChild(playerStatus);

  // main section to display computer board
  const computerSection = document.createElement("section");
  computerSection.classList.add("playground-section", "computer-section");

  const computerTitle = document.createElement("h2");
  computerTitle.textContent = "Computer";

  const computerBoard = computerGameboard;

  const computerStatus = document.createElement("span");
  computerStatus.classList.add("status-text", "computer-status-text");

  computerSection.appendChild(computerTitle);
  computerSection.appendChild(computerBoard);
  computerSection.appendChild(computerStatus);

  // mother container to apply flex column for both sections
  const playgroundContainer = document.createElement("div");
  playgroundContainer.classList.add("playground-container");

  playgroundContainer.appendChild(playerSection);
  playgroundContainer.appendChild(computerSection);

  main.appendChild(playgroundContainer);
}
