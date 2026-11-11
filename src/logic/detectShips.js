export default function detectShips(player, board) {
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      if (player.Board[r][c].Ship !== null) {
        const cellBtn = board.children[r * 10 + c];
        cellBtn.style.backgroundColor = "steelblue";
      }
    }
  }
}
