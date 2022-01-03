import {
  menuContainer,
  hideMenuContainer,
  ComponentWrapper,
  getSelector,
  getSelectorAll,
} from "./selectors";

import { _filter } from "./helperFunction";

let prevHeight = 0;
let top = hideMenuContainer.style.top;

export const handleOpenMenu = (event) => {
  if (event.key === "Enter" || event.type === "click")
    menuContainer.classList.add("block");
};

export const handleCloseMenu = (event) => {
  if (event.key === "Enter" || event.type === "click")
    menuContainer.classList.remove("block");
};

export function handleHiddenMenu() {
  let scrollHeight = window.scrollY;
  let remain = prevHeight - scrollHeight;

  if (scrollHeight < 60) {
    hideMenuContainer.classList.add("hidden");
    hideMenuContainer.classList.remove("active");
  }

  // up
  if (remain >= 0 && top < 0) {
    top += remain;
    if (top > 0) {
      top = 0;
    }
    hideMenuContainer.classList.remove("hidden");
    hideMenuContainer.classList.add("active");
    hideMenuContainer.style.top = `${top}px`;
  }

  // down
  if (remain <= 0 && top > -76 && scrollHeight > 80) {
    top -= -remain;
    if (top < -76) {
      top = -76;
    }
    hideMenuContainer.classList.remove("hidden");
    hideMenuContainer.style.top = `${top}px`;
  } else if (top < -76) {
    top = -76;
  }
  prevHeight = scrollHeight;
}

export function sideMenuHandler() {
  const viewParagraphContainer = getSelector(".toastui-editor-contents");
  const width = window.innerWidth;

  function beMenu(className) {
    return getSelector(className) !== null;
  }

  function createMenu(node) {
    const tagList = viewParagraphContainer.childNodes;
    const titleList = _filter(
      tagList,
      (node) =>
        node.nodeName !== "#text" &&
        node.nodeName !== "P" &&
        node.nodeName !== "UL",
    );

    const listContainer = document.createElement("ul");
    node.append(listContainer);

    for (let i = 0; i < titleList.length; i++) {
      const list = document.createElement("li");
      const link = document.createElement("a");
      titleList[i].id = `title${i}`;
      const textValue = titleList[i].innerText;
      link.innerText = textValue.length < 10 ? textValue : `${textValue}`;
      link.setAttribute("href", `#${titleList[i].id}`);

      list.append(link);
      listContainer.append(list);
    }
  }

  const sideMenu = beMenu(".side_menu");

  if (ComponentWrapper !== null && width > 1200 && !sideMenu) {
    const sideMenuContainer = document.createElement("div");
    ComponentWrapper.prepend(sideMenuContainer);

    sideMenuContainer.classList.add("side_menu");
    sideMenuContainer.classList.add("active");

    createMenu(sideMenuContainer);
  } else if (width < 1200 && sideMenu) {
    const sideMenuContainer = getSelector(".side_menu");
    sideMenuContainer.remove();
  }
}
