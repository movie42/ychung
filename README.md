# ![양청](/favicon/favicon-32x32.png) 양청 웹 어플리케이션

[![Website](https://img.shields.io/website?color=2eaee5&style=flat-square&url=https%3A%2F%2Fy-chung.com)](https://y-chung.com)

## 📜 목차

- [개요](#-📍-개요)
- [만들면서 경험한 주요 이슈](#-🗂-만들면서-경험한-주요-이슈)
- [업데이트](#-🛠-업데이트)

## 📍 개요

### 프로젝트 목적

- 양정교회 청년부 홈페이지를 만들어 사용자에게 교회 정보를 제공한다.
- 자바스크립트를 사용하여 프론트, 백앤드 전체를 경험하고, 디폴로잉을 하여 웹 어플리케이션 개발 메커니즘을 이해해본다.
- 자바스크립트를 깊이 공부한다.

### 주요 역할

- FullStack

### 개발 언어

- Javascript

### 프레임 워크

- ExpressJS 4.17.1

## 로컬 테스트

### 필수 설치

> nodeJS v14.16.1

**\* nvm을 통해 설치할 것을 권장합니다.**

> MongoDB community server를 설치하거나 mongoDB Atlas를 사용할 것을 권장합니다.

### 설치

1. 깃 클론

```shell
git clone https://www.github.com/movie42/ychung
```

2. install npm package

```shell
npm install
```

3. set .env

```.evn
// up to you
PORT=

// essential
MONGO_URL=yourkey
SESSION_SECRET=yourkey

URL=yourLocalURL
ORIGIN=yourLoaclURL

// if you want test aws3, require write your key
AWS_ID=yourkey
AWS_SECRET=yourkey
```

4. test server run

```shell
$ npm build
$ npm start
```

5. develop mode

```
$ npm run dev:server
```

```
$ npm run dev:assets
```

6. run db

```
$ npm run db
```

## 🗂 만들면서 경험한 주요 이슈

### 자바스크립트

#### [비동기를 처리하는 방법](./documents/ajax/21_11_19%20비동기를%20처리하는%20방법.md)

1. 요약

   - 자바스크립트에서 클라이언트와 서버간의 소통하는 방법 정리
   - 과거 비동기를 처리할 때 문제점과 ES6 Promise 그리고 asyc/await 정리
   - fetch로 서버 데이터에 요청, 쓰기, 삭제 등을 하는 방법에 대한 정리

2. 적용 예

   - 사용자에게 이미 사용하고 있는 이메일, 유저 네임인지 알려주기 위한 함수
   - 사용자가 서식을 입력하고 텝을 누르면 checkedDataBase에서 비동기로 정보를 fetch한다.

```javascript
async function checkedDataBase(bool, node) {
  const value = node.value;
  const name = node.name;

  if (name === "email" || name === "userName") {
    const response = await fetch(`/api/checked-db/${name}=${value}`, {
      method: "GET",
    });

    const { exist } = await response.json();
    const checked = !exist;
    return paintMessage(checked, node, "exist");
  }

  return paintMessage(bool, node);
}
```

#### 함수형 프로그래밍 적용해보기

1. 요약

   - 자바스크립트 함수를 공부하면서 배운 것을 어플리케이션에 일부분 적용시켜보았다.

2. 적용 예
   - 미들웨어로 isAuth와 authorityHandler를 만들어 user의 사용 권한을 제한 할 때 사용하는 함수.
   - isAuth에서 함수와 문자열을 인자로 받아 arguments를 순회하면서 권한을 처리하도록 설계하였다.

```javascript
export function isAuth(req, res, next, func, ...string) {
  return req.session.loggedIn
    ? func(req, res, next, string)
    : res.redirect("/login");
}

export function authorityHandler(req, res, next) {
  const auth = arguments[3];
  const user = req.session.user;
  for (let i = 0; i < auth.length; i++) {
    if (auth[i] === user.authority) return next();
  }
  return res.render("root/404", {
    pageTitle: "404",
    errorMessage: "접근 권한이 없습니다.",
  });
}
```

#### [ES6 module](./documents/javascript/module/module.md)

1. 요약

   - 자바스크립트 ES6 모듈을 사용하여 변수, 함수 등을 캡슐화 하였다.
   - 프론트에서 비동기로 서버에 데이터를 요청할 때 사용하는 함수가 계속 반복됐지만 send, get으로 모듈화를 하여 함수를 재사용과 유지 보수를 쉽게 할 수 있도록 개선하였다.
   - DOM 셀렉터, 이벤트를 한데 모아 관리한다. toast ui editor를 뜯어보면서 캡슐화 되어있는 코드들을 따라해보았다.

2. 적용 예
   - [event](./src/assets/js/events.js)
   - [get](./src/assets/js/get.js)
   - [send](./src/assets/js/send.js)

#### [webpack5](./documents/javascript/module/webpack.md)

#### [스크롤 애니메이션](./documents/etc/22_01_26_scrollAnimation.md)

### ExpressJS

#### [RESTFul API](./documents/http/22_01_26_restAPI.md)

### HTTP

#### [HTTP](./documents/http/21_11_21%20HTTP.md)

#### [쿠키와 세션](./documents/http/cookieAndSession.md)

### 방법론

#### [MVC 패턴](./documents/etc/22_01_26_mvc.md)

### 웹 보안

#### [프론트 앤드 개발자가 알아야 할 웹 보안](./documents/security/21_11_21.md)

#### [Form Validation](https://velog.io/@gogo78/Form-Validation)

### etc

#### [git : 잔디 잃고 git 사용법 익힌다](./documents/git/21_11_09잔디잃고%20git%20사용법%20익힌다.md)

#### [multer와 shape](https://velog.io/@gogo78/%EC%A2%8C%EC%B6%A9%EC%9A%B0%EB%8F%8C-%ED%9A%8C%EC%9B%90-%EA%B0%80%EC%9E%85-validation-%EB%A7%8C%EB%93%A4%EA%B8%B03)

#### [toast ui editor](./documents/etc/21_11_08Toast%20UI%20Editor를%20붙이면서%20배운%20것들.md)

#### [refacotring diary](./documents/refatoring)

## 🛠 업데이트

[업데이트 일지](./documents/update.md)
