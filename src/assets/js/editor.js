import Editor from "@toast-ui/editor";

const btn = document.querySelector("button");
const title = document.querySelector(".title");

const editor = new Editor({
  el: document.querySelector("#editor"),
  previewStyle: "vertical",
  height: "500px",
  initialEditType: "markdown"
});

async function handleEditor(e) {
  const editorBody = editor.getMarkdown();
  const headTitle = title.value;
  console.log(headTitle);
  const data = await fetch("/notice/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ headTitle, editorBody })
  });
}

btn.addEventListener("click", handleEditor);
