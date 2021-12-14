import { menuButton, closeButton } from "./button";

const menuContainer = document.querySelector(".menu_block");

const handleOpenMenu = (event) => {
  if (event.key === "Enter" || event.type === "click")
    menuContainer.classList.add("block");
};

const handleCloseMenu = (event) => {
  if (event.key === "Enter" || event.type === "click")
    menuContainer.classList.remove("block");
};

menuButton.addEventListener("click", handleOpenMenu);
menuButton.addEventListener("keydown", handleOpenMenu);
closeButton.addEventListener("click", handleCloseMenu);
closeButton.addEventListener("keydown", handleCloseMenu);
