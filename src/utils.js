export function move(arr, fromInd, toInd) {
  if (toInd < 0 || toInd >= arr.length) return arr;

  const newArr = [...arr];
  const value = newArr.splice(fromInd, 1)[0];
  newArr.splice(toInd, 0, value);
  return newArr;
}
