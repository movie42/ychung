import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
const viewContainer = document.querySelector("#viewer");
if (viewContainer) {
  const viewer = new Viewer({
    el: document.querySelector("#viewer"),
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

  const getData = async () => {
    const paramsLocation = window.location.pathname.split("/");
    const locationName = paramsLocation[1];
    const locationId = paramsLocation[2];

    const data = await fetch(
      `/api/${locationId}/${locationName}-data`,
      {
        headers: { "Content-Type": "application/json" },
        method: "GET"
      }
    );

    const response = await data.json();

    const {
      data: { paragraph }
    } = response;

    viewer.setMarkdown(paragraph);
  };

  getData();
}
