import { viewer } from "./editor";

export function getUrl() {
  const paramsLocation = window.location.pathname.split("/");
  const len = paramsLocation.length;
  return {
    locationName: paramsLocation[1],
    itemId: paramsLocation[2],
    method: paramsLocation[len - 1]
  };
}

export async function getEditorData() {
  const { locationName, itemId } = getUrl();

  const data = await fetch(`/api/${itemId}/${locationName}-data`, {
    headers: { "Content-Type": "application/json" },
    method: "GET"
  });

  const response = await data.json();

  const {
    data: { paragraph }
  } = response;

  viewer.setMarkdown(paragraph);
}
getEditorData();
