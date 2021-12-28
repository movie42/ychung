import { menuContainer, hideMenuContainer } from "./selectors";

export const handleOpenMenu = (event) => {
  if (event.key === "Enter" || event.type === "click")
    menuContainer.classList.add("block");
};

export const handleCloseMenu = (event) => {
  if (event.key === "Enter" || event.type === "click")
    menuContainer.classList.remove("block");
};

export function handleLogo() {
  let scrollHeight = window.scrollY;
  if (scrollHeight < 80) {
    hideMenuContainer.classList.remove("active");
  } else {
    hideMenuContainer.classList.add("active");
  }
}
