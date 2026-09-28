export function createBoardGrid() {
  const boardGrid = document.createElement("div");
  boardGrid.classList.add("board-grid");
  for (let i = 0; i < 100; i++) {
    const cellBtn = document.createElement("button");
    cellBtn.classList.add("cell-btn");
    boardGrid.appendChild(cellBtn);
  }
  return boardGrid;
}
