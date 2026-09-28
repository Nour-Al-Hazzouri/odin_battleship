export function createBoardGrid() {
  const boardGrid = document.createElement("div");
  boardGrid.classList.add("board-grid");

  // nested for loop to get coordinates correctly
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cellBtn = document.createElement("button");
      cellBtn.dataset.coordinates = `[${i}, ${j}]`;
      // make them accept draggable ships
      cellBtn.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      cellBtn.addEventListener("drop", (e) => {
        e.preventDefault();
        // Retrieve the data we saved during dragstart
        const ship = e.dataTransfer.getData("text/plain");
        if (ship) {
          cellBtn.innerHTML = ship;
        }

        // Handle your game state logic here (e.g., place visual, update array)
      });
      cellBtn.classList.add("cell-btn");
      boardGrid.appendChild(cellBtn);
    }
  }
  return boardGrid;
}
