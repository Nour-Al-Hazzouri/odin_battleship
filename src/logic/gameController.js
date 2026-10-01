export function startBattleship(
  playerBoard,
  computerBoard,
  playerGameboard,
  computerGameboard,
) {
  let turn = 0;
  const gridButtons = document.querySelectorAll(".computer-cell-buttons");
  gridButtons.forEach((button) => {
    button.addEventListener("click");
  });
  while (!playerBoard.AllShipsStatus && !computerBoard.AllShipsStatus) {
    if (turn % 2 === 0) {
    }
  }
}
