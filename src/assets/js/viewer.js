import View from "@toast-ui/editor/dist/toastui-editor-viewer";
import { getEditorData } from "./get";

const viewer = (async function () {
  const viewerContainer = document.querySelector("#viewer");

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
                attributes: node.attrs,
              },
              { type: "html", content: node.childrenHTML },
              {
                type: "closeTag",
                tagName: "iframe",
                outerNewLine: true,
              },
            ];
          },
        },
      },
    });
  }

  if (viewerContainer !== null) {
    const paragraph = await getEditorData();
    paintView(viewerContainer).setMarkdown(paragraph);
  }
})();
