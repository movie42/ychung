export function getSelector(attr) {
  return document.querySelector(attr);
}

// button
export const menuButton = getSelector("#menu_button");
export const closeButton = getSelector(".close_button");
export const sendButton = getSelector(".send_btn");

// container
export const editor = getSelector("#editor");
export const menuContainer = getSelector(".menu_block");
