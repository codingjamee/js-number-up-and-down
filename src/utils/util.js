export function copyObject(object) {
  return JSON.parse(JSON.stringify(object));
}

export function pushArray(array, elem) {
  return array.push(elem);
}

export function addNumber(number) {
  return number + 1;
}

export function toNumber(number) {
  return parseFloat(number);
}

export function mutateDOM() {
  return {
    addChild(target, children) {
      target.innerHTML = children;
    },
    removeChild(target, children) {
      if (target.parentNode) {
        target.parentNode.removeChild(children);
      }
    },
  };
}
