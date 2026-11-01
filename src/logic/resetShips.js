export default function resetShips(element) {
  if (element) {
    element.style.position = "";
    element.style.left = "";
    element.style.top = "";
    document.querySelector(".actual-ships-grid").appendChild(element);
    return;
  }

  for (let i = 0; i < 5; i++) {
    const currentSVG = document.querySelector(`#svg-${i}`);
    if (currentSVG) {
      currentSVG.style.position = "";
      currentSVG.style.left = "";
      currentSVG.style.top = "";
      currentSVG.querySelector("svg").classList.remove("vertical");
      document.querySelector(".actual-ships-grid").appendChild(currentSVG);
    }
  }
}
