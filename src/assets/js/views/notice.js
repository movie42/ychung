import Editor from "../editor/editor";
import {
  eventTrigger,
  nodeListEventTrigger,
  windowEventTrigger
} from "../events/event";
import { $, redirectItemDetail } from "../utils/utils";
import { HTTP_METHOD, request } from "../utils/fetch";

export class Notice extends Editor {
  constructor() {
    super();
    this.editor = super.getEditor("#notice-editor");
    this.init();
  }

  init() {
    eventTrigger(".send-notice-data-button", this.#createNotice, "click");
    eventTrigger(".update-noticedata-button", this.#updateNotice, "click");
    eventTrigger(".delete-notice-button", this.#deleteNoticeItem, "click");
    windowEventTrigger("#notice_viewer", this.#readNotice, "load");
    windowEventTrigger(
      ".update-noticedata-button",
      this.#getNoticeDataAndPaintInEditor,
      "load"
    );
    nodeListEventTrigger(".box", this.#handleIsWeeklyToggleButton, "click");
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
    super.getViewer("#notice_viewer").setMarkdown(response.paragraph);
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
      HTTP_METHOD.PATCH({ dataId })
    );
    if (response) {
      currentTarget.classList.add("active");
    } else {
      currentTarget.classList.remove("active");
    }
  }
}
