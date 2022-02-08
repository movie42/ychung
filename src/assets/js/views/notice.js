import EditorLoader from "../editor/editor";
import {
  eventTrigger,
  nodeListEventTrigger,
  windowEventTrigger,
} from "../events/event";
import { $, redirectItemDetail } from "../utils/utils";
import { HTTP_METHOD, request } from "../utils/fetch";

export class Notice extends EditorLoader {
  constructor() {
    super();
    this.editor = super.getEditor("#editor");
    this.init();
  }

  init() {
    eventTrigger(".send-notice-data-button", "click", this.#createNotice);
    eventTrigger(".update-noticedata-button", "click", this.#updateNotice);
    eventTrigger(".delete-notice-button", "click", this.#deleteNoticeItem);
    windowEventTrigger("#viewer", "load", this.#readNotice);
    windowEventTrigger(
      ".update-noticedata-button",
      "load",
      this.#getNoticeDataAndPaintInEditor,
    );
    nodeListEventTrigger(".box", "click", this.#handleIsWeeklyToggleButton);
  }

  #createNotice = async () => {
    const form = $(".notice-editor-container form");
    const editorBody = this.editor.getMarkdown();
    const data = super.getEditorAndFormData({ form, editorBody });
    const { data: response } = await super.createEditorData(data);
    redirectItemDetail(`/notice/${response._id}`);
  };

  async #readNotice() {
    const { data: response } = await super.getDataBase("/api/notice");
    super.getViewer("#viewer").setMarkdown(response.paragraph);
  }

  #getNoticeDataAndPaintInEditor = async () => {
    const { data: response } = await super.getDataBase("/api/notice");
    $("#isWeekly").checked = response.isWeekly;
    this.editor.setMarkdown(response.paragraph);
  };

  #updateNotice = async () => {
    const form = $(".notice-editor-update-container form");
    const editorBody = this.editor.getMarkdown();
    const data = super.getEditorAndFormData({ form, editorBody });
    const { data: response } = await super.updateEditorData(data);
    redirectItemDetail(`/notice/${response._id}`);
  };

  #deleteNoticeItem = () => {
    super.deleteEditorData("notice");
  };

  async #handleIsWeeklyToggleButton(event) {
    const currentTarget = event.currentTarget;
    const dataId = event.currentTarget.closest("label").dataset.id;
    const { data: response } = await request(
      "/api/notice/is-weekly",
      HTTP_METHOD.PATCH({ dataId }),
    );
    if (response) {
      currentTarget.classList.add("active");
    } else {
      currentTarget.classList.remove("active");
    }
  }
}
