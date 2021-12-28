import { menuContainer, hideMenuContainer } from "./selectors";

export const handleOpenMenu = (event) => {
  if (event.key === "Enter" || event.type === "click")
    menuContainer.classList.add("block");
};

export const handleCloseMenu = (event) => {
  if (event.key === "Enter" || event.type === "click")
    menuContainer.classList.remove("block");
};

export function throttle(func, limit = 100) {
  let waiting = false;
  return function () {
    if (!waiting) {
      func.apply(this, arguments);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
}

export function handleLogo() {
  let scrollHeight = window.scrollY;
  if (scrollHeight < 80) {
    hideMenuContainer.classList.remove("active");
  } else {
    hideMenuContainer.classList.add("active");
  }
}
