export const $ = (selector) => document.querySelector(selector);
export const $All = (selector) => document.querySelectorAll(selector);

export function redirectItemDetail(url) {
  return (window.location.pathname = url);
}

export function getCurrentUrl() {
  const windowLocation = window.location.pathname
    .split("/")
    .filter((value) => value !== "");
  return windowLocation;
}

export function getCurrentUrlId() {
  const windowLocation = getCurrentUrl();

  const id = (function () {
    return windowLocation
      .filter((value) => {
        if (/[0-9a-f]{24}/.exec(value) !== null) {
          return value;
        }
      })
      .join("");
  })();

  return id;
}
