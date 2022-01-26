# TOAST UI EDITOR를 붙이면서 배운것들

> 21.11.08

- [TOAST UI EDITOR를 붙이면서 배운것들](#toast-ui-editor를-붙이면서-배운것들)
  - [에디터를 붙이면서 도움이 됐던 글들](#에디터를-붙이면서-도움이-됐던-글들)
    - [토스트 에디터 관련](#토스트-에디터-관련)
    - [토스트 뷰어 관련](#토스트-뷰어-관련)
  - [XSS 취약점과 토스트 에디터를 선택한 이유](#xss-취약점과-토스트-에디터를-선택한-이유)
  - [에디터와 뷰어를 불러오는 방법](#에디터와-뷰어를-불러오는-방법)
    - [설치](#설치)
  - [데이터 DB로 보내기](#데이터-db로-보내기)
  - [버그는 같은 호환성 문제](#버그는-같은-호환성-문제)
    - [재앙의 시작](#재앙의-시작)
  - [해결방법](#해결방법)
    - [Fetch Get](#fetch-get)
  - [마무리하면서](#마무리하면서)

## 에디터를 붙이면서 도움이 됐던 글들

### 토스트 에디터 관련

[tui.editor/app/editor 깃허브 저장소 에디터 문서](https://github.com/nhn/tui.editor/tree/master/apps/editor)
[TOAST UI Monthly 2021년 10월호](https://ui.toast.com/weekly-pick/ko_monthly_202110)

### 토스트 뷰어 관련

[tui.editor/app/editor 깃허브 저장소 에디터 뷰어 문서](https://github.com/nhn/tui.editor/blob/master/docs/en/viewer.md)
[에디터 뷰어 API](https://nhn.github.io/tui.editor/latest/ToastUIEditorViewer)

## XSS 취약점과 토스트 에디터를 선택한 이유

오픈 소스로 제공하는 텍스트 에디터가 많다. 처음에는 커스텀으로 처음부터 만들어보려고 했는데 XSS 취약점에 관련된 이슈가 리치 텍스트 에디터(위지윅)에 심각하다는 것을 알게 되었다. 그래서 해당 이슈를 최소한으로 할 수 있는 에디터를 찾다가 **토스트 UI 에디터**를 선택하게 되었다.

> 업데이트 내용
> [TOAST UI Monthly 2021년 10월호](https://ui.toast.com/weekly-pick/ko_monthly_202110)

월간 토스트 UI 2021년 10월호를 보면 XSS 취약점을 개선하기 위해서[DOMPurify를 적용](https://github.com/nhn/tui.editor/pull/1813)했다고 한다.

> [DOMPuryfiy](https://github.com/cure53/DOMPurify)  
> [DOMPuryfiy는 XSS 라이브러리다.](https://jade-kim.github.io/hybrid-app/XSS-Libraries-dompurify/)

어쨌든 이틀동안 이리저리 헤매면서 이슈를 리포트 해주는 개발자들이 있고, 그것에 대응하고 업데이트로 대응하는 개발 생태계를 보게 되었다. 나도 뭔가 기여할 수 있는게 없을까 하고 tui를 포크로 찍었지만 지금 이 코드를 본다고 해도 어떻게 해야할지 잘 모르겠다.

## 에디터와 뷰어를 불러오는 방법

### 설치

설치는 [공식 문서](https://nhn.github.io/tui.editor/latest/)를 참고하는게 좋다.

```
$ npm install --save @toast-ui/editor
$ npm install --save @toast-ui/editor<특정 버전>
```

설치가 끝나고 [editor.js](../assets/js/editor.js)를 생성했다. 토스트 UI에서 제공하는 문서에 ES6 Modules인 경우의 방법으로 불러온다.

```javascript
import Editor from "@toast-ui/editor";

const editor = new Editor({
  el: document.querySelector("#editorSection"),
  previewStyle: "vertical",
  height: "500px",
  initialEditType: "markdown"
});
```

```css
@import "@toast-ui/editor/dist/toastui-editor.css";
```

```pug
extends ../layouts/layout

block content
    form
        input(type="text" name="제목")
    #editorSection
    button(type="button") 내용 제출
    script(src="/static/js/editor.js")
```

웹펙을 모듈 번들러로 사용 중인데 자바스크립트 파일에서 css를 불러오면 웹펙이 버그를 뱉어낸다. 웹펙에서 css를 처리할 때, 정상적으로 컴파일이 되지 않아서 어쩔수 없이 scss에다가 import를 했다. babel의 문제인지 웹펙의 문제인지 한참을 해맸지만 원인을 알수가 없었다.

## 데이터 DB로 보내기

토스트 UI 사용법에 대한 블로그나 유튜브 게시물은 react나 vue를 대상으로 진행한다. 바닐라 자바스크립트와 토스트 UI를 사용할 때 어떻게 해야하는지 방법이 나와있지 않다. 나올법도 한데 안나와있어서 의외라는 생각이었다. 다행이 [노마드 코더](https://nomadcoders.co/wetube/lobby)에서 Youtube 클론을 수강할 때, 다행이 프론트와 백앤드간의 소통(?) 방법을 배웠었다.

```javascript
import Editor from "@toast-ui/editor";

// 버튼과 제목으로 사용할 input을 불러온다.
const btn = document.querySelector("button");
const title = document.querySelector("form input");

const editor = new Editor({
  el: document.querySelector("#editorSection"),
  previewStyle: "vertical",
  height: "500px",
  initialEditType: "markdown"
});

// 이벤트 리스터에 보낼 함수
async function handleEditor(e) {
  // editor의 인스턴스를 사용해 에디터에 있는 내용을 마크 다운으로 불러온다.
  // html로 불러오는 방법은 getHTML()을 사용하면된다.
  const editorBody = editor.getMarkdown();
  const headTitle = title.value;

  // fetch를 할 때, body에 JSON으로 불러온 데이터를 보낸다.
  const data = await fetch("/test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ headTitle, editorBody })
  });
}

btn.addEventListener("click", handleEditor);
```

## 버그는 같은 호환성 문제

에디터 뷰어를 불러오는 방법에서 90%를 헤맸다. 먼저 뷰어는 viewer.js를 만든다.

```javascript
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";

const viewer = new Viewer({
  el: document.querySelector("#viewer")
});
```

'toastui-editor-viewer.css'가 따로 있지만 붙이지 않아도 'toastui-editor.css'에서 스타일을 전부 다 처리해준다.

```css
@import "@toast-ui/editor/dist/toastui-editor.css";
```

### 재앙의 시작

재앙의 시작은 이곳에서부터였다.

```pug
extends ../layouts/layout

block content
    #viewer
        each item in data
            h1=item.headTitle
            // backend에서 불러온 데이터
            #{item.editorBody}
    script(src="/static/js/viewer.js")
```

Expressjs에서 pug 템플리트 엔진으로 사용할 수 있다. 문제는 #viewer에서 데이터 베이스에 담겨있는대로 나오지 않았다.

```
<# MARKDOWN 문법 적용이 왜 안됩니까? 1. 이럴수 있는거냐? - [ ] 이렇게 할 수 없다. - [ ] 왜 적용이 안돼냐. `적용이 왜 안되는걸까?` _ 3 _ 4 \* 5 > 적용이 되어야합니다. > 적용이 되어야합니다. >
```

![image2](img/2021-11-08_PM_8.58.35.png)

화면에 위의 이미지처럼 괄호에 데이터가 담겨있는 상태로 출력됐다. 처음에는 토스트 UI에서 설정을 잘못한 줄 알았다. 그래서 공식 문서를 열심히 봤지만 viewer에 대한 특별한 답을 찾을 수 없었고 그렇다고 이슈 리포트에 나와 같은 문제로 고생하는 사람들도 없었다. (덕분에 토스트 ui 에디터를 포크로 찍고, 코드를 뒤적거리게 되었다.)

> 그럼 getHTML() 인스턴스로 하면되지 않을까?
> editor.js에서 getMarkdown() 인스턴스로 데이터를 받아 보내서 이런 문제가 생기는 것으로 판단하고 getHTML()로 했지만 pug가 괄호 안에 데이터를 담는다. 하지만 데이터 베이스에 저장 될 때 없던 에디터의 내용을 담은 주석이 자동으로 생성되서 괄호 안에 담기고 때문에 정상적으로 스타일링 되는 곳과 주석이 뒤죽박죽 섞여서 내용이 두 번 반복된다.

![image1](img/2021-11-08_PM_8.51.49.png)
위의 이미지처럼 주석이 자동으로 생성된다...

알고보니 Pug의 문제였다. 데이터 베이스에서 불러온 객체를 HTML 테그에 따로 담지 않으면 '<>' 안에 데이터가 담겨서 나왔다. 토스트 UI 에디터의 뷰어는 지정된 엘리먼트 내에서 자동으로 HTML 태그를 생성해서 마크 다운을 HTML 태그로 바꿔 스타일링 해준다. 따라서 <>가 있으면 안된다. 그럼 문제의 괄호를 제거할 수 있는 방법은 없는 걸까? 일단... pug가 괄호를 생성하는 부분을 찾아서 pug팀에 요청해보는것도 방법이지만... 그럴 필요는 없다.

## 해결방법

### Fetch Get

데이터 베이스의 파일은 정상이다. 그럼 api를 만들어서 fetch로 api에 데이터를 요청해서 화면에 출력할 수 밖에 없었다.

프론트에서 REST API에 GET 요청을 보낸다. id 값은 window.location에서 얻을 수 있다. 백엔드에서는 프론트에서 요청한 동일한 id의 게시물을 받아오는 것이기 때문에 데이터를 어렵지 않게 불러올 수 있다.

**프론트**

```javascript
// viewer.js에 추가하기

const getData = async () => {
  const id = window.location.pathname.split("/")[2];

  const data = await fetch(`/api/${id}/notice-data`, {
    headers: { "Content-Type": "application/json" },
    method: "GET"
  });

  const response = await data.json();

  const {
    notice: { paragraph }
  } = response;

  // Toast UI Viewer에서 제공하는 인스턴스
  viewer.setMarkdown(paragraph);
};

getData();
```

**백엔드**

```javascript
export const getParagraph = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const notice = await Notice.findById(id);

    return res.status(200).json({ notice });
  } catch (e) {
    console.log(e);
  }
};
```

백엔트에서 json으로 보내면 프론트에서 받을 수 있다. 그 데이터에서 본문에 해당하는 내용만 setMarkdown()안에 넣어주면 토스트 UI 뷰어가 자동으로 데이터를 파싱해서 HTML로 변환해준다.

## 마무리하면서

나와 같이 react나 vue를 사용하지 않고 토스트 UI 에디터나 혹은 다른 텍스트 에디터를 붙일 계획이라면 도움이 되면 좋겠다. 텍스트 에디터 하나를 붙이는 것도 XSS 취약점이나 NPM 패키지간의 호환성 등을 고려해서 설계해야하기 때문에 그냥 가져다가 붙인다고 작동하지 않는다. 셀프로 만든 텍스트 에디터에서 XSS 취약점을 Helmet이 그냥 해주는건지 아닌지가 파악되지 않아서 그냥 버렸다. 사용자 편의(UX)라는 건 단순히 UI 사용성에 대한 문제를 넘어서 사용자의 데이터를 안전하게 보관할 수 있는 장치를 마련하는 것도 포함이 된다고 생각한다.
