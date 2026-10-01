export function createBoardGrid(player) {
  const boardGrid = document.createElement("div");
  boardGrid.classList.add("board-grid");

  // nested for loop to get coordinates correctly
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cellBtn = document.createElement("button");
      cellBtn.dataset.coordinates = `[${i}, ${j}]`;
      cellBtn.classList.add("cell-btn");
      if (player === "c") {
        cellBtn.classList.add("computer-cell-button");
      }
      boardGrid.appendChild(cellBtn);
    }
  }
  return boardGrid;
}
