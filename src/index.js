import "./styles.css";
import { renderHome } from "./ui/main/home.js";

const homeButton = document.querySelector("#home");
homeButton.addEventListener("click", renderHome);

renderHome();
