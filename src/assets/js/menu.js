import { menuContainer } from "./selectors";

export const handleOpenMenu = (event) => {
  if (event.key === "Enter" || event.type === "click")
    menuContainer.classList.add("block");
};

export const handleCloseMenu = (event) => {
  if (event.key === "Enter" || event.type === "click")
    menuContainer.classList.remove("block");
};
