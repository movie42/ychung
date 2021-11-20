import Editor from "@toast-ui/editor";

const editorContainer = document.getElementById("editor");
const updateContainer = document.getElementById("editor_update");

const btn = document.querySelector(".send_editor_btn");
const title = document.querySelector(".title");
const checkbox = document.querySelector("#isWeekly");

if (editorContainer) {
  const editor = new Editor({
    el: document.querySelector("#editor"),
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
    height: "60vh",
    initialEditType: "markdown",
    toolbarItems: [
      ["heading", "bold", "italic", "strike"],
      ["hr", "quote"],
      ["ul", "ol", "task"],
      ["table", "image", "link"],
      ["code", "codeblock"]
    ],
    language: "ko",
    placeholder: "내용을 입력하세요.",
    hooks: {
      addImageBlobHook: async (blob, callback) => {
        let formData = new FormData();

        formData.append("data", blob, blob.name);

        const response = await fetch("/api/post-image", {
          method: "POST",
          body: formData
        });

        const { data } = await response.json();
        callback(data, "alt text");
      }
    },
    exts: ["youtube"]
  });

  async function handleEditor(e) {
    const paramsLocation = window.location.pathname.split("/");
    const locationName = paramsLocation[1];
    const editorBody = editor.getMarkdown();
    const headTitle = title.value;
    const isWeekly = checkbox ? checkbox.checked : null;

    const data = await fetch(`/${locationName}/upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ headTitle, isWeekly, editorBody })
    });

    const response = await data.json();

    if (data.status === 201) {
      const {
        data: { _id }
      } = response;
      window.location.pathname = `/${locationName}/${_id}`;
    }
  }

  btn.addEventListener("click", handleEditor);
}

if (updateContainer) {
  async function getData() {
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

    const { data: dbData } = response;
    return dbData;
  }

  function getCheckBox(bool) {
    checkbox.checked = bool;
  }

  const update = new Editor({
    el: document.querySelector("#editor_update"),
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
    height: "60vh",
    initialEditType: "markdown",
    toolbarItems: [
      ["heading", "bold", "italic", "strike"],
      ["hr", "quote"],
      ["ul", "ol", "task"],
      ["table", "image", "link"],
      ["code", "codeblock"]
    ],
    language: "ko",
    placeholder: "내용을 입력하세요.",
    hooks: {
      addImageBlobHook: async (blob, callback) => {
        let formData = new FormData();

        formData.append("data", blob, blob.name);

        const response = await fetch("/api/post-image", {
          method: "POST",
          body: formData
        });

        const { data } = await response.json();
        callback(data, "alt text");
      }
    }
  });

  getData().then((result) => {
    checkbox ? getCheckBox(result.isWeekly) : null;
    update.setMarkdown(result.paragraph);
  });

  async function handleEditor(e) {
    const paramsLocation = window.location.pathname.split("/");
    const locationName = paramsLocation[1];
    const locationId = paramsLocation[2];
    const editorBody = update.getMarkdown();
    const headTitle = title.value;
    const isWeekly = checkbox ? checkbox.checked : null;

    const data = await fetch(`/${locationName}/${locationId}/edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ headTitle, isWeekly, editorBody })
    });

    const response = await data.json();

    if (data.status === 200) {
      const {
        data: { _id }
      } = response;

      window.location.pathname = `/${locationName}/${_id}`;
    }
  }

  btn.addEventListener("click", handleEditor);
}
