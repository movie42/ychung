import { editor } from "./editor";

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
  const headTitle = document.querySelector(
    "input[name='title']"
  ).value;
  const checkbox = document.querySelector("input[name='isWeekly']");
  const editorBody = editor.getMarkdown();
  const isWeekly = checkbox ? checkbox.checked : null;

  return {
    headTitle,
    editorBody,
    isWeekly
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
