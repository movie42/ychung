import View from "@toast-ui/editor/dist/toastui-editor-viewer";
import { viewContainer } from "./selectors";

export const viewer = (function () {
  function paintView(attr) {
    return new View({
      el: attr,
      customHTMLRenderer: {
        htmlBlock: {
          iframe(node) {
            return [
              {
                type: "openTag",
                tagName: "iframe",
                outerNewLine: true,
                attributes: node.attrs
              },
              { type: "html", content: node.childrenHTML },
              {
                type: "closeTag",
                tagName: "iframe",
                outerNewLine: true
              }
            ];
          }
        }
      }
    });
  }

  return viewContainer !== null ? paintView(viewContainer) : null;
})();
