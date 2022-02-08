import Editor from "@toast-ui/editor";
import View from "@toast-ui/editor/dist/toastui-editor-viewer";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { $, getCurrentUrlId } from "../utils/utils";
import { request, HTTP_METHOD, requestWithoutJson } from "../utils/fetch";

class EditorLoader {
  getEditor(selector) {
    const node = $(selector);
    if (!node) {
      return;
    }
    const editor = new Editor({
      el: node,
      customHTMLRenderer: {
        htmlBlock: {
          iframe(node) {
            return [
              {
                type: "openTag",
                tagName: "iframe",
                outerNewLine: true,
                attributes: node.attrs,
              },
              { type: "html", content: node.childrenHTML },
              {
                type: "closeTag",
                tagName: "iframe",
                outerNewLine: true,
              },
            ];
          },
        },
      },
      previewStyle: "vertical",
      height: "70vh",
      initialEditType: "markdown",
      toolbarItems: [
        ["heading", "bold", "italic", "strike"],
        ["hr", "quote"],
        ["ul", "ol", "task"],
        ["table", "image", "link"],
        ["code", "codeblock"],
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
              "X-CSRF-Token": $("meta[name='csrf-token']")["content"],
            },
            body: formData,
          });
          const { data } = await response.json();
          callback(data, "alt text");
        },
      },
      exts: ["youtube"],
      plugins: [colorSyntax],
    });

    return editor;
  }

  getViewer(selector) {
    const node = $(selector);
    if (!node) {
      return;
    }

    const viewer = new View({
      el: node,
      customHTMLRenderer: {
        htmlBlock: {
          iframe(node) {
            return [
              {
                type: "openTag",
                tagName: "iframe",
                outerNewLine: true,
                attributes: node.attrs,
              },
              { type: "html", content: node.childrenHTML },
              {
                type: "closeTag",
                tagName: "iframe",
                outerNewLine: true,
              },
            ];
          },
        },
      },
    });

    return viewer;
  }

  getEditorAndFormData({ form, editorBody }) {
    const formData = new FormData(form);
    const newFormData = {};
    for (let [key, value] of formData) {
      newFormData[key] = value;
    }
    return {
      ...newFormData,
      editorBody,
    };
  }

  async createEditorData(data) {
    const url = window.location.pathname;
    const response = await request(url, HTTP_METHOD.POST(data));
    return response;
  }

  async getDataBase(url) {
    const id = getCurrentUrlId();
    const response = await request(`${url}/${id}`, HTTP_METHOD.GET());
    return response;
  }

  async updateEditorData(data) {
    const url = window.location.pathname;
    const response = await request(url, HTTP_METHOD.PATCH(data));
    return response;
  }

  async deleteEditorData(location) {
    const id = getCurrentUrlId();
    const url = `/${location}/delete/${id}`;
    await requestWithoutJson(url, HTTP_METHOD.DELETE());
    window.location.pathname = "/notice";
  }
}

export default EditorLoader;
