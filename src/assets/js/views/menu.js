import { $ } from "../utils/utils";
import { eventTrigger, windowEventTrigger } from "../events/event";
import { _filter } from "../utils/helperFunctions";

class Menu {
  constructor() {
    this.prevHeight = 0;
    this.menuContainer = $(".menu_block");
    this.fixedHeaderOnTop = $("#top_fixed_header");
    this.top = this.fixedHeaderOnTop.style.top;
    this.init();
  }

  init() {
    eventTrigger("#menu_button", this.showMenuBlock, "click", "keydown");
    eventTrigger(".close_button", this.showMenuBlock, "click", "keydown");
    eventTrigger(
      "#menu_button_hide_menu",
      this.showMenuBlock,
      "click",
      "keydown"
    );
    windowEventTrigger(
      "#top_fixed_header",
      this.controlHiddenHeader,
      "scroll",
      "load"
    );
    windowEventTrigger(".side_menu", this.sideMenuHandler, "load", "resize");
  }

  showMenuBlock = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      this.menuContainer.classList.toggle("block");
    }
  };

  controlHiddenHeader = () => {
    let scrollHeight = window.scrollY;
    let remain = this.prevHeight - scrollHeight;

    if (scrollHeight < 60) {
      this.fixedHeaderOnTop.classList.add("hidden");
      this.fixedHeaderOnTop.classList.remove("active");
    }

    // up
    if (remain >= 0 && this.top < 0) {
      this.top += remain;
      if (this.top > 0) {
        this.top = 0;
      }
      this.fixedHeaderOnTop.classList.remove("hidden");
      this.fixedHeaderOnTop.classList.add("active");
      this.fixedHeaderOnTop.style.top = `${this.top}px`;
    }

    // down
    if (remain <= 0 && this.top > -76 && scrollHeight > 80) {
      this.top -= -remain;
      if (this.top < -76) {
        this.top = -76;
      }
      this.fixedHeaderOnTop.classList.remove("hidden");
      this.fixedHeaderOnTop.style.top = `${this.top}px`;
    } else if (this.top < -76) {
      this.top = -76;
    }
    this.prevHeight = scrollHeight;
  };

  sideMenuHandler() {
    console.log("hi");
    const viewParagraphContainer = $(".toastui-editor-contents");
    const width = window.innerWidth;

    function beMenu(className) {
      return $(className) !== null;
    }

    function createMenu(node) {
      const tagList = viewParagraphContainer.childNodes;
      const titleList = _filter(
        tagList,
        (node) =>
          node.nodeName !== "#text" &&
          node.nodeName !== "P" &&
          node.nodeName !== "UL"
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
}

export default Menu;
