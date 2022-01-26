# 쿠키와 세션

기본적인 웹 보안을 공부하다가 갑자기 쿠키로 다시 오게 되었다. 내가 알고 있는 지식이 하나의 파편 조각처럼 흩어져 있을 뿐 연결이 제대로 되지 않는 기분이다. 어쨌든 쿠키와 세션이 무엇인지 역할은 무엇인지 기능적으로 어떻게 작동하는지 등을 이참에 정리하기로 마음먹었다.

## 쿠키

> 학습 방향
>
> 1. 쿠키가 뭘까?
> 2. 쿠키는 왜 생겼을까? 쿠키가 없다면?
> 3. 쿠키는 어떻게 동작할까?
> 4. NodeJS 환경에서 ExpressJS를 활용해 쿠키를 만드는 방법

> 다루지 않는 것
> 쿠키의 종류
> 쿠키와 관련된 보안 이슈
> 참조에 한국 인터넷 진흥원의 인터넷사이트 쿠키(Cookie)의 주요 이슈 및 취약점 분석을 읽어보기를 바란다.

### 쿠키란?

쿠키는 **HTTP의 일종이**다. 사용자가 방문한 웹사이트의 서버에서 클라이언트 쪽에 설치한다. 웹 사이트를 방문할 때마다 서버에서 새로운 정보를 쿠키에 쓴다.
쿠키는 클라이언트에 저장되기 때문에 누군가에 의해서 탈취당할 수 있다. 누군가 훔친 쿠키는 사용자 정보를 가로채는데 사용될 수 있다. 그래서 쿠키에 민감한 정보는 저장해서는 안된다. 보안상 민감하다면 쿠키를 굳이 왜 사용해야할까? 대안이 있을까?

### 쿠키의 역할

쿠키는 사용자의 컴퓨터에 저장되어 사용자의 행동(사용자 정보)을 기억한다. 웹 응용 프로그램 인증 여부, 쇼핑몰 장바구니, 웹 사이트의 UI 옵션 등을 기억해놓았다가 다시 웹 사이트를 재 방문했을 때, 서버가 쿠키를 바탕으로 정보를 다시 불러온다.

로그인을 예로 들어서 쿠키가 없다면 사용자 로그인 여부를 저장하는 곳이 마땅치 않아지기 때문에 서버에 부담이 되거나 매 순간마다 인증 작업을 거쳐야할 것이다. 아이디 비밀번호 입력하는 것도 귀찮은데 매 순간 인증 작업을 해야하면 최소 에너지로 최대 효율을 얻기 원하는 인간은 웹을 사용하지 않게 될 것이고 웹은 도태되고 말았을 것이다.(아니 결국 누군가 쿠키를 만들었겠지?)

### 쿠키의 탄생 배경

쿠키는 [**루 몬틀리**](https://ko.wikipedia.org/wiki/HTTP_%EC%BF%A0%ED%82%A4#cite_note-2)가 만들었다. 루 몬틀리는 전자상거래 어플리케이션을 개발하고 있었다. 전자 상거래는 사용자의 행동이 기록되어야한다.(장바구니, 구매 등) 아마 HTTP가 무상태 프로토콜이고 사용자의 상태를 저장하지 않기 때문에 이러한 한계를 극복하기 위한 무언가가 필요했던 것같다.(추측) 쿠키가 없을 때 웹 사이트는 페이지를 이동할 때마다 별개의 이벤트로 취급하기 때문에 사용자의 행동을 기억하지 않기 때문이다.

### 쿠키의 동작 원리

1. 쿠키는 사용자가 웹 사이트를 방문했을 때 서버가 쿠키를 만들어 사용자에게 보낸다.
2. 컴퓨터는 쿠키를 저장한다.
3. 이후 브라우저는 사용자의 요청을 서버에 보낼 때, 쿠키를 함께 실어서 보낸다. 쿠키는 Stateless HTTP 트랜잭션으로 유입되어 모든 요청을 서버로 되돌려 보낸다.
4. 쿠키는 서버가 만들지만 자바스크립트로 클라이언트에서 설정이 가능하다.

처음 위키 백과에서 "쿠키가 무상태 HTTP 트랜잭션으로 유입"된다는 구뭉르 보았을 때, 좀 이상했다. '쿠키는 상태를 저장하는건데?' 그 말이 맞다. 내가 바보였다. 서버가 사용자가 보내는 HTTP요청을 상태 유지를 위해 전부 추적한다면 비용이 많이 발생할 것이다. 앞에서 이것을 **극복하기 위해서** 쿠키가 탄생하지 않았을까?라고 추측했었다. 쿠키가 저장한 정보를 서버로 보내기만 하면 상태가 유지되는 것으로 이해하면 될 것같다.

쿠키가 클라이언트에서 설정이 가능하다면 XSS 공격이 성공 했을 경우, 쿠키를 가지고 악의적인 일을 할 수 있다. 그래서 쿠키에는 사용자 정보를 담지 말라고 한다. 사용자 정보가 담기지 않는다면 서버가 '특정 사용자'를 쿠키를 통해 어떻게 알아낼 수 있을까? 어렴풋이 세션이 생각난다.

### ExpressJS에서 쿠키를 굽는 법

> ExpressJS에서 쿠키를 구울 예정입니다.
> [Express](http://expressjs.com/)

사용자의 브라우저에서 서버에 어떤 웹 사이트의 무언가를 요청(response)하게 되면, 서버는 HTTP Set-Cookie라는 헤더를 사용하여 사용자에게 응답(request)한다.

#### 실습 환경설정

나는 cookie라는 폴더를 만들었다. 터미널에서 cookie폴더 안으로 들어가서 nodeJS 환경을 만든다. 브라우저는 크롬을 사용했다.

1. package.json 파일 생성

```
$ npm init -y
```

2. express, nodemone, babel 설치

```
$ npm install express

$ npm install nodemon

$ npm install @babel/core @babel/node --save-dev
$ npm install @babel/preset-env --save-dev
```

babel 설정은 [babel setup - nodemon](https://babeljs.io/setup#installation)을 참고하면된다.

3. babel.config.json 파일을 만들고 아래 내용을 복사해서 붙여넣기를 한다.

```json
{
  "presets": ["@babel/preset-env"]
}
```

4. package.json에서 script 부분을 수정합니다.

```json
"scripts": {
    "start": "nodemon --exec babel-node index.js"
  }
```

5. index.js 파일을 만들고 nodejs가 제대로 실행되는지 확인합니다.

```
$ npm start
```

#### cookie 구워보기

[express - res.cookie()](http://expressjs.com/ko/api.html#res.cookie)도큐멘트를 보면 쿠키를 굽는 방법이 소개되어있다. 쿠키는 서버에서 클라이언트에 보내는 것이기 때문에 응답 요청에서 구워진다.

```javascript
import express from "express";
const app = express();

app.use((req, res, next) => {
  res.cookie("name", "A", { maxAge: 900000, httpOnly: true, secure: true });
  next();
});

app.get("/", (req, res) => {
  res.send("hi");
});

const PORT = 4000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
```

쿠키를 굽고나서 크롬 개발자 도구로 들어가서 어플리케이션에서 쿠키를 확인할 수 있다. 쿠키는 name, value, domain, path, Expires/Max-Age, HttpOnly, Secure 등을 옵션으로 설정할 수 있다.

> 참조
> [HTTP 쿠키 : 위키백과](https://ko.wikipedia.org/wiki/HTTP_%EC%BF%A0%ED%82%A4#cite_note-2)  
> [인터넷사이트 쿠키(Cookie)의 주요 이슈 및 취약점 분석 : 한국인터넷진흥원](https://www.kisa.or.kr/public/library/IS_View.jsp?mode=view&p_No=158&b_No=158&d_No=203)  
> [쿠키란 무엇인가요? : BINANCE-academy](https://academy.binance.com/ko/articles/what-are-cookies)  
> [쿠키와 세션 : 강준현](https://junhyunny.github.io/information/cookie-and-session/)  
> [왜 “HTTP는 상태 비 저장 프로토콜”이라고되어 ​​있습니까? : 리뷰나라](http://daplus.net/http-%EC%99%9C-http%EB%8A%94-%EC%83%81%ED%83%9C-%EB%B9%84-%EC%A0%80%EC%9E%A5-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C%EC%9D%B4%EB%9D%BC%EA%B3%A0%EB%90%98%EC%96%B4-%E2%80%8B%E2%80%8B%EC%9E%88/)  
> [인증 방식 : Cookie & Session vs JWT](https://tecoble.techcourse.co.kr/post/2021-05-22-cookie-session-jwt/) > [express - res.cookie()](http://expressjs.com/ko/api.html#res.cookie)

## 세션

세션은 상태를 기억하는 기술이다. 세션은 DB에 저장된다. 그래서 쿠키보다 비교적 안전하다. 세션과 쿠키는 어떤 관계가 있을까? 세션은 쿠키의 취약점을 보완할 수 있다. 쿠키에 유저 정보를 저장하는 대신 세션 아이디만 저장하고 쿠키가 서버로 보내지면 세션은 쿠키에 저장된 세션 아이디를 가지고 세션에 저장된 유저 정보를 조회하여 활용할 수 있다.

### Express에서 세션 사용해보기

Express 세션을 사용하기 위해서 express-session을 설치한다.

```
$ npm install express-session
```

[express-session](https://www.npmjs.com/package/express-session) 문서를 보면 Note를 참고해보자.

> **Note** Since version 1.5.0, the cookie-parser middleware no longer needs to be used for this module to work. This module now directly reads and writes cookies on req/res. Using cookie-parser may result in issues if the secret is not the same between this module and cookie-parser.

더이상 cookie-parser가 필요 없다고 한다. 직접 쿠키를 읽고 쓴다고 한다. 그럼 앞에서 썼던 res.cookie()도 더이상 필요 없다. session 설정에서 cookie 옵션을 직접 써줄 수도 있고 default값을 사용할 수 도 있다.

```javascript
import express from "express";
import session from "express-session";

const app = express();

app.use(
  session({
    // 일반 스트링으로 썼지만 secret은 공개되서는 안된다.
    secret: "secret",
    // resave를 false로 설정하면 세션이 재설정 되지 않는한 세션이 매번 새롭게 저장되지 않는다.
    resave: false,
    // false인 경우 세션이 재설정 되지 않은 값은 저장하지 않는다.
    saveUninitialized: false,
    cookie: { secure: true },
  }),
);

app.get("/", (req, res) => {
  console.log(req.session.id);
  res.send("check your console");
});
```

위의 코드를 작성하면 크롬 개발자 도구에 어플리케이션 탭에 보면 쿠키가 부여되는 것을 알 수 있는데, 이전에 우리가 구웠던 쿠키와 매우 다르다. 세션은 쿠키에게 세션 아이디를 부여하고 브라우저에 쿠키로 저장된다. 그 세션 아이디를 가지고 현재 접근한 클라이언트가 누구인지 알 수 있다. 예제에서 아직 store를 설정하지 않았다. 세션은 DB에 저장되고, 쿠키에 저장된 세션 아이디를 통해 클라이언트를 식별하기 때문에 자신에게 맞는 DB를 골라 store에 설정하여 로그인 로그아웃을 구현할 수 있다.

## 마무리

세션과 쿠키의 뭔지 알아보고 Express에서 어떻게 사용하는지 알아보았다. 세션과 쿠키를 활용하여 사용자 로그인을 유지시킬 수 있고, session.destory를 이용해 로그아웃도 가능하다.

처음에는 간단하게 SOP, CORS, CSP를 알아볼 생각으로 보안 공부를 했지만 결국 다시 HTTP로 돌아가고 인터넷은 뭐고, 브라우저는 어떻게 동작하고, 쿠키와 세션은 무엇인지까지 돌아오게 되었다. 지식이라는게 파면 팔수록 간단하지가 않은것 같다. 특히 **'올바른 사용법'**은 더더욱이 어려운것 같다.

그래도 조금 위안이 되는건 몇 주일간 계속 머리 싸매고 공부한 덕분에 친구와 함께 웹 어플리케이션을 만들면서 서버 요청을 주고 받을 수 있는 기회가 있었는데, CORS 에러를 만나게 되었고 친구에게 이게 뭔지 설명하면서 내가 알고 있는 지식을 다시 확인하는 시간을 가질 수 있었다. 게다가 Express 문서도 읽어보고 내가 사용하고 있는 패키지가 어떤 역할을 하는지 천천히 뜯어보고 없애보고 추가해보고 하면서 동작을 어떻게 하는지 다시 복습해볼 수 있었다.
