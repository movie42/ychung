import {
  getEditor,
  getViewer,
  createEditorData,
  getEditorAndFormData,
  getDataBase,
  updateEditorData,
} from "../editor/editor";
import { eventTrigger, windowEventTrigger } from "../events/event";
import { $, redirectItemDetail } from "../utils/utils";
/*
create
- [X] 사용자 화면에 toast ui editor를 띄운다. 
- [X] 컴퓨터에 있는 이미지를 불러와 주소값으로 에디터에 던져준다.
- [X] 작성한 데이터를 db에 저장한다.

read

-[X] viewer를 실행한다.

update
- [] 사용자 화면에 toast ui editor를 띄운다. 
- [] 수정할 데이터를 불러와 eidtor에 함께 그려준다.
- [] 수정한 데이터를 db에 저장한다.
- [] db에 저장 후 수정한 게시물로 redirect한다.

delete
- [] 데이터를 삭제한다.

*/
function Notice() {
  this.editor = $("#editor") ? getEditor() : undefined;
  this.viewer = $("#viewer") ? getViewer() : undefined;

  this.init = () => {
    eventTrigger(".send-noticedata-button", "click", createNotice);
    eventTrigger(".update-noticedata-button", "click", updateNotice);
    windowEventTrigger("#viewer", "load", readNotice);
    windowEventTrigger(
      ".update-noticedata-button",
      "load",
      getNoticeDataAndPaintInEditor,
    );
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

  const handleChecker = async (event) => {
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
  };
}

const notice = new Notice();
notice.init();
