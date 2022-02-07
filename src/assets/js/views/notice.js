import {
  getEditor,
  getViewer,
  createEditorData,
  getEditorAndFormData,
  getDataBase,
  updateEditorData,
  deleteEditorData
} from "../editor/editor";
import {
  eventTrigger,
  nodeListEventTrigger,
  windowEventTrigger
} from "../events/event";
import { $, redirectItemDetail } from "../utils/utils";
import { HTTP_METHOD, request } from "../utils/fetch";

function Notice() {
  this.editor = $("#editor") ? getEditor() : undefined;
  this.viewer = $("#viewer") ? getViewer() : undefined;

  this.init = () => {
    eventTrigger(".send-notice-data-button", "click", createNotice);
    eventTrigger(".update-noticedata-button", "click", updateNotice);
    eventTrigger(".delete-notice-button", "click", deleteNoticeItem);
    windowEventTrigger("#viewer", "load", readNotice);
    windowEventTrigger(
      ".update-noticedata-button",
      "load",
      getNoticeDataAndPaintInEditor
    );
    nodeListEventTrigger(".box", "click", handleIsWeeklyToggleButton);
  };

  const createNotice = async () => {
    const form = $(".notice-editor-container form");
    const editorBody = this.editor.getMarkdown();
    const data = getEditorAndFormData({ form, editorBody });
    const { data: response } = await createEditorData(data);
    redirectItemDetail(`/notice/${response._id}`);
  };

  const readNotice = async () => {
    const { data: response } = await getDataBase("/api/notice");
    this.viewer.setMarkdown(response.paragraph);
  };

  const getNoticeDataAndPaintInEditor = async () => {
    const { data: response } = await getDataBase("/api/notice");
    $("#isWeekly").checked = response.isWeekly;
    this.editor.setMarkdown(response.paragraph);
  };

  const updateNotice = async () => {
    const form = $(".notice-editor-update-container form");
    const editorBody = this.editor.getMarkdown();
    const data = getEditorAndFormData({ form, editorBody });
    const { data: response } = await updateEditorData(data);
    redirectItemDetail(`/notice/${response._id}`);
  };

  const deleteNoticeItem = () => {
    deleteEditorData("notice");
  };

  const handleIsWeeklyToggleButton = async (event) => {
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
  };
}

const notice = new Notice();
notice.init();
