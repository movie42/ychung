import {
  menuContainer,
  hideMenuContainer,
  ComponentWrapper,
  getSelector,
  getSelectorAll,
} from "./selectors";

export const handleOpenMenu = (event) => {
  if (event.key === "Enter" || event.type === "click")
    menuContainer.classList.add("block");
};

export const handleCloseMenu = (event) => {
  if (event.key === "Enter" || event.type === "click")
    menuContainer.classList.remove("block");
};

export function handleHiddenMenu(event) {
  let scrollHeight = window.scrollY;

  if (event.deltaY < -2) {
    hideMenuContainer.classList.add("active");
  } else if (event.deltaY > 2) {
    hideMenuContainer.classList.remove("active");
  }

  if (scrollHeight < 80) {
    hideMenuContainer.classList.remove("active");
  }
}

export function debounce(func, limit = 100) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, limit);
  };
}

export function sideMenuHandler() {
  const width = window.innerWidth;

  function beMenu(className) {
    return getSelector(className) !== null;
  }

  function _filter(arr, func) {
    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
      if (func(arr[i])) {
        newArray.push(arr[i]);
      }
    }
    return newArray;
  }

  function createMenu(node) {
    const viewContainer = getSelector(".toastui-editor-contents");
    if (viewContainer === null) {
      return;
    }
    const tagList = viewContainer.childNodes;
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
      link.innerText =
        textValue.length < 10 ? textValue : `${textValue.slice(0, 10)}...`;
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
