// requestHTTP
import { getUrl, editorBodyData } from "./get";

export function redirect(response, locationName) {
  const {
    data: { _id }
  } = response;
  window.location.pathname = `/${locationName}/${_id}`;
}

export async function createEditorData(body, path) {
  const { locationName } = path;

  const request = await fetch(`/${locationName}/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector(
        "meta[name='csrf-token']"
      )["content"]
    },
    body: JSON.stringify({ body })
  });

  const result = await request.json();

  if (request.status === 200) return redirect(result, locationName);
}

export async function editEditorData(body, path) {
  const { locationName, itemId } = path;

  const request = await fetch(`/${locationName}/${itemId}/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector(
        "meta[name='csrf-token']"
      )["content"]
    },
    body: JSON.stringify({ body })
  });

  const result = await request.json();

  if (request.status === 200) return redirect(result, locationName);
}

export function handleClick(event) {
  const body = editorBodyData();
  const path = getUrl();
  if (path.method === "upload") {
    createEditorData(body, path);
  } else {
    editEditorData(body, path);
  }
}
