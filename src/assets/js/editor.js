import Editor from "@toast-ui/editor";

export const editor = (function () {
  const editor = document.querySelector("#editor");

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
      previewStyle: "vertical",
      height: "60vh",
      initialEditType: "markdown",
      toolbarItems: [
        ["heading", "bold", "italic", "strike"],
        ["hr", "quote"],
        ["ul", "ol", "task"],
        ["table", "image", "link"],
        ["code", "codeblock"],
      ],
      language: "ko",
      placeholder: "내용을 입력하세요.",
      hooks: {
        addImageBlobHook: async (blob, callback) => {
          let formData = new FormData();

          formData.append("data", blob, blob.name);

          const response = await fetch("/api/post-image", {
            method: "POST",
            body: formData,
          });

          const { data } = await response.json();
          callback(data, "alt text");
        },
      },
      exts: ["youtube"],
    });
  }

  return editor !== null ? paintEditor(editor) : null;
})();
