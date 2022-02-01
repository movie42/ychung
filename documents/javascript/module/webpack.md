# WebPack5

> [깃헙 주소](https://github.com/movie42/webpackTest)

## 웹팩이란?

웹팩의 컨셉은 module을 한데 모아 하나 이상의 파일로 build 한다. 웹팩은 정적이다. ES6 모듈이 있는데 bunlder를 사용하는 것은 조금 블랙 코미디 같지만 세상 이치가 꼭 표준대로 돌아가지 않으니까. 대신 새로운 기술이 나오는 대로 여러 브라우저에서 효과적으로 적용될 수 있도록 도구가 있다는 사실이 감사할 뿐이다.

웹펙은 모듈 번들러이기 때문에 module로 작성된 자바스크립트 코드를 롤업하는 역할을 주로 한다. 여러개로 나뉜 현대 자바스크립트를 클래식 자바스크립트로 변환해서 사용할 수 있다. 모듈을 공부하면서 이렇게 하는 이유에 대해서 몇가지 읽어봤는데, 현재 모든 브라우저가 ES6 module을 지원하고 있지 않고, 성능 이슈가 있기 때문이다.

모듈을 공부하기 이전에 웹팩을 그냥 설치해서 썼다. 하지만 계속 오류를 만나기도 하고, 막상 혼자서 webpack을 설정하려고 하면 뇌가 흔들렸다. 그래서 이전에 설정했던 웹팩 파일을 보면서 내가 쓴 구문이 무엇인지 하나하나 뜯어보기로 했다.

**학습 목표**

1. 웹펙을 사용하기 위해 패키지를 설치하고 세팅한다.
2. 웹펙 구문에 대해서 알아본다.

## 복사 붙여넣기 해서 빠르게 실행해보기

1. 프로젝트 실행할 폴더를 만들고 명령어 넣기

```shell
npm init -y

npm install webpack webpack-cli webpack-merge --save-d
```

2. 폴더와 파일 만들기

   - project-folder
   - \-src
   - \--js
   - \---main.js
   - \--sass
   - \---style.scss
   - \-webpack.config.js
   - \-webpack.dev.js
   - \-webpack.prod.js
   - \-index.html

3. package.json scripts 설정

```json
{
  "scripts": {
    "dev": "webpack --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  }
}
```

4. webpack.config.js 설정하기

```javascript
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    main: "./src/js/main.js",
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
```

5. webpack.dev.js 설정하기

```javascript
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  watch: true,
});
```

6. webpack.prod.js 설정하기

```javascript
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
});
```

7. main.js 값 넣기

```javascript
document.querySelector("body").innerHTML = `
<h1>안녕</h1>
`;
```

8. index.html에 script 추가하기

```html
<script src="./dist/js/main.js"></script>
```

9.  npm run dev 실행해보기

```shell
npm run dev
```

터미널에서 webpack 5.67.0 compiled <span style="color:green;">successfully</span> in 62 ms라는 메시지를 보았다.

1. html 파일을 열어서 '안녕'이 제대로 출력되는지 확인해본다.
2. dist/js/main.js를 열어서 컴파일된 main.js를 확인본다.

## 실행 한 코드 살펴보기

### 설치한 패키지

1. webpack
   - webpack 패키지
2. webapck-cli
   - webpack.config.js에 설정한 값을 Command Line Tool에서 이해하도록 하는 패키지다. 보통 맥에서 터미널이라고 생각하면 된다.
3. webpack-merge
   - webpack.config.js와 함께 작성하는 webpack.dev.js, webpack.prod.js에서 각각의 모드에 맞게 webapck을 롤업하기 위해서 사용되는 패키지

### package.json scripts 명령어

```json
{
  "scripts": {
    "dev": "webpack --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  }
}
```

위와 같이 세팅하면 아래 명령어로 webpack을 동작 시킬 수 있다. "dev"는 webpack.dev.js를 통해서 개발 모드로 webpack을 동작시키는 것이다. "build"는 webpack.prod.js를 통해 프러덕션 레벨의 코드로 롤업할 수 있다.

```shell
npm run dev
npm run build
```

현재 실행하면 dev나, prod에 아무것도 작성되어있지 않아 오류가 발생한다. webpack.dev.js에 아래 코드롤 복사해서 붙여넣기를 하고 스크립트를 실행하면 컴파일에 성공했다는 메시지가 뜬다. dist 폴더가 새롭게 생성되는데 그 안에는 아직 아무것도 없다.

### webpack.config.js

webpack.confing.js 파일을 작성해보자. webpack은 module.exports를 읽고 내가 어떤 설정을 했는지 이해한다. 작성할 때 CommonJS module을 사용했는데 [ES6 Module](https://webpack.kr/api/module-methods)을 사용할 수 도 있다. ES6 module을 사용해서 webapck.config.js를 사용하려면 반드시 entry되는 모든 파일에 확장자 명을 붙여야한다. 보통 바벨을 사용하면 확장자를 생략하는데 그렇게 하면 오류를 뿜는다.

```javascript
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    main: "./src/js/main.js",
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
```

1. path는 경로 설정을 위한 패키지다.
2. entry
   - 어떤 경로의 파일을 webapck에 넣을지 결정하는 부분이다. 작성한 것 처럼 객체로 다중 엔트리 포인트를 넘길 수 있고 그렇지 않을 수 있다.
3. clean
   - 웹펙이 롤업할 때 기존에 있던 파일을 지우고 다시 재구성한다.

### webpack.dev.js

```javascript
const { merge } = require("webpack-merge");
const config = require("./webpack.config");

module.exports = merge(config, {
  mode: "development",
  devtool: "inline-source-map",
  watch: true,
});
```

merge(config, {})
config 파일의 설정 값을 기본값을 사용하게 된다. {}안에 추가적인 설정을 넣는다.

1. mode
   - development인지 production인지 정할 수 있다.
2. [devtool](https://asunhs.gitbooks.io/ng2/content/contents/first/envConfigByWebpack.html)
   - devtool을 설정해서 디버깅을 효율적으로 할 수 있도록 돕는 역할을 한다.
   - 다양한 [devtool 옵션](https://webpack.js.org/configuration/devtool/#devtool)이 있다.
3. watch
   - 내가 entry한 코드를 감시할 것인지 여부를 결정한다. true로 설정하면 코드가 변할 때마다 webpack을 실행한다.

## loader와 plugins

### loader

로더는 Typescript를 Javascript로 변환하거나 Javascript에서 직접 CSS를 import할 수 있다. 그밖에도 인라인 이미지를 데이터 URL로 로드할 수 있다. babel 로더는 ES5+의 코드를 babel로 불러와 ES5 코드로 변환 한다.

한 마디로 로더는 Javascript 파일이 아니거나 브라우저가 읽을 수 없는 것을 변환해준다고 생각할 수 있다.

> [Loader : 웹팩 핸드북](https://joshua1988.github.io/webpack-guide/concepts/loader.html)

### loader 설치하기

sass, sass-loader, css-loader, babel-loader를 설치한다.

```shell
npm install -D css-loader babel-loader @babel/core @babel/preset-env sass-loader sass
```

```javascript

module.exports = {

 ...,

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
```

모든 loader는 module 안에 적는다. rules 배열 안에 넣고자 하는 loader를 {}로 묶어 넣어주면 된다.

1. test
   - 정규 표현식안에 매칭되는 모든 파일 형식에 대해서 loader를 적용한다.
2. exclude
   - test에 표현된 모든 파일 형식 중 제외할 것을 선택한다. 위에 경우 node_module안에 있는 모든 mjs를 포함하기 떄문에 제외해준다.
3. use
   - 사용할 loader를 배열로 넣을 수 있다. 배열 가장 오른쪽에 있는 loader가 가장 먼저 실행되며 왼쪽으로 순서대로 실행된다. 순서가 중요하다.
   - babel-loader처럼 loader를 명시하고 options를 넣을 수 있다.

위의 코드를 복사해서 붙여넣고 실행하면 오류가 난다. 왜냐하면 style-loader가 설치되어있지 않기 때문이다. webpack 예제에서 제공하는 소스코드를 복사해서 붙여넣기를 했는데 오류가 나면 오류를 잘 읽어보면 대부분 무언가 설치가 안된 경우다. 나머지 오류는 발생한 원인을 읽어보고 구글에서 검색해서 찾는다.

오류를 해결하기 위해 style-loader를 설치한다.

```shell
npm install style-loader
```

style 폴더에 \_valiable.scss를 만든다.

\_valiable.scss

```scss
$basic_color: blue;
```

style.scss

```scss
@import "./variable";

body {
  background-color: black;
  color: $basic_color;
}
```

webpack을 실행한다.

```shell
npm run dev
```

우리가 작성한 코드가 webpack이 잘 컴파일 한 것을 HTML을 열어 확인할 수 있다.

### plugins

> 웹팩의 기본적인 동작에 추가적인 기능을 제공하는 속성이다.
> [Plugin : 웹팩 핸드북](https://joshua1988.github.io/webpack-guide/concepts/plugin.html#plugin)

추가적으로 어떤 동작을 수행할지 사실 알수가 없다. 어떤 플러그인이 있는지 잘모르기 때문이고 경험치가 적기 때문이다. 일단 나는 내가 사용하고 있는 플러그인이 무엇인지 읽어보고 "이런 역할을 하는 구나..."라고 생각하고 넘겼다. 실습으로 해볼 건 MiniCssExtractPlugin을 사용해본다.

### MiniCssExtractPlugin

```shell
npm install --save-dev mini-css-extract-plugin
```

패키지를 설치하고 webpack.config.js 안에 패키지를 불러온다.

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {

  ...,

  plugins: [

    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "scss-loader"],
      },
    ],
  },
};
```

플러그인은 plugins안에 배열로 넣을 수 있다. ({})는 MiniCssExtractPlugin에서 제공하는 옵션 값을 넣은 것이다.

1. module에 rules에서 test와 use 값을 변경한다.
2. dist 폴더에 css 폴더에 style.css가 생성된 것을 볼 수 있다.
3. HTML을 실행하면 style이 모두 해제되어있다. 왜냐하면 MiniCssExtractPlugin이 css를 따로 추출해서 파일로 만들어주었기 때문이다. style을 추가하자.

### HtmlWebpackPlugin

HtmlWebpackPlugin은 webpack 번들을 제공하는 HTML파일을 생성한다.

```shell
npm install --save-dev html-webpack-plugin
```

HtmlWebpackPlugin을 추가한다.

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

  ...,

  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
};
```

웹팩을 실행하고 dist 폴더를 살펴본다. index.html 파일이 생성되어있다. 실행하면 webpack이 컴파일한 파일들이 자동으로 적용되어있다.

## webpack server

마지막으로 실습한건 webpack server다. webpack server는 따로 webpack build 결과물을 파일로 생성하지 않는다. 코드를 변경할 때마다 변경된 결과물을 바로 확인 할 수 있다.

먼저 dist 폴더를 삭제한다.

> [Webpack Server](https://joshua1988.github.io/webpack-guide/devtools/webpack-dev-server.html#webpack-dev-server)

1. webpack server를 설치 한다.

```shell
npm install webpack-server --save-dev
```

```javascript
module.exports = {
  mode: "none",

 ...,

  devServer: { port: 3000 },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    ...,
  ],
};
```

위의 코드는 변경된 사항만 모아놓은 코드 조각이다. 지금까지 작성해왔던 코드에 추가 또는 변경해준다.

```json
{
  "scripts": {
    "dev": "webpack serve"
  }
}
```

package.json 파일을 수정한다. 역시 변경된 부분만 포함한 코드 조각이다. 변경된 부분만 수정한다.

```shell
npm run dev
```

수정 후에 webpack을 실행하고 port 3000번으로 접속한다.

```
http://localhost:3000
```

webpack이 express처럼 local server로 동작하는 모습을 확인할 수 있다. 코드를 수정해 보자.

## 마무리

module bundler가 무엇인지 그리고 module bundler의 한 종류인 webpack의 사용 방법을 조금이라도 이해해보기 위해서 정리한 문서다.

- ES6 module은 클린 코드를 가능하게 해주는 도구라고 생각한다.
- module bundler는 표준이 적용되지 않는 범위까지 확장 시켜주는 역할을 한다. 또한 성능 이슈를 해결할 수 도 있다.

나는 정리를 하면서 두가지를 느꼈다.

- 일단 수단과 방법을 가리지 않고 코드를 복사 붙여넣기 해서 최단 시간에 동작을 성공한다.
- 기본 컨셉을 살펴보고 어떻게 동작하는지 이해해본다.

가장 중요한건 내가 사용하는 package가 무엇이고 설치후 동작을 하면 어떤 동작을 하는지 눈으로 볼 수 있는게 가장 중요한 것 같다. 그리고 거기에서 끝나면 앞으로 해당 패키지 때문에 영원히 고통당할 확률이 높다. 그렇다고 거기에서 깊이 들어가면 튜토리얼을 완성도 못하고 질려버릴 가능성이 높다. 어느 타이밍에 어느 패키지를 살펴볼지는 개인마다 타이밍은 다르지만 해당 순서가 왔을 때, 반드시 읽어보고 뜯어보고 실험해보는 것이 가장 중요한것 같다.

> 참고
> [웹팩 documentation](https://webpack.js.org/concepts/)  
> [웹팩 핸드북](https://joshua1988.github.io/webpack-guide/)
