// requestHTTP
import { sendButton } from "./button";
import { editor } from "./editor";

function editorBodyData() {
  const headTitle = document.querySelector("input[name='title']").value;
  const checkbox = document.querySelector("input[name='isWeekly']");
  const editorBody = editor.getMarkdown();
  const isWeekly = checkbox ? checkbox.checked : null;

  return {
    headTitle,
    editorBody,
    isWeekly,
  };
}

function getUrl() {
  const paramsLocation = window.location.pathname.split("/");
  const len = paramsLocation.length;
  return {
    locationName: paramsLocation[1],
    itemId: paramsLocation[2],
    method: paramsLocation[len - 1],
  };
}

function redirect(response, locationName) {
  const {
    data: { _id },
  } = response;
  window.location.pathname = `/${locationName}/${_id}`;
}

export async function createEditorData(body, path) {
  const { locationName } = path;
  const request = await fetch(`/${locationName}/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector("meta[name='csrf-token']")[
        "content"
      ],
    },
    body: JSON.stringify({ body }),
  });

  const result = await request.json();

  if (request.status === 200) return redirect(result, locationName);
}

export async function editEditorData(event) {
  const { locationName, itemId } = path;
  const body = editorBodyData();

  const request = await fetch(`/${locationName}/${itemId}/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector("meta[name='csrf-token']")[
        "content"
      ],
    },
    body: JSON.stringify({ body }),
  });

  const result = await request.json();

  if (request.status === 200) return redirect(result, locationName);
}

function handleClick(event) {
  const body = editorBodyData();
  const path = getUrl();
  if (path.method === "upload") {
    createEditorData(body, path);
  } else {
    editEditorData(body, path);
  }
}

if (sendButton) {
  sendButton.addEventListener("click", handleClick);
}
