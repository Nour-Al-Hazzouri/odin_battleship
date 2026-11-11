import { queryState } from "../../logic/gameState.js";

export default function changeStatus(turn) {
  const queries = queryState.getQueries();
  if (turn === "c") {
    queries.computerGrid.style.pointerEvents = "none";
    queries.playerStatus.textContent = "Computer's turn...";
    queries.computerStatus.textContent = "";
  } else if (turn === "p") {
    queries.computerGrid.style.pointerEvents = "auto";
    queries.playerStatus.textContent = "";
    queries.computerStatus.textContent = "Player's turn...";
  }
}
