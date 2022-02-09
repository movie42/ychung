import Editor from "../editor/editor";
import {
  eventTrigger,
  nodeListEventTrigger,
  windowEventTrigger,
} from "../events/event";
import { $, redirectItemDetail } from "../utils/utils";

export class Blog extends Editor {
  constructor() {
    super();
    this.editor = super.getEditor("#blog_editor");
    this.init();
  }

  init() {
    eventTrigger(".update-blog-button", this.#updateBlogPost, "click");
    eventTrigger(".send-blog-data-button", this.#createBlogPost, "click");
    eventTrigger(".delete-blog-button", this.#deleteBlogItem, "click");
    windowEventTrigger("#blog_viewer", this.#readBlogPost, "load");
    windowEventTrigger(
      ".update-blog-editor-container",
      this.#getBlogPostDataAndPaintInEditor,
      "load",
    );
  }

  #createBlogPost = async () => {
    const form = $(".blog-editor-container form");
    const editorBody = this.editor.getMarkdown();
    const data = super.getEditorAndFormData({ form, editorBody });
    const { data: response } = await super.createEditorData(data);
    redirectItemDetail(`/blog/${response._id}`);
  };

  async #readBlogPost() {
    const { data: response } = await super.getDataBase("/api/blog");
    super.getViewer("#blog_viewer").setMarkdown(response.paragraph);
  }

  #getBlogPostDataAndPaintInEditor = async () => {
    const { data: response } = await super.getDataBase("/api/blog");
    this.editor.setMarkdown(response.paragraph);
  };

  #updateBlogPost = async () => {
    const form = $(".update-blog-editor-container form");
    const editorBody = this.editor.getMarkdown();
    const data = super.getEditorAndFormData({ form, editorBody });
    const { data: response } = await super.updateEditorData(data);
    redirectItemDetail(`/blog/${response._id}`);
  };

  #deleteBlogItem = () => {
    super.deleteEditorData("blog");
  };
}
