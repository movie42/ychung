import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";

const viewer = new Viewer({
  el: document.querySelector("#viewer")
});

const getData = async () => {
  const id = window.location.pathname.split("/")[2];

  const data = await fetch(`/api/${id}/notice-data`, {
    headers: { "Content-Type": "application/json" },
    method: "GET"
  });

  const response = await data.json();

  const {
    notice: { paragraph }
  } = response;

  viewer.setMarkdown(paragraph);
};

getData();
