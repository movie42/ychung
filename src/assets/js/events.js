import { menuButton, closeButton } from "./selectors";

menuButton.addEventListener("click", handleOpenMenu);
menuButton.addEventListener("keydown", handleOpenMenu);
closeButton.addEventListener("click", handleCloseMenu);
closeButton.addEventListener("keydown", handleCloseMenu);
