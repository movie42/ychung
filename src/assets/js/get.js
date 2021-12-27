import { editor } from "./editor";
import { form } from "./selectors";

export function getUrl() {
  const windowLocation = window.location.pathname
    .split("/")
    .filter((value) => value !== "");
  const len = windowLocation.length;

  const id = (function () {
    return windowLocation
      .filter((value) => {
        if (/[0-9a-f]{24}/.exec(value) !== null) {
          return value;
        }
      })
      .join("");
  })();

  const idIndex = windowLocation.indexOf(id);

  if (+idIndex !== -1) {
    const pathName = windowLocation.slice(0, idIndex).join("/");
    const method = windowLocation.slice(idIndex + 1).join("");

    return {
      pathName,
      id,
      method,
    };
  } else {
    const method = windowLocation[len - 1];
    const methodIndex = windowLocation.indexOf(method);
    const pathName = windowLocation.splice(0, methodIndex).join("/");

    return {
      pathName,
      method,
    };
  }
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
    editorBody,
  };
}

export async function getEditorData(func) {
  const { pathName, id } = getUrl();

  const request = await fetch(`/api/${pathName}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector("meta[name='csrf-token']")[
        "content"
      ],
    },
  });

  const response = await request.json();

  return func(response);
}
