export function copyObject(object) {
  return JSON.parse(JSON.stringify(object));
}

export function pushArray(array, elem) {
  return array.push(elem);
}
