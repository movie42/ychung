export function _debounce(func, limit = 100) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, limit);
  };
}

export function _throttle(func, limit = 100) {
  let wait = false;
  return function () {
    if (!wait) {
      func.apply(this, arguments);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
}

export function _filter(arr, func) {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i])) {
      newArray.push(arr[i]);
    }
  }
  return newArray;
}
