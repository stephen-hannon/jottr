export function move<T>(arr: T[], fromInd: number, toInd: number): T[] {
  if (toInd < 0 || toInd >= arr.length) return arr;

  const newArr = [...arr];
  const value = newArr.splice(fromInd, 1)[0];
  newArr.splice(toInd, 0, value);
  return newArr;
}
