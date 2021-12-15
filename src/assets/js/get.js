import { editor } from "./editor";
import { form, verseSelector } from "./selectors";

export function getUrl() {
  const paramsLocation = window.location.pathname.split("/");
  const len = paramsLocation.length;
  return {
    locationName: paramsLocation[1],
    itemId: paramsLocation[2],
    method: paramsLocation[len - 1]
  };
}

export function editorBodyData() {
  const getForm = new FormData(form);
  const editorBody = editor ? editor.getMarkdown() : null;

  const formData = {};
  for (let [name, value] of getForm) {
    formData[name] = value;
  }

  return {
    formData,
    editorBody
  };
}

export async function getEditorData(func) {
  const { locationName, itemId } = getUrl();

  const request = await fetch(`/api/${locationName}/${itemId}/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector(
        "meta[name='csrf-token']"
      )["content"]
    }
  });

  const response = await request.json();

  return func(response);
}
