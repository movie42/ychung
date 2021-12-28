import {
  menuButton,
  closeButton,
  sendButton,
  editorTitle,
  editorCheckbox,
  updateContainer,
  viewContainer,
  formInputList,
  worshipFormContainer,
  formSelector,
  menuButtonHideMenu,
} from "./selectors";
import {
  handleOpenMenu,
  handleCloseMenu,
  handleHiddenMenu,
  sideMenuHandler,
  debounce,
} from "./menu";
import { handleClick } from "./send";
import { getEditorData } from "./get";
import { editor } from "./editor";
import { viewer } from "./viewer";

// mouse event

// menu button event
menuButton !== null
  ? menuButton.addEventListener("click", handleOpenMenu)
  : null;
menuButtonHideMenu !== null
  ? menuButtonHideMenu.addEventListener("click", handleOpenMenu)
  : null;
closeButton !== null
  ? closeButton.addEventListener("click", handleCloseMenu)
  : null;

// editor send button event

sendButton !== null ? sendButton.addEventListener("click", handleClick) : null;

// keyborad event

// menu button event
menuButton !== null
  ? menuButton.addEventListener("keydown", handleOpenMenu)
  : null;
menuButtonHideMenu !== null
  ? menuButtonHideMenu.addEventListener("keydown", handleOpenMenu)
  : null;
closeButton !== null
  ? closeButton.addEventListener("keydown", handleCloseMenu)
  : null;

// document event

// edit
updateContainer !== null
  ? getEditorData(function () {
      const {
        data: { title, paragraph, isWeekly },
      } = arguments[0];

      editorTitle.value = title;
      editorCheckbox ? (editorCheckbox.checked = isWeekly) : null;

      editor.setMarkdown(paragraph);
    })
  : null;

// view
viewContainer !== null
  ? getEditorData(function () {
      const {
        data: { paragraph },
      } = arguments[0];

      viewer.setMarkdown(paragraph);
    })
  : null;

// worship
worshipFormContainer !== null
  ? getEditorData(function () {
      const { data } = arguments[0];
      formSelector.value = data.word;
      formInputList.forEach((input) => {
        if (input.name) {
          input.value = data[input.name];
        }
      });
    })
  : null;

// header scroll Event

window.addEventListener("wheel", handleHiddenMenu);

window.addEventListener("load", sideMenuHandler);
window.addEventListener("resize", debounce(sideMenuHandler, 100));
