export function buttonSelector(attr) {
  return document.querySelector(attr);
}

export const menuButton = buttonSelector("#menu_button");
export const closeButton = buttonSelector(".close_button");
export const sendButton = buttonSelector(".send_btn");
