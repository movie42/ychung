// requestHTTP

import { getUrl, editorBodyData } from "./get";
import { _filter } from "./helperFunction";

export function redirect(response, pathName) {
  const {
    data: { _id },
  } = response;
  window.location.pathname = `/${pathName}/${_id}`;
}

export async function createEditorData(body) {
  const { pathName, method } = getUrl();

  const request = await fetch(`/${pathName}/${method}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector("meta[name='csrf-token']")[
        "content"
      ],
    },
    body: JSON.stringify({ ...body }),
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
      "X-CSRF-Token": document.querySelector("meta[name='csrf-token']")[
        "content"
      ],
    },
    body: JSON.stringify({ ...body }),
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

export async function handleChecker(event) {
  const currentTarget = event.currentTarget;
  const dataId = currentTarget.parentNode.dataset.id;

  const toggleButton = currentTarget;
  const toggleButtonBall = _filter(currentTarget.children, (node) => node)[0];

  const request = await fetch(`/api/notice/isWeekly`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector("meta[name='csrf-token']")[
        "content"
      ],
    },
    body: JSON.stringify({ dataId }),
  });

  const { data } = await request.json();

  if (data) {
    toggleButton.classList.add("active");
    toggleButtonBall.classList.add("active");
  } else {
    toggleButton.classList.remove("active");
    toggleButtonBall.classList.remove("active");
  }
}
