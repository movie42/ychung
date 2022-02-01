# Javascript Module

## module이란?

모듈은 캡슐화된 코드다. 단순히 캡슐화만 하여 글로벌 스페이스를 오염시키지 않는 역할로 끝나지 않고 코드를 재사용 할 수 있도록 돕는 훌륭한 도구다. 모듈이 없었을 때는 javascript design pattern이 있었다. 디자인 패턴이 유효하지 않다는 것은 아니지만 현대 자바스크립트는 모듈로 인해 디자인 패턴이 제공하는 캡슐화 보다 훨씬 더 편하게 자바스크립트 코드를 작성하고 관리하고 재사용할 수 있게 되었다.

ES5에서 모듈 패턴은 대표적으로 IIFE와 Revealing Module이 있다. 캡슐화를 할 수 있다는 장점이 있지만 종속성을 제공하지 않았다. 이 한계를 극복하기 위해서 module formats이 생겨났다.

## IIFE

IIFE는 즉시 실행 함수다. IIFE는 함수 표현식일때 사용할 수 있다.

function 키워드가 맨 앞에 올 경우 자바스크립트는 함수 선언이라고 생각하기 때문에 함수 표현식이라는 것을 알려주기 위해서 앞에 +, !, ~, void를 붙인다.

하지만 전통적으로 즉시 실행 함수는 함수를 괄호로 감싼 형태가 많이 쓰인다.

- IIFE 예제

```javascript
(function (arr) {
  let newArr = arr.map((value) => value + 1);
})(list);
```

즉시 실행 함수는 변수, 함수를 private하게 만들 수 있다. 그 이유는 자바스크립트 실행 컨텍스트 때문이다. newArr은 외부에서 접근이 불가능하다. 즉시 실행 함수 안에서 선언된 변수나 함수 등은 외부에서 접근 할 수 없다. 과거 자바스크립트 표준 모듈이 없었을 때 IIFE module pattern이 많이 쓰였다. module pattern의 장점은 전역 변수 오염을 시키지 않을 수 있다는데 장점이 있다.

[하지만 자바스크립트에서 ES6 모듈을 제공하고 있기 때문에 ES6 모듈에서 더이상 IIFE 모듈 패턴을 사용하지 않는다.](https://hashnode.com/post/do-es6-modules-make-the-case-of-iifes-obsolete-civ96wet80scqgc538un20es0)

## module formats

ES6 이전에 공식적인 모듈 구문이 없었다. 그래서 똑똑한 개발자들은 여러 module 형식을 만들었다. 여러 가지가 있지만 대표적으로 CommonJS format와 AMD가 있다.

- CommonJS format 예시

```javascript
const button = require("button.js");

exports.buttenHandler () {
  // something do
};
```

## ES6 모듈

ES6 모듈은 하나의 파일이 하나의 모듈이다. **내가 느낀 모듈의 가장 큰 장점은 모듈 안에 쓰인 상위 레벨의 변수는 local 변수라는 점이다. 그래서 전역 변수 오염을 시키지 않는다.** 그리고 자동으로 strict 모드가 된다. 그래서 상단에 use strict를 쓸 필요가 없다. 또한 비동기로 동작한다. 비동기로 동작한다는 것은 어떤 장점이 있을까? [구글이 제공하는 아티클](https://v8.dev/features/modules)을 읽으면 HTML paser를 blocking하지 않고 HTML Paser가 끝나기를 기다리지 않고 순서 보장 없이 최대한 빨리 실행한다고 한다.

모듈이 모든 브라우저를 지원하지는 않는다. 그래서 Babel과 같은 인터프리터를 사용해서 ES5 모듈 포멧으로 번역을 해야한다. [MDN Javascript Module : browser support](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules#browser_support)를 보면 인터넷 익스플로어는 지원을 아얘 하지 않고, safari, chrome, firefox 등은 최신 버전에서 import와 export를 지원한다.

nodeJS는 CommonJS를 기본 모듈로 사용한다. 하지만 v13.2.0부터 ES6 모듈을 지원한다. nodeJS에서 ES6 모듈을 사용하는 방법은 세가지가 있다.

1. .mjs 확장자 사용하기 (마이클 잭슨 스크립트라고도 부르는 것 같다.)
   package.json에 'type'을 'module'로 표기하지 않으면 자바스크립트 확장자를 .mjs로 해야한다. 일반 .js 확장자에서 모듈을 사용할 수 없다.
   ES6 모듈은 비동기로 동작한다. 그래서 CommonJS와 함께 사용할 때, 평가 시점을 정확하게 알 수 없다.
2. package.json에 "type":"module"을 넣기
   이렇게 하면 module을 사용할 수 있다. 그렇다면 바벨이나 웹펙을 설치하는 이유가 무엇일까? 브라우저 지원 문제 때문일 것이다.
3. babel, webpack 사용
   babel은 인터프리터이다. 자바스크립트의 최신 문법을 지원하지 않는 브라우저가 자바스크립트를 읽을 수 있도록 변환해준다. (이름 참 잘 지었다.)
   webpack은 모듈로 작성된 자바스크립트 파일을 읽어 정적 파일로 변환해준다.

- ES6 module 예시

```javascript
import button from "button.js";
import * as selector from "selector";

function buttonHandler() {
  // something do
}

export function windowEventHandler() {}

export default buttonHandler;
```

### 사용 방법

babel과 webpack으로 개발 환경을 구축했다면 import와 export문을 사용할 수 있다. 그렇지 않다면 HTML에서 스크립트를 로드할 때, module이라고 명시해주어야한다.

```HTML
<script module src="index.js"></script>
```

export가 된 객체가 있어야 import로 불러와 실행할 수 있다.

```javascript
// date.js
export function sendDateToUser() {
  return new Date().getDate();
}

// index.js
import { dendDateToUser } from "./date.js";
```

export를 하는 방법은 다양하다.

```javascript
export const sayHello = "hi";

export default function () {}

export default user;

export { add, multi, sub, divid as otherDivid };
```

1. named export는 객체 앞에 export를 붙이는 방법으로 한 파일안에서 여러번 사용할 수 있다.
2. export default는 한 모듈 안에서 한번만 사용 가능하다.
3. export 하려는 항목을 모아 객체와 같은 형태로 내보낼 수도 있다.
4. export 하기 전에 as를 사용하여 export 하려는 대상의 이름을 변경할 수도 있다.

```javascript
if (true) {
  export const div = document.querySelectorAll("div");
}
```

위와 같이 export할 수 없다. export는 항상 최상위 레벨에서 이루어져야한다.

import 하는 방법 다양하다. export default된 자바스크립트 파일은 내가 원하는 이름으로 불러올 수 있다. 객체에 바로 export를 한 것은 {}를 사용해서 객체 이름으로 불러올 수 있다.

```javascript
import * as example from "./example.js";
import { example2 } from "./example2.js";
import { example2 as exampel3 } from "./example3.js";
```

export와 다르게 위와 같이 여러가지 import의 형태를 사용할 수 있다. import를 할 때, 상대 경로와 확장자 명은 반드시 붙여주어야한다. 바벨을 사용하는 개발 환경에서는 좀 낮설다.

1. import도 export된 객체의 이름을 바꿀 수 있다.
2. 라벨링된 (named export) export의 이름이 여러 모듈에 똑같이 존재할 때, import로 불러오면 이름이 같아 오류가 발생하는데 as를 붙여서 이름을 바꿀 수 있다.
3. import된 객체는 읽기 전용이다.

## moudle loader

moule loaders는 특정 모듈 형식으로 쓰인 코드를 번역하는 역할을 하고 런타임으로 실행된다. 나는 써본적이 없다.

## module bundler

module bundler는 module loader를 대체하기 위해 나왔다. 모듈 번들러는 모듈 로더와 다르게 코드를 미리 build한다. module loader와 다르게 런타임으로 실행하지 않고 여러 모듈을 모아 정적 실행할 파일을 생성한다. 구글 아티클에서는 bundling을 할 것을 권장한다. 개발하는 중이나 혹은 모듈이 100개 미만의 제품(또는 서비스)에서만 module을 사용할 것을 권장한다. 성능 문제 때문이라고 한다.

## 마무리

webpack때문에 module bundler가 무엇인지 알아보다가 돌고 돌아 module까지 왔다. module이 있다면 module bundler는 왜 있지?에 대한 답도 어느정도 해소된 것 같다. 나머지는 아직 경험해보지 못한(다이나믹 import, npm package를 만들때 module이라던가)것이 많았고 사실 머리에 잘 들어오지도 않았다. javascript 모듈이 줄 수 있는 장점의 최소치를 이해하고 사용하는데 중점을 두었다. 작은 프로젝트를 개발하는 일이지만 module을 알고 쓰는 것과 모르고 쓰는 것의 차이는 큰 것 같다.

찾아본 대부분의 자료들이 2017년 이전의 자료가 많고 최신 동향을 어떻게 되는지 궁금해서 따닥거려봤지만 ES6 module에서 눈에 띄는 변화가 없는 듯 하다. nodeJS에서 ES6 module에 대한 이슈가 궁금했는데 구글링이 미숙한건지 변화가 없는건지 찾지는 못했다.(찾는데로 업데이트 해야겠다.)

> 참조
>
> [웹에서 자바스크립트 모듈 사용하기](https://velog.io/@widian/웹에서-자바스크립트-모듈-사용하기)  
> [JavaScript modules](https://v8.dev/features/modules)  
> [Essential JavaScript: Mastering Immediately-invoked Function Expressions](https://vvkchandra.medium.com/essential-javascript-mastering-immediately-invoked-function-expressions-67791338ddc6)  
> [A 10 minute primer to JavaScript modules, module formats, module loaders and module bundlers](https://www.jvandemo.com/a-10-minute-primer-to-javascript-modules-module-formats-module-loaders-and-module-bundlers/)  
> [Modules](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules#browser_support)  
> [ES6 Modules in the Real World (Polymer Summit 2017)](https://www.youtube.com/watch?v=fIP4pjAqCtQ)
