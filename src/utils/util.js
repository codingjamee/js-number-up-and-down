export function copyArr(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export function pushArr(arr, elem) {
  return arr.push(elem);
}
