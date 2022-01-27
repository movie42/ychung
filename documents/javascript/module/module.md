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

module.exports = function () {
  // something do
};
```

공식적으로 ES6 모듈이 생겨났다. 그러나 우리는 Babel과 같은 인터프리터를 사용해서 ES5 모듈 포멧으로 번역을 해야한다. 아마도 아직 모든 브라우저에서 ES6 모듈을 지원하지 않기 때문일 것이다.

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

## ES6 모듈 더 자세하게 알아보기

ES6 모듈은 파일당 하나의 모듈이다. 모듈의 장점은 모듈 안에 쓰인 상위 레벨의 변수는 local 변수라는 점이다. 그래서 전역 변수 오염을 시키지 않는다. ES6 모듈은 비동기로 실행된다.

## moudle loader

moule loaders는 특정 모듈 형식으로 쓰인 코드를 번역하는 역할을 하고 런타임으로 실행된다. 나는 써본적이 없다.

## module bundler

드디어 모듈 번들러 이야기가 나왔다. module bundler는 module loader를 대체하기 위해 나왔다. 모듈 번들러는 모듈 로더와 다르게 코드를 미리 build한다. 런타임으로 실행하지 않고 여러 모듈을 enrty로 모아 컴파일링을 한다. 그래서 모든 코드는 번들러에서 모아 브라우저가 이해할 수 있도록(현대 문법을 지원하지 않는 브라우저도 있으니까) build한다.

> 참조

> [Essential JavaScript: Mastering Immediately-invoked Function Expressions](https://vvkchandra.medium.com/essential-javascript-mastering-immediately-invoked-function-expressions-67791338ddc6) > [A 10 minute primer to JavaScript modules, module formats, module loaders and module bundlers](https://www.jvandemo.com/a-10-minute-primer-to-javascript-modules-module-formats-module-loaders-and-module-bundlers/) > [Modules](https://exploringjs.com/es6/ch_modules.html#sec_mixing-named-and-default-exports)
