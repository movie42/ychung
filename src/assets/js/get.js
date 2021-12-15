import { editor } from "./editor";

export function getUrl() {
  const paramsLocation = window.location.pathname.split("/");
  const len = paramsLocation.length;
  return {
    locationName: paramsLocation[1],
    itemId: paramsLocation[2],
    method: paramsLocation[len - 1],
  };
}

export function editorBodyData() {
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

export async function getEditorData() {
  const { locationName, itemId } = getUrl();

  const data = await fetch(`/api/${itemId}/${locationName}-data`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });

  const response = await data.json();

  const {
    data: { paragraph },
  } = response;

  return paragraph;
}
