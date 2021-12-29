// requestHTTP
import { getUrl, editorBodyData } from "./get";

export function redirect(response, pathName) {
  const {
    data: { _id }
  } = response;
  window.location.pathname = `/${pathName}/${_id}`;
}

export async function createEditorData(body) {
  const { pathName, method } = getUrl();

  const request = await fetch(`/${pathName}/${method}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector(
        "meta[name='csrf-token']"
      )["content"]
    },
    body: JSON.stringify({ ...body })
  });

  const result = await request.json();

  if (request.status === 200) return redirect(result, pathName);
}

export async function editEditorData(body) {
  const { pathName, id } = getUrl();
  const request = await fetch(`/${pathName}/${id}/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector(
        "meta[name='csrf-token']"
      )["content"]
    },
    body: JSON.stringify({ ...body })
  });

  const result = await request.json();

  if (request.status === 200) return redirect(result, pathName);
}

export function handleClick(event) {
  const body = editorBodyData();
  const { method } = getUrl();
  console.log(method);
  if (method !== "edit") {
    createEditorData(body);
  } else {
    editEditorData(body);
  }
}
