# TOAST UI EDITOR의 addImageBlobHook은 어떻게 동작하는 걸까?

> 21.11.15

## 신기한 addImageBlobHook

addImageBlobHook없이 이미지를 불러오면 data:\*의 엄청나게 긴 문자열을 볼 수 있다. 이걸 보자마자마 패닉에 빠졌다.(잘 모르는 것이 나오면 항상 공포를 느끼게 된다.) 하지만 토스트 UI 에디터에서 제공하는 addImageBlobHook은 이미지를 매우 간편하게 올릴 수 있도록 도와줬다. 신기한 포인트는 두 가지였다.

> 신기한 포인트
>
> 1. 64bit 문자열을 url로 어떻게 바꿔주는걸까?
> 2. 드레그 앤 드랍이 된다?

```javascript
const editor = new Editor({
  el: document.querySelector("#editor"),
  hooks: {
    addImageBlobHook: async (blob, callback) => {
      let formData = new FormData();

      formData.append("data", blob, blob.name);

      const response = await fetch("/image/sendImage", {
        method: "POST",
        body: formData
      });

      const { data } = await response.json();
      callback(data, "alt text");
    }
  }
});
```

이쯤되면 어떻게 하면 이렇게 간단하게 올릴 수 있게 되는지 내부가 궁금해지기 마련이다. 이전에 folk로 찍어놓았던 토스트 에디터를 clone해서 내부를 뒤적거려봤다.

## typesciprt로 설계된 에디터

> 사용 언어 : typescript

많은 기능들이 서로 종속적으로 설계되어있었다. typescript가 javascript와 비슷하다고는 하지만 어떻게 사용하는지 잘 모르기 때문에 각 용어를 구글에서 찾아보면서 살펴보았다.

typescript는 내가 사용하려는 매개변수나 인자 또는 함수의 리턴 값이 무엇인지 미리 선언할 수 있다. 그래서 여러 사람들이 any로 선언한 값과 환경들을 받아서 내가 설계한 기능에서 먼저 선언한 타입만 받아서 작동시킬 수 있다. 사용자(개발자)의 불확실한 행동을 미리 통제할 수 있다고 보면 될 것 같다.

## addImageBlobHook을 선언하는게 가능한 이유 찾기

### editorCore.ts에서 부터 시작

에디터 코어에서 훅을 어떻게 등록할까? 만약에 내가 hooks라는 옵션을 등록하면 options에 선언되어있던 hooks를 불러오고 그 다음에 [forEachOwnProperties](https://github.com/nhn/tui.code-snippet/blob/v2.3.3/collection/forEachOwnProperties.js)라는 함수를 실행시킨다.(이 함수는 [tui-code-snippet](https://github.com/nhn/tui.code-snippet)에 선언된 함수다.)

> 파일 경로
> apps > editor > src > editorCore.ts

```typescript
// this.options.hooks는 HookMap으로 타입이 정해져있다. 여기에는 addImageBlobHook이라는 메소드가 내장되어있기 때문에 addImageBlobkHook을 선언할 수 있다.
class ToastUIEditorCore {
  protected options: Required<EditorOptions>;

  constructor(options: EditorOptions) {
    this.options = extend(options);

    if (this.options.hooks) {
      forEachOwnProperties(this.options.hooks, (fn, key) =>
        this.addHook(key, fn)
      );
    }
  }

  addHook(type: string, handler: Handler) {
    this.eventEmitter.removeEventHandler(type);
    this.eventEmitter.listen(type, handler);
  }
}

// apps > editor > types > event.d.ts
export interface Handler {
  (...args: any[]): any;
  namespace?: string;
}
```

> 파일 경로
> apps > editor > types > editor.d.ts

```typescript
export interface EditorOptions {
  el: HTMLElement;
  hooks?: HookMap;
}
```

```typescript
declare module "tui-code-snippet/collection/forEachOwnProperties" {
  export default function forEachOwnProperties<T extends object>(
    obj: T,
    iteratee: (
      value: NonNullable<T[keyof T]>,
      key: keyof T,
      targetObj: T
    ) => boolean | void,
    context?: object
  ): void;
}
```

forEachOwnProperties는 obj와 iteratee, context?를 받는다. iteratee는 아마 반복 가능한 함수를 반복하기 위한 함수라는 것을 명시한것 같다. forEachOwnProperties의 첫번째 값이 객체이고 this.options.hooks(HookMap)을 받는다. HookMap의 초기값에는 addImageBlobHook 밖에 없지만 토스트 에디터에서는 커스텀 훅을 가능하게 하기 때문에 객체를 반복해서 실행할 수 있도록 iteratee 함수를 값으로 받을 수 있도록 설계 한듯 하다. 두번째 값으로 받는 함수가 iteratee다.

> forEachOwnProperties
> 문서를 정리하다가 구글에 그냥 넣어봤는데 nhn toast ui code snippet에 있는 함수였다. 항상 구글에 함수 이름을 넣어보는 습관도 가져봐야겠다.

> **타입스크립트 용어 정리**
>
> [NonNullable](https://blog.martinwork.co.kr/typescript/2019/05/28/typescript-util-types.html)  
> forEachOwnProperties 함수의 iteratee의 value가 NonNullable로 선언되어 있다. 아마도 사용자가 hooks를 등록하고 그 안에 아무 값도 넣지 않았을 때, null이나 undefined일 경우 제거하기 위해서 인듯 하다.
>
> [제네릭](https://joshua1988.github.io/ts/guide/generics.html#%EC%A0%9C%EB%84%A4%EB%A6%AD%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0)

함수와 키를 값으로 받아 addHook에 전달을 하고 addHook은 HookMap에 등록된 매소드를 등록하는 역할을 한다. options는 EditorOptions를 상속받고 거기에는 hooks가 있고 hooks의 타입은 HookMap으로 정해져있다. HookMap에는 addImageBlobHook이 등록되어있기 때문에 사용자가 선언이 가능해진다. editor.d.ts에 EditorOptions는 내가 에디터를 커스텀할 수 있는 타입들이 미리 정해져있다. hooks는 필수로 선언해야하는 값이 아니다. 그래서 hooks에는 ?가 붙는다. hooks를 선언하면 HookMap을 기본값으로 사용하게 된다.

```typescript
type HookCallback = (url: string, text?: string) => void;

export type HookMap = {
  addImageBlobHook?: (
    blob: Blob | File,
    callback: HookCallback
  ) => void;
};
```

타입스크립트는 타입을 필수로 정하도록 하기 때문에 리턴값의 type이 무엇인지 명시해야한다. 리턴값을 void로 선언하면 이 함수가 아무것도 리턴하지 않는다는 것을 알려준다. 그래서 addImageBlobHook을 사용했을 때, 리턴값을 지정할 필요가 없다. 대신 blob과 callback을 지정해주어야한다.

## 이미지를 텍스트 에디터에 넣으면 일어나는 일

그럼 이제 신기한 포인트를 알아보아야한다. file을 에디터에 떨어뜨리거나 올리면 어떻게 알아보기도 어려운 긴 data:\* 문자열을 url로 변경해주는 것일까? 먼저 트리거가 공이(함수)를 내려 치는 것부터 찾아야한다.

> 타입스크립트 용어 정리
> [interface, implements](https://hyunseob.github.io/2016/10/17/typescript-interface/)
> interface는 객체가 어떤 프로퍼티 혹은 메소드를 가진다고 선언하는 것이다.
> implements는 interface가 구체적으로 이렇게 선언할것이라고 알려주는 것이다.
> 예제는 링크 참고

### 파일이 텍스트 에디터 위에 떨어졌을 때, 어떻게 인식하는 것일까?

#### mdEditor.ts

에디터 모드를 마크 다운으로 선언하면 mdEditor.ts에서 값을 가져온다. 하지만 MDEditor도 EditorBase의 확장이다. EditorBase도 abstract이 붙어있고 Base를 implements하겠다고 되어있다. 이 코드를 보면서 좋았던게, 코드가 복잡하지 않고 매우 아름다웠다. 개인적으로 이렇게 코드를 짜면 나중에 내가 한참 뒤에 프로젝트를 업그레이드를 시키거나 참고해야할 때, 시간을 줄일 수 있을 것 같았다. 또 나중에 확장을 하거나 재사용이 가능해 보였다. 이렇게 코드를 만들면 팀으로 코딩하기가 쉬울 것 같고, 유지 보수에 드는 비용도 절약 될 것 같았다.

```typescript
export default class MdEditor extends EditorBase {
  private toastMark: ToastMark;

  private clipboard!: HTMLTextAreaElement;

  context!: MdContext;

  constructor(eventEmitter: Emitter, options: MarkdownOptions) {
    super(eventEmitter);
    ... 축약
    this.createClipboard();
  }

  private createClipboard() {
    this.clipboard = document.createElement("textarea");
    this.clipboard.className = cls("pseudo-clipboard");
    this.clipboard.addEventListener("paste", (ev: ClipboardEvent) => {
      const clipboardData =
        (ev as ClipboardEvent).clipboardData ||
        (window as WindowWithClipboard).clipboardData;
      const items = clipboardData && clipboardData.items;

      if (items) {
        const imageBlob = pasteImageOnly(items);

        if (imageBlob) {
          ev.preventDefault();
          emitImageBlobHook(this.eventEmitter, imageBlob, ev.type);
        }
      }
    });
    // process the pasted data in input event for IE11
    this.clipboard.addEventListener("input", (ev) => {
      const text = (ev.target as HTMLTextAreaElement).value;

      this.replaceSelection(text);
      ev.preventDefault();
      (ev.target as HTMLTextAreaElement).value = "";
    });
    this.el.insertBefore(this.clipboard, this.view.dom);
  }
}
```

이미지를 텍스트 에디터에 지정된 방식(버튼을 눌러 등록하거나 드래그 앤 드랍)으로 넣으면 지정된 트리거가 발생한다. 이 부분부터 찾아야한다.

### 긴 문자열은 File과 Blob함수가 처리하는 거였어...

blob의 type은 Blob과 File로 정해져있다. Blob은 node_moduler에 위치하는데 typescript의 함수다.
Blob은 size와 type이 있는데 size는 파일의 크기, type은 MIME의 유형을 나타내는 문자열이다.

이 명세는 [자바스크립트의 Blob](https://developer.mozilla.org/ko/docs/Web/API/Blob)과 같다.

> 참고  
> [자바스크립트 File 객체](https://taeny.dev/javascript/file-object/)  
> [12/ File Api와 이미지 용량 줄이기](https://feel5ny.github.io/2018/05/27/JS_12/)

blob 조건부 타입으로 Blob | File을 받는다. HookCallback은 url과 text를 받는다.

> 경로
> apps > editor > src > event > eventEmitter.ts

```typescript
class EventEmitter implements Emitter {
  listen(type: string, handler: Handler) {
    const typeInfo = this.getTypeInfo(type);
    const eventHandlers = this.events.get(typeInfo.type) || [];

    if (!this.hasEventType(typeInfo.type)) {
      throw new Error(`There is no event type ${typeInfo.type}`);
    }

    if (typeInfo.namespace) {
      handler.namespace = typeInfo.namespace;
    }

    eventHandlers.push(handler);

    this.events.set(typeInfo.type, eventHandlers);
  }
}
```

### addDefaultImageBlobHook은

이 함수는 Emitter로부터 listen을 호출한다. Emitter는 types 안에 event.d.ts라는 파일에 등록되어있는데 토스트 에디터에 이벤트와 관련된 모든 함수는 이 Emitter를 지나간다.

이벤트를 등록하고 listen은 type:string과 handler라는 매개변수를 받는다. listen 함수의 역할은 미리 정의되어있는 eventType에서 addImageBlobHook를 이벤트를 등록하는 역할을 한다. addEventListner와 비슷하다.

```javascript
// 실제로 동작 안함
variable.addEventListner("event", eventFunction);
```

```typescript
eventEmitter.listen("addImageBlobHook", eventFunction);
```

### Emitter

> 경로
> apps > editor > src > helper > image.ts

helper 폴더안에 image.ts가 있다. 이 파일을 살펴보면 addDefaultImageBlobHook, emitImageBlobHook, pasteImageOnly 함수가 있다.

```typeScript
eventEmitter.listen(
    "addImageBlobHook",
    (blob: File, callback: HookCallback) => {
      const reader = new FileReader();

      reader.onload = ({ target }) => callback(target!.result as string);
      reader.readAsDataURL(blob);
    },
  );
```

listen은 type:string과 handler:Handler를 인자로 받는다. listen에서 event ty

Handler는
handler는 다시 Handler라는 interface를 호출한다.Handler는 arg와 namespace를 받는다.

```typescript
import toArray from "tui-code-snippet/collection/toArray";

import { HookCallback } from "@t/editor";
import { Emitter } from "@t/event";

export function addDefaultImageBlobHook(eventEmitter: Emitter) {
  eventEmitter.listen(
    "addImageBlobHook",
    (blob: File, callback: HookCallback) => {
      const reader = new FileReader();

      reader.onload = ({ target }) =>
        callback(target!.result as string);
      reader.readAsDataURL(blob);
    }
  );
}
```

```typescript
import toArray from "tui-code-snippet/collection/toArray";

import { HookCallback } from "@t/editor";
import { Emitter } from "@t/event";

export function addDefaultImageBlobHook(eventEmitter: Emitter) {
  eventEmitter.listen(
    "addImageBlobHook",
    (blob: File, callback: HookCallback) => {
      const reader = new FileReader();

      reader.onload = ({ target }) =>
        callback(target!.result as string);
      reader.readAsDataURL(blob);
    }
  );
}

export function emitImageBlobHook(
  eventEmitter: Emitter,
  blob: File,
  type: string
) {
  const hook: HookCallback = (imageUrl, altText) => {
    eventEmitter.emit("command", "addImage", {
      imageUrl,
      altText: altText || blob.name || "image"
    });
  };

  eventEmitter.emit("addImageBlobHook", blob, hook, type);
}

export function pasteImageOnly(items: DataTransferItemList) {
  const images = toArray(items).filter(
    ({ type }) => type.indexOf("image") !== -1
  );

  if (images.length === 1) {
    const [item] = images;

    if (item) {
      return item.getAsFile();
    }
  }

  return null;
}
```

## 번외

에디터의 이미지 훅 사용 방법을 헤매고 있는 사람들이 있다면 도움이 되면 좋겠다.

### 이미지 불러오기

토스트 UI 에디터를 사용하면서 이미지를 불러 오고 싶었다. 많이 복잡하고 어려울 줄 알았는데 토스트 UI 에디터의 깃허브 이슈에서 이미지 훅을 사용하는 방법을 찾았다.
[Is there any way to add an image or some other element to selected position?](https://github.com/nhn/tui.editor/issues/57)

나는 [multer](https://www.npmjs.com/package/multer)와 [sharp](https://www.npmjs.com/package/sharp)를 사용해서 아마존 s3에 사진을 업데이트 하고 주소를 불러왔다.

### FormData

> backend : nodejs v14.16.1, expressjs v4.17.1

FormData를 사용하면서 큰 삽질을 했다. 컨트롤러에서 formdata가 전송해주는 파일을 계속 불러오지를 못했는데, 이미지는 계속 s3로 올라갔다. 한시간동안 왜 파일을 백앤드에서 전달받지 못하는지 알수가 없어서 미치고 팔짝뛸 노릇이었다.

```javascript
export const getImageUrl = (req, res) => {
  const { file, body } = req;
  console.log(file, body); // undefiend, {}
};
```

답답한 나머지 req를 콘솔에 찍었는데, 파일을 받는 객체 값이 files였다.

```javascript
export const getImageUrl = (req, res) => {
  const { files } = req;
  console.log(files);
  /*
  [
    {
    fieldname: 'data',
    originalname: '2021-11-10_AM_2.42.12.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: 'image',
    filename: '77367b6156fb9cfb3acdbcceb91d4eef',
    path: 'image/77367b6156fb9cfb3acdbcceb91d4eef',
    size: 61391
    }
]
*/
};
```

다음부터 내가 예상했던 값이 넘어오지 않으면 다른 곳으로 넘어오는지 확인하는 습관을 가져야겠다.
