import Editor from "@toast-ui/editor";

const editorContainer = document.getElementById("editor");
const updateContainer = document.getElementById("editor_update");

const btn = document.querySelector("button");
const title = document.querySelector(".title");

if (editorContainer) {
  const editor = new Editor({
    el: document.querySelector("#editor"),
    previewStyle: "vertical",
    height: "60vh",
    initialEditType: "markdown",
    toolbarItems: [
      ["heading", "bold", "italic", "strike"],
      ["hr", "quote"],
      ["ul", "ol", "task", "indent", "outdent"],
      ["table", "link"],
      ["code", "codeblock"]
    ],
    language: "ko",
    placeholder: "내용을 입력하세요."
  });

  async function handleEditor(e) {
    const editorBody = editor.getMarkdown();
    const headTitle = title.value;

    const data = await fetch("/notice/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ headTitle, editorBody })
    });

    const response = await data.json();

    if (data.status === 303) {
      const {
        data: { _id }
      } = response;
      console.log(_id);
      window.location.pathname = `/notice/${_id}`;
    }
  }

  btn.addEventListener("click", handleEditor);
}

if (updateContainer) {
  const id = window.location.pathname.split("/")[2];

  async function getData() {
    const data = await fetch(`/api/${id}/notice-data`, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    });
    const response = await data.json();
    const {
      notice: { paragraph }
    } = response;

    return paragraph;
  }

  const update = new Editor({
    el: document.querySelector("#editor_update"),
    previewStyle: "vertical",
    height: "60vh",
    initialEditType: "markdown",
    toolbarItems: [
      ["heading", "bold", "italic", "strike"],
      ["hr", "quote"],
      ["ul", "ol", "task", "indent", "outdent"],
      ["table", "link"],
      ["code", "codeblock"]
    ],
    language: "ko",
    placeholder: "내용을 입력하세요."
  });

  getData().then((result) => update.setMarkdown(result));

  async function handleEditor(e) {
    const editorBody = update.getMarkdown();
    const headTitle = title.value;

    const data = await fetch(`/notice/${id}/edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ headTitle, editorBody })
    });

    const response = await data.json();

    if (data.status === 303) {
      const {
        data: { _id }
      } = response;

      window.location.pathname = `/notice/${_id}`;
    }
  }

  btn.addEventListener("click", handleEditor);
}
