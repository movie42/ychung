import {
  menuButton,
  closeButton,
  sendButton,
  editorTitle,
  editorCheckbox,
  editorContainer,
  viewContainer
} from "./selectors";
import { handleOpenMenu, handleCloseMenu } from "./menu";
import { handleClick } from "./send";
import { getEditorData } from "./get";
import { editor } from "./editor";
import { viewer } from "./viewer";

// mouse event

// menu button event
menuButton !== null
  ? menuButton.addEventListener("click", handleOpenMenu)
  : null;
closeButton !== null
  ? closeButton.addEventListener("click", handleCloseMenu)
  : null;

// editor send button event

sendButton !== null
  ? sendButton.addEventListener("click", handleClick)
  : null;

// keyborad event

// menu button event
menuButton !== null
  ? menuButton.addEventListener("keydown", handleOpenMenu)
  : null;
closeButton !== null
  ? closeButton.addEventListener("keydown", handleCloseMenu)
  : null;

// document event

// edit
editorContainer !== null
  ? getEditorData(function () {
      const {
        data: { title, paragraph, isWeekly }
      } = arguments[0];

      editorTitle.value = title;
      editorCheckbox.checked = isWeekly;

      editor.setMarkdown(paragraph);
    })
  : null;

// view
viewContainer !== null
  ? getEditorData(function () {
      const {
        data: { paragraph }
      } = arguments[0];

      viewer.setMarkdown(paragraph);
    })
  : null;
