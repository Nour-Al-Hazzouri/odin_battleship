export function resetElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
