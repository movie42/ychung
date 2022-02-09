import Editor from "../editor/editor";
import { eventTrigger, windowEventTrigger } from "../events/event";
import { $, getCurrentUrl, redirectItemDetail } from "../utils/utils";

export class Documents extends Editor {
  constructor() {
    super();
    this.editor = super.getEditor("#documents-editor");
    this.init();
  }

  init() {
    eventTrigger(".send-documents-data-button", this.#createDocuments, "click");
    eventTrigger(".update-documents-button", this.#updateDocuments, "click");
    eventTrigger(
      ".delete-documents-button",
      this.#deleteDocumentsItem,
      "click",
    );
    windowEventTrigger("#documents-viewer", this.#readDocuments, "load");
    windowEventTrigger(
      ".update-documents-editor-container",
      this.#getDocumentsDataAndPaintInEditor,
      "load",
    );
  }

  #createDocuments = async () => {
    const pathName = $(".send-documents-data-button").dataset.setPathname;
    const form = $(".documents-editor-container form");
    const editorBody = this.editor.getMarkdown();
    const data = super.getEditorAndFormData({ form, editorBody });
    const { data: response } = await super.createEditorData(data);
    redirectItemDetail(`/documents/${pathName}/${response._id}`);
  };

  async #readDocuments() {
    const [root, branch] = getCurrentUrl();
    const { data: response } = await super.getDataBase(
      `/api/${root}/${branch}`,
    );
    super.getViewer("#documents-viewer").setMarkdown(response.paragraph);
  }

  #getDocumentsDataAndPaintInEditor = async () => {
    const [root, branch] = getCurrentUrl();
    const { data: response } = await super.getDataBase(
      `/api/${root}/${branch}`,
    );
    this.editor.setMarkdown(response.paragraph);
  };

  #updateDocuments = async () => {
    const [root, branch] = getCurrentUrl();
    const form = $(".update-documents-editor-container form");
    const editorBody = this.editor.getMarkdown();
    const data = super.getEditorAndFormData({ form, editorBody });
    const { data: response } = await super.updateEditorData(data);
    redirectItemDetail(`/${root}/${branch}/${response._id}`);
  };

  #deleteDocumentsItem = () => {
    const [root, branch] = getCurrentUrl();
    super.deleteEditorData(`${root}/${branch}`);
  };
}
