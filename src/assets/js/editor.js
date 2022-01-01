import Editor from "@toast-ui/editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { editorContainer } from "./selectors";

export const editor = (function () {
  function paintEditor(attr) {
    return new Editor({
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
      },
      previewStyle: "vertical",
      height: "70vh",
      initialEditType: "markdown",
      toolbarItems: [
        ["heading", "bold", "italic", "strike"],
        ["hr", "quote"],
        ["ul", "ol", "task"],
        ["table", "image", "link"],
        ["code", "codeblock"]
      ],
      language: "ko-KR",
      placeholder: "내용을 입력하세요.",
      hooks: {
        addImageBlobHook: async (blob, callback) => {
          let formData = new FormData();

          formData.append("data", blob, blob.name);

          const response = await fetch("/api/post-image", {
            method: "POST",
            headers: {
              "X-CSRF-Token": document.querySelector("meta[name='csrf-token']")["content"]
            },
            body: formData
          });

          const { data } = await response.json();
          callback(data, "alt text");
        }
      },
      exts: ["youtube"],
      plugins: [colorSyntax]
    });
  }

  return editorContainer !== null ? paintEditor(editorContainer) : null;
})();
