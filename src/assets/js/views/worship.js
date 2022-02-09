import Editor from "../editor/editor";
import { eventTrigger, windowEventTrigger } from "../events/event";
import { $, redirectItemDetail } from "../utils/utils";

export class Worship extends Editor {
  constructor() {
    super();
    this.init();
  }

  init() {
    eventTrigger(
      ".send-worship-data-button",
      this.#createWorshipWeekly,
      "click"
    );
    eventTrigger(".update-worship-button", this.#updateWorshipWeekly, "click");
    eventTrigger(".delete-worship-button", this.#deleteWorshipWeekly, "click");
    windowEventTrigger(
      ".worship-editor-update-container",
      () => {
        super.setHtmlSelectTagValue(
          ".worship-editor-update-container form select"
        );
      },
      "load"
    );
  }

  #createWorshipWeekly = async () => {
    const form = $(".worship-editor-container form");
    const data = super.getEditorAndFormData({ form });
    const { data: response } = await super.createEditorData(data);
    redirectItemDetail(`/worship/${response._id}`);
  };

  #updateWorshipWeekly = async () => {
    const form = $(".worship-editor-update-container form");
    const data = super.getEditorAndFormData({ form });
    const { data: response } = await super.updateEditorData(data);
    redirectItemDetail(`/worship/${response._id}`);
  };

  #deleteWorshipWeekly = () => {
    super.deleteEditorData("worship");
  };
}
