// clear all children inside passed element
export function resetElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
