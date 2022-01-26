export function getSelector(attr) {
  return document.querySelector(attr);
}
export function getSelectorAll(attr) {
  return document.querySelectorAll(attr);
}

// button
export const menuButton = getSelector("#menu_button");
export const menuButtonHideMenu = getSelector("#menu_button_hide_menu");
export const closeButton = getSelector(".close_button");
export const sendButton = getSelector(".send_btn");
export const toggleButton = getSelector(
  ".list_wrapper .list_item li a .isWeeklyButton label .box",
);
export const toggleButtons = getSelectorAll(
  ".list_wrapper .list_item li a .isWeeklyButton label .box",
);

// container
export const editor = getSelector("#editor");
export const menuContainer = getSelector(".menu_block");
export const hideMenuContainer = getSelector("#fixed_header");
export const ComponentWrapper = getSelector(".component_wrapper");

// editor
export const editorContainer = getSelector("#editor");
export const updateContainer = getSelector("#editor.update");
export const viewContainer = getSelector("#viewer");

export const editorTitle = getSelector(
  ".form_container.editor_container form input[name='title']",
);
export const editorCheckbox = getSelector(
  ".form_container.editor_container form div input[name='isWeekly']",
);

// form
export const form = getSelector(".form_container form");
export const worshipFormContainer = getSelector(".form_container.worship_form");
export const formInputList = getSelectorAll(".form_container form input");
export const formSelector = getSelector(".form_container form select");
export const joinForm = document.querySelector(".form_container#join form");
export const joinInput = document.querySelectorAll(
  ".form_container#join form input",
);
export const joinSubmitButton = document.querySelector(
  ".form_container#join form button",
);

//accounting
export const accountingForm = getSelector(".accounting_form");
export const gridWrapper = getSelector("#grid_wrapper");

// headers

export const logo22 = getSelector(".logo_2022");
export const logoBasic = getSelector(".logo_basic");
export const header = getSelector("header");

// list
export const list = getSelector(".list_wrapper .list_item li");
