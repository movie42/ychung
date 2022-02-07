import Editor from "@toast-ui/editor";
import View from "@toast-ui/editor/dist/toastui-editor-viewer";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { $, getCurrentUrlId } from "../utils/utils";
import { request, HTTP_METHOD, requestWithoutJson } from "../utils/fetch";

export const getEditor = () => {
  const editor = new Editor({
    el: $("#editor"),
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
    height: "70vh",
    initialEditType: "markdown",
    toolbarItems: [
      ["heading", "bold", "italic", "strike"],
      ["hr", "quote"],
      ["ul", "ol", "task"],
      ["table", "image", "link"],
      ["code", "codeblock"]
    ],
    language: "ko-KR",
    placeholder: "내용을 입력하세요.",
    hooks: {
      addImageBlobHook: async (blob, callback) => {
        let formData = new FormData();
        formData.append("data", blob, blob.name);
        const response = await fetch("/api/post-image", {
          method: "POST",
          headers: {
            "X-CSRF-Token": $("meta[name='csrf-token']")["content"]
          },
          body: formData
        });
        const { data } = await response.json();
        callback(data, "alt text");
      }
    },
    exts: ["youtube"],
    plugins: [colorSyntax]
  });
  return editor;
};

export const getViewer = () => {
  const view = new View({
    el: $("#viewer"),
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
    }
  });
  return view;
};

export const getEditorAndFormData = ({ form, editorBody }) => {
  const formData = new FormData(form);
  const newFormData = {};
  for (let [key, value] of formData) {
    newFormData[key] = value;
  }
  return {
    ...newFormData,
    editorBody
  };
};

export const createEditorData = async (data) => {
  const url = window.location.pathname;
  const response = await request(url, HTTP_METHOD.POST(data));
  return response;
};

export const getDataBase = async (url) => {
  const id = getCurrentUrlId();
  const response = await request(`${url}/${id}`, HTTP_METHOD.GET());
  return response;
};

export const updateEditorData = async (data) => {
  const url = window.location.pathname;
  const response = await request(url, HTTP_METHOD.PATCH(data));
  return response;
};

export const deleteEditorData = async (location) => {
  const id = getCurrentUrlId();
  const url = `/${location}/delete/${id}`;
  await requestWithoutJson(url, HTTP_METHOD.DELETE());
  window.location.pathname = "/notice";
};