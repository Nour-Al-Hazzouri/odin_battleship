// validate coordinates to be between [0][0] and [9][9]
export default function validateCoordinates(x, y) {
  if (x < 0 || x > 9 || y < 0 || y > 9) return false;
  return true;
}
