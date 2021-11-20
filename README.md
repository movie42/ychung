# 양청 홈페이지

- [양청 홈페이지](#양청-홈페이지)
  - [업데이트 2021.11.13](#업데이트-20211113)
  - [업데이트 2021. 11. 8](#업데이트-2021-11-8)
  - [앞으로 해야할일](#앞으로-해야할일)
  - [1.1. 페이지](#11-페이지)
  - [1.2. 개발 일기](#12-개발-일기)
    - [2021년 7월 17일](#2021년-7월-17일)
    - [2021년 7월 27일](#2021년-7월-27일)
    - [2021년 7월 29일](#2021년-7월-29일)
    - [2021년 8월 7일](#2021년-8월-7일)
    - [2021년 9월 1일](#2021년-9월-1일)
      - [server와 client는 어떻게 소통할까?](#server와-client는-어떻게-소통할까)
    - [2021년 9월 2일](#2021년-9월-2일)
      - [front에서 양식 검증하기](#front에서-양식-검증하기)
      - [왜 req.file이 undefined일까?](#왜-reqfile이-undefined일까)
      - [해결](#해결)
      - [AWS S3에서 작동을 안하는 걸까??](#aws-s3에서-작동을-안하는-걸까)
    - [2021년 9월 7일](#2021년-9월-7일)
      - [image resize](#image-resize)
    - [2021년 10월 9일](#2021년-10월-9일)
        - [웹 컴포넌트](#웹-컴포넌트)
  - [1.3. 참조](#13-참조)

## 업데이트 2021.11.13

- 회원가입 validation 최적화 작업
- 광고 쓰기 업데이트 (주보에서 보이게 하기 등)
- 사소한 버그 수정
- 게시판 사진 넣기 구현

## 업데이트 2021. 11. 8

업데이트 Toast UI Editor ver 3.1.1

## 앞으로 해야할일

- [x] 게시판 사진 넣기
      [참고](https://kasumil.tistory.com/177)
      [issue](https://github.com/nhn/tui.editor/issues/57)
- debounc throttle?
- [x] 동영상 넣기
      [참고](https://github.com/nhn/tui.editor/blob/master/docs/ko/custom-block.md#html-%EB%85%B8%EB%93%9C)

- [ ] 게시판 최적화하기

  - [ ] 재사용 가능한 함수 만들기 (tubeClone에서 작업했던거 가져오기)

- [ ] 검색 기능 수정 (통합 검색이 안됨)
- [ ] 광고 (날짜 별로) 선택해서 넣기
- [ ] 일정 컴퓨터, 모바일에 저장하기
- [ ] 회원 정보 스타일링
- [ ] 회원 가입 약관, 정보 수집 회원 가입에 대한 부분 넣기
- [ ] 도큐멘트 디자인 및 코딩 하기
  - [ ] 회칙
  - [ ] 메뉴얼(부서별)
- [ ] 일대일 양육 넣기
  - [ ] 일정 관리
  - [ ] 양육 신청하기
  - [ ] 말씀 암기
- [ ] 대표기도, 안내위원 스케쥴링 하기
  - [ ] 대표 기도 신청하기 또는 넣기
- [ ] 회계
  - [ ] 회계 장부 쓰기 (toast ui grid 이용해서 만들어보기)
  - [ ] 회계 영수증 처리 (사진 찍어서 회계에게 청구할 수 있도록 PDF 스캐너 같은 거 사용하기)
- [ ] MVC 모델 변경하기 (fetch 하면 프론트로 데이터를 뿌려주는 식으로 ???, 보안상 문제 없나?)

## 1.1. 페이지

1. 주보

   - [x] 게시물 목록 : /weekl
   - [x] 게시물 C : /weekly/upload
   - [x] 게시물 R : /weekly/:id
   - [x] 게시물 U : /weekly/:id/edit
   - [x] 게시물 D : /weekly/delet-

2. 묵상 에세이

   - [x] 게시물 목록 : /qt
   - [x] 게시물 C : /qt/upload
     - [x] 말씀 주소 적는 부분을 select로 변경한다.
   - [x] 게시물 R : /qt/:id
   - [x] 게시물 U : /qt/:id/edit
   - [x] 게시물 D : /qt/:id/delete

3. - [ ] 게시판 html style 적용할 수 있도록 게시판 스타일링 기능 만들기(image만... )

4. 회칙과 메뉴얼
   도큐멘트 계열의 페이지

   - [ ] 회칙 목록 : /rule
   - [ ] 회칙 C : /rule/upload
   - [ ] 회칙 R : /rule/:id
   - [ ] 회칙 U : /rule/:id/edit

   - [ ] 메뉴얼 : /menuel
   - [ ] 회칙 C : /menuel/upload
   - [ ] 회칙 R : /menuel/:id
   - [ ] 회칙 U : /menuel/:id/edit

5. 회원 정보 수정

   - [x] 프로필 R : /user/detail  
          view : session에 저장되어있는 user를 가져와서 뿌려준다.
         view : user가 쓴 게시물, 댓글 등을 전부 볼 수 있도록 한다.
   - [x] 프로필 U : /user/edit  
          session에 저장된 정보를 뿌린다. 수정시에 반영해야할 점, 수정된 사항이 따로 없으면 수정하지 않는다. profile사진만 수정했을 때, 이름과 이메일 정보가 unique이기 때문에 수정되지 않는 오류를 해결해야한다. 두번 if를 해야할지... 아니면 mongoose에서 처리하는 방법이 있을지 찾아본다.
         비밀번호를 변경하지 않았는데 다른 정보를 업데이트 할 때 비밀번호를 반복해싱하는 오류가 발생한다. 이 점을 해결해야한다.
   - [ ] 프로필 D : /user/delete  
          회원을 탈퇴하고 싶을 때 사용한다. 탈퇴시 user정보를 삭제한다. 삭제 전에 user가 비밀번호를 알고 있는지 확인하는 작업을 거치고 틀린 비밀번호를 입력하면 회원 탈퇴를 할 수 없도록 한다.

6. 로그인

- [x] 로그인시 비밀번호를 bcrypt를 통해 비교하고 로그인 할 수 있다.
- [x] /login

7. 회원가입

   - [x] unique를 비교하여 회원가입을 할 수 있다.
   - [x] /join
   - [ ] 개인정보 처리방침 동의서, 제 3자제공 동의서 작성하기
   - [ ] 이메일 인증
   - [ ] 로봇, 반복 가입 방지

8. 회계
9. 검색

- [x] 통합 검색 구현 data set에서 불러오기
- [ ] view 디자인 하기

9.  공지사항(광고)

    - [x] /notice
      - 공지사항의 list가 보인다.
    - [x] C /notice/create
      - 관리자 계정과 총무만 생성할 수 있다.
    - [x] R /notice/:id
      - 모든 사용자가 다 읽을 수 있다. 댓글은 로그인 한 유저만 가능하다.
    - [x] U /notice/:id/edit
      - 관리자와 총무만 수정할 수 있다.
    - [x] D /notice/:id/delete
      - 관리자와 총무만 삭제할 수 있다.

10. 회의록
11. 월례회
12. 투표
13. 설문 조사
14. 신청서
    -> 프론트에서 신청서 작성하기를 누르면 항목 제목과 객관식 또는 주관식 질문을 만들 수 있도록 한다. (DB에서 해당 값이 무엇이면 무엇이 html코드로 만들어지도록 한다.)
    -> 그런데 이렇게 무작위로 만든 form에서 body값과 value값을 어떻게 하면 수집할수 있을까?
    -> 반복문으로 그냥 데이터를 우겨넣는 방식으로 한번 만들어 보자.
15. 예배, 소그룹 출석부
    // main page에 특정 날짜에만 button이 생기도록 하게 한다.
    // 그 버튼을 누르면 post를 한다.
    // post는 누른 User의 이름과 email 날짜를 저장한다.
    // 저장한 user의 email값이 post를 저장하는 데이터베이스에 있으면 button이 보이지 않게 하고 주소값으로 요청하더라도 req가 되지 않게 한다.
    // post list는 날짜별로 조회할 수 있게 한다.
16. api

    - [x] view : /api/:id/view  
           게시물을 조회했을 때 view가 올라가도록 하게 한다. 마지막 요청 값만 요청 값으로 인정하게 한다.
    - [x] comment : /api/:id/comment  
           comment는 다른 CRUD와 같다. front에서 fetch로 요청하고 back-end에서 fetch의 요청값을 반영하여 댓글이 완성되게 한다.

17. 페이지 네이션
    - [ ] 게시물을 데이터 베이스에서 불러올 때, 각 페이지당 10개씩만 불러오도록 하게 한다.

## 1.2. 개발 일기

### 2021년 7월 17일

홈페이지를 디폴로잉한지 일주일이 되었다. 현재는 간단한 글을 쓰고 볼 수 있는 정도의 웹 페이지 수준이다. 아직 웹 어플리케이션이라고 부르기는 어렵다. 디폴로잉을 하기 위해 수많은 테스트를 해야하는데 프론트부터 백앤드까지 해야할것이 꽤 많다. 한번 붙잡고 하다보면 어느덧 밖은 어둡다.

1. session  
   생각보다 session은 유용하다. req.path를 session값에 저장해서 login이 필요한 서비스에서 로그인을 요구하면 로그인 한 후에 바로 그 서비스로 이동을 할 수 있다. 또한 user정보를 저장하거나 login인이 되어있는지 그렇지 않은지 알 수 있다.
   만약 session은 logout을 하면 session.destroy가 되어서 session에 저장된 정보는 모조리 삭제된다. 궁금한건 session이 destroy됐을 때, db에서도 삭제가 되는지 잘 모르겠다. 이건 테스트를 해봐야할 것 같다.

2. scss  
   css를 사용해서 스타일링을 관리하는건 생각보다 어려운일이다. 컴포넌트의 수가 늘어날 수록 정말 많은 class와 id들을 관리해야하기 때문이며 button이나 link, font-size, color style 등 스타일을 통일해야하는 경우 css로 관리하기 매우 어렵다. 하지만 scss를 통해서 \_variable, \_mixin을 미리 설정해서 대량으로 적용해야하는 button이나 font-size등을 기억하기 쉬운 이름으로 저장면 해당 스타일을 변수나 함수처럼 끌어와 사용이 가능하기 때문에 매우 유용하다.

### 2021년 7월 27일

개발 일기는 10일만에 작성한다. 매일 작성하기로 해놓곤... 그래도 계속 꾸준히 업데이트를 하고 있어서 좋다. 현재 댓글 코드를 만들면서 맞딱드리게 된 문제가 있다.

- 게시물 삭제시 참조하고 있는 댓글이 함께 삭제되지 않는다. (원래 이렇게 하는게 맞나?)
- 댓글 삭제시 그 댓글을 참조하고 있는 게시물에서 댓글 아이디가 삭제되지 않는다.

원래 DB에는 데이터가 남겨져 있어야 하는건가? 생각해보면 싸이월드에서 내가 탈퇴를 했다고 해서 내가 쓴 게시물이 삭제되지는 않으니까... 그래도 오류가 생길 것 같은데, 잘 모르겠지만 일단 db에서 삭제가 되지 않는 것으로 알고 있어보자.

홈페이지를 만들면서 공부해야할것들

- [ ] 애니메이션
- [ ] 검색 자동 완성
- [ ] 무한 스크롤
- [x] 독립 스크롤 : 감싸 않은 div를 크기를 제한하고 overflow를 scroll로 하면 된다.
- [ ] 버튼
- [x] 백, 프론트 통신 fetch를 이용해서 클라이언트와 백앤드간의 소통이 가능하다.
      redrection은 작동하지 않는다. 단지 POST와 GET요청에 따라 front에 데이터를 보낼 뿐이다.
      그러면 클라이언트에서 백앤드에서 넘어온 정보를 이용해서 나머지 과정을 처리해주어야한다. 또한 클라이언트에서
      세션을 사용하는 방법을 잘 모르겠다. 보면 sessionStore를 이용하는데 sessionStore는 해당 페이지를 벗어나면
      초기화되기 떄문에 데이터를 저장해서 해당 값으로 boolean을 판단해야한다면 적합하지 않다. 그래서 localStore를 사용했지만
      그건 크롬을 조금만 잘 아는 사람이라면 변이가 가능하기 떄문에 해당 값으로 백앤드를 조작하는 알고리즘을 만들면 안된다.
- [ ] 이벤트리스너는 어디에 ???
- [ ] 회원 가입...관련 법률, 개인정보 이용 약관, 보안, 쿠키 사용 허용에 대한 버튼 등...
- [ ] csv 다운로드

### 2021년 7월 29일

드디어 백앤드 코멘트를 달고 삭제할 수 있도록 기능을 만들었다만... 수정 기능은 아직 못 만들었다...

- [ ] 코멘트 수정 버튼 만들기

왜 이렇게 하면 할 수록 할 일이 쌓여가는지 모르겠다. 사실 일부터 십까지 만드는건 어려운일이다. 하면서 도움이 되는 부분이 있지만...

### 2021년 8월 7일

helmet 사용을 읽어보았다. 보안을 잘 모르더라도 최소안의 보안을 해야했기 때문이다.
일단 간단하게 3가지를 적용시켰다.
helmet default
hidePoweredBy
contentSecurityPolicy
hsts

### 2021년 9월 1일

#### server와 client는 어떻게 소통할까?

회원 가입 validation 코드를 작성하는데, 처음에 구상은 이랬다.

> 구상
>
> - session storage를 사용해서 input 값을 비밀번호를 제외하고 전부 저장한다.
> - server에서 status code가 400이 return 될경우 session storage에 저장한 값을 불러와 input에 뿌려준다.

일단 구상을 이루기 위해서 코드를 작성했다. session storage에 저장하는 것과 input에 그려주는 것은 쉽게 구현할 수 있었다.

```javascript
const form = document.querySelector(".form_container form");
const inputs = form.querySelectorAll("input");
const button = form.querySelector("button");

function handleSessionStorage(e) {
  inputs.forEach((value) => {
    if (value.name !== "password" && value.name !== "password2") {
      sessionStorage.setItem(value.name, value.value);
    }
  });
}

function paintInputValue() {
  const data = Object.keys(sessionStorage);
  for (let item of data) {
    inputs.forEach((value) => {
      if (value.name === item) {
        value.value = sessionStorage.getItem(item);
      }
    });
  }
}

if (form) {
  button.addEventListener("click", handleSessionStorage);
  paintInputValue();
}
```

그런데 문제는 server에서 status를 400으로 보낼 경우를 client에서 받아야하는데 어떻게 받아야할지 난감했다.

1. Controller에서 return을 하면 router에서 post를 하도록 설계 되어있기 때문에 페이지가 새로고침된다.
2. fetch로 할 경우 post를 하여 값을 넘겨야하는데 그렇게하더라도 역시 controller에서 값을 받는다.

그러니까 request 요청이 단일이 아니라 두 갈래로 나뉘어있는게 문제였다. 이걸 어디서부터 설계를 해야할지 난감했다. 그래서 그냥 일단 어떻게 동작하는지만이라도 파악해보기 위해서 그냥 fetch로 post요청을 던졌다.

```javascript
async function handleSessionStorage(e) {
  e.preventDefault();
  const request = await fetch("/join", {
    method: "POST"
  });

  if (request.status === 400) {
    inputs.forEach((value) => {
      if (value.name !== "password" && value.name !== "password2") {
        sessionStorage.setItem(value.name, value.value);
      }
    });
    paintInputValue(request);
  }
  if (request.status === 200) {
    console.log("hi");
  }
}

function paintInputValue(request) {
  if (request.status === 400) {
    const data = Object.keys(sessionStorage);
    for (let item of data) {
      inputs.forEach((value) => {
        if (value.name === item) {
          value.value = sessionStorage.getItem(item);
        }
      });
    }
  }
}
```

일단 너무 당연하게도(?) 동작을 하긴 하지만 의도대로 되지 않았다. 일단 새로고침이 계속 된다. 그래서 버튼을 누를 때, 새로고침이 안되도록 막아버렸다.

```javascript
async function handleSessionStorage(e) {
  e.preventDefault();
  const request = await fetch("/join", {
    method: "POST"
  });
........
```

그럼 request의 status 코드를 받을 수 있었다.
하지만 새로운 문제를 맞딱뜨렸다.

1. 본래 설계했던 controller가 정상적으로 작동을 하지 않을 뿐더러, 원래 성공하는 값을 넘겨도 status는 여전히 400이 넘어왔다.
2. 이렇게 하면 굳이 session storage에 값을 저장할 필요가 없다. 새로고침이 되지 않으니까 작성한 값이 사라지지도 않는다.
3. 문제는 validation이 되지 않는다. client에서 오류 메시지를 띄워줘야하는데 controller에서 설계했던 대로 값이 넘어오지 않았다.

그래서 stackoverflow를 열심히 뒤적거렸다.

> 질문 : how to get http request from server to client javascript

아직 유의미한 대답은 찾지 못했다. 그래서 일단 다시 가설을 세워보기로했다.

> 재구상

- 그러면 comment를 설계 할 때, fetch를 사용해서 client와 server간에 소통을 했던 것처럼 JSON으로 값을 주고 받도록 설계를 변경한다.
- 그렇게 하면 status code를 client에 보낼 수 있다. 그러면 두 가지를 다 잡을 수 있을 수도 있다.
- 먼저 첫 번 째로 DB를 조회해서 이미 DB에 있는 unique한 값을 입력했는지 여부를 client로 보낼 수 있다. 그리고 validation 코드를 client 쪽에서 작성하여서 controller로 값이 넘어가기전에 그 값이 올바른 값인지 아닌지 검증할 수 있다.
- 그렇게 하면 굳이 session storage를 사용하지 않아도 사용자가 입력한 값이 사라지지는 않을 것이다.

> 꼭 성공하기를 😢

### 2021년 9월 2일

#### front에서 양식 검증하기

다시 컴퓨터에 앉았다. 저번 구상대로 모든 것을 싹 바꾸기로 했다. 일단 프론트에서 회원가입 양식을 받아서 값을 먼저 검증하기로 했다. 그래서 기존에 회원 가입 양식을 확인하는 절차를 만들었다.

```javascript
async function submitJoinForm(e) {
  e.preventDefault();
  const data = makeDictionary(); // 객체를 만드는 함수
  const checker = checkJoinData(data); // 객체를 사용해 데이터를 확인하는 함수 최종적으로 true와 false를 넘겨준다.
  if (checker) {
    postDataToServer(data); // checker에서 true가 넘어오면 fetch로 데이터를 서버로 보낸다.
  }
}
```

저번에 구상했던 것을 전부 뒤집어 엎었지만 지금이 코드 가독성이나 작동 측면이나 모든 면에서 훨씬 좋은 것 같다. 괜히 sessionStorage를 사용하지 않아도 된다.

일단 document에서 input값을 불러오는 것을 내가 반복하기가 너무 싫었다.(나는 게으르니까...) 그래서 querySelectAll을 사용해서 input을 전부 불러오기로 했다. 그럼 유사 배열로 input을 전부 불러올 수 있다.

```javascript
function makeDictionary() {
  const inputDict = {}; // 객체 생각해보니 이렇게 안해도 될것같다.
  inputs.forEach((value) => {
    if (!inputDict[value.name]) {
      inputDict[value.name] = value.value.trim();
    }
  });
  return inputDict; // 그냥 이 값을 {}이렇게 넘겨줘도 될 것 같다.
}
```

만든 객체를 checkJoinData에 넘겨주고나면 객체 값을 검증하는 함수를 짰다. 최대한 반복을 피하고 싶었다. 그런데 왜 함수가 결국 거기서 거기인 것 같을까. 어쨌든 객체에 저장된 키 값을 각각 email, name, username, password를 검증하는 함수로 보낸 다음에 원하는 값으로 입력되도록 체크하게끔 했다. 아직은 가입자가 뭘 잘못했는지 메시지를 띄워주지는 않는다.

checker 함수는 넘겨받은 문자를 정규 표현식으로 검증한다. 정규 표현식은 구글에 많이 나와있고, 특수문자를 제거하는 방법이나 한글만 입력할 수 있도록 하게 하는 등의 조합법이 친절하게 설명되어있다.

[참고한 동영상 : JavaScript Client-side Form Validation](https://youtu.be/rsd4FNGTRBw)

```javascript
function checkJoinData(obj) {
  for (let item in obj) {
    switch (item) {
      case obj[item] === "":
        errorMessage(item);

      case "email":
        if (!isEmail(obj["email"])) {
          errorMessage("email");
          return false;
        } else {
          successMessage("email");
        }
      case "userName":
        if (!isUserName(obj["userName"])) {
          errorMessage("userName");
          return false;
        } else {
          successMessage("userName");
        }
      case "name":
        if (!isName(obj["name"])) {
          errorMessage("name");
          return false;
        } else {
          successMessage("name");
        }
      case "password":
        if (
          isPassword(obj["password"]) &&
          obj["password"] === obj["password2"]
        ) {
          successMessage("password");
          successMessage("password2");
        } else {
          errorMessage("password");
          errorMessage("password2");
          return false;
        }
    }
  }
  return true;
}

function errorMessage(str) {
  inputs.forEach((value) => {
    if (value.name === str) {
      value.classList.add("errorWarning");
      value.classList.remove("sucessMessage");
    }
  });
}

function successMessage(str) {
  inputs.forEach((value) => {
    if (value.name === str) {
      value.classList.add("sucessMessage");
      value.classList.remove("errorWarning");
    }
  });
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.exec(
    email
  );
}

function isName(name) {
  return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,6}$/.exec(name);
}

function isUserName(userName) {
  const checkerUserName = /^[a-zA-Z0-9]{5,10}$/.exec(userName);
  if (checkerUserName) {
    return checkerUserName;
  }
}

function isPassword(password) {
  const checkPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.exec(
      password
    );
  if (checkPassword) {
    return checkPassword;
  }
}
```

이렇게 하고나면 일단 프론트에서 검증을 마칠 수 있다. 검증을 할 때, 하나의 값이라도 false가 나오면 false값을 return 하도록 만들었다. 그래서 validation이 처음에 설계한 것과 다르다. 값을 차례대로 return 하기 때문에 함수가 실행 되다 중단된다. 아마도 지금은 개선되지 않았지만 배열에 boolean값을 push하여서 모두가 참이면 true를 리턴하게 하고 하나라도 거짓이면 false를 반환하게끔 하면 값은 값대로 전달되고 양식 입력이 올바르지 않은 곳을 한번에 체크 할 수 있을 것이다.

#### 왜 req.file이 undefined일까?

문제는 회원 가입 양식에 file을 받아야하는데 controller가 file을 계속 인지하지 못했다. 이것으로 거의 3시간을 날렸다.

구글에 열심히 검색을 했다.

> - multer with fetch

- req.file undefined multer, fetch, javascript

하지만 답을 쉽게 알수 없었다. status는 400이나 500을 받았다.

```javascript
async function postDataToServer(data) {
  const response = await fetch("/join", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: JSON.stringify(data)
  });

  console.log(response);

  if (response.ok) {
    window.location.pathname = "/login";
  } else {
    console.log("wtf");
  }
}
```

response값이 ok가 아니면 받게되는 'wtf'을 몇 시간동안 받다보니까 나한테 욕하는 것 같아서 기분이 점점 좋아지지 않았다. 처음엔 이것만 해결하고 밥먹어야지 했는데... 하다보니 저녁시간도 놓치고 정말 짜증이 이만 저만이 아니었다.

처음에 multer를 구성하고 있는 middleware가 잘못됐다고 생각했다. 왜냐하면 file을 post하려고 요청을 보냈는데 status값이 500을 받았기 때문이다.

[500 Internal Server Error](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/500)

그런데 조금만 생각해보면 근거가 없는 결론이었다. 보내는 값이 잘못된건지 서버가 값을 처리를 못하는건지 알 수가 없잖아? 아마도 처음에 fetch를 할 때, file을 받기 위해 보낸 header값이 잘못 된거라고 생각한다.

```javascript
headers:{
      "Content-Type":"multipart/form-data" //
    }
```

어쨌든 이 값을 "application/json"으로 바꿔주니까 file은 여전히 undefined이지만 나머지 body값은 json으로 넘겨 받을 수 있었기 때문이다.

#### 해결

결론적으로

- multer를 구성하고 있는 middleware는 아무 잘못이 없었다.
- 애초부터 값을 잘못 넘겨주고 있었다.

> 해결하는데 도움이 된 stackoverflow 게시물
> [req.file is undefined using multer](https://stackoverflow.com/questions/55926272/req-file-is-undefined-using-multer)

내가 만든 객체 값을 json으로 서버로 보내는 방법이 잘못되었다.

```javascript
async function postDataToServer(data) {
  const file = new FormData(form); // 아얘 form데이터를 받아서 fetch data로 넘겨주었더니 해결되었다.

  const response = await fetch("/join", {
    method: "POST",
    body: file
  });

  console.log(response);

  if (response.ok) {
    window.location.pathname = "/login";
  } else {
    console.log("wtf");
  }
}
```

이 요청에 적당한 Http header값을 지금은 모르겠다. 그런데 header를 제거하고 body에 FormData로 생성한 form값을 한번에 넘겨주었더니 컨트롤러에서 body값뿐 아니라 file까지 전부 인식했다.

- 지금까지의 과정으로 추측해볼 수 있는 것은 post를 요청할 때, router가 postJoin을 하기 전에 multer를 거치도록 되어있는데 이때 데이터를 json이 아니라 form 데이터를 한번에 넘겨주면 multer가 data를 보고 원래대로 파일과 body값을 전부 넘겨주는 듯 하다.

- 그럼 front의 validation이 헛수고가 아닌가 생각할 수 있지만 그렇지도 않다. fetch로 넘어가기전에 값을 검증한 다음에 넘겨주는 거니까 의미가 없지 않다.

#### AWS S3에서 작동을 안하는 걸까??

로컬 서버에서 성공은 했다. 문제는 heroku 업데이트 후에 회원가입이 정상적으로 작동을 하지 않는다. 이유가 뭘까? 잘 모르겠다. 일단 status code는 500을 받는다. server에서 뭔가 문제가 생긴것이 분명한데 AWS S3로 파일을 넘겨주면서 아마도 뭔가 문제가 있는게 아닐까? 그냥 추측을 해볼 뿐이다.

그럼 정상적으로 작동을 시키기 위해서 조금 더 코드를 정밀하게 만들어야한다.

> **회원 가입이 되지 않는 이유를 찾기 위해서 해야 할 것들**

- controller에서 unique 검증이 실패했을 때, status code를 front로 보내주는데 이렇게 했을 경우에 front에서 error메시지를 어느 부분에서 실패한 것인지 보여주어야한다. 지금 코드는 UX 디자이너가 봤을 때, WTF이다.
- front에서 검증이 실패했다면 그냥 빨간색 줄만 긋지 말고 왜 실패했는지 메시지를 출력해야한다.
- S3로 파일 업데이트를 실패하기 때문에 회원 가입이 되지 않는 것인지 아닌지를 알기 위해서는 일단 파일을 업로드 하지 않고 회원 가입을 진행 해본다. 다른 조건이 성공 조건인데 여전히 회원 가입에 실패한다면 S3를 의심해보기도 전에 fetch에서 문제가 있다고 판단해볼 수 밖에 없다.

계속 테스트를 반복하다보니까 만만치가 않다. 아마 디버깅 방법이 그닥 좋지 않기 때문이 아닐까? console.log로 값을 찍어서 보는 것이 한계가 있다. 그런데 **_nodejs는 디버깅 어떻게 하는거냐?_** 🥲

### 2021년 9월 7일

#### image resize

[12/ File Api와 이미지 용량 줄이기](https://feel5ny.github.io/2018/05/27/JS_12/)

[AWS Lambda를 이용한 이미지 썸네일 생성 개발 후기](https://medium.com/daangn/aws-lambda%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%8D%B8%EB%84%A4%EC%9D%BC-%EC%83%9D%EC%84%B1-%EA%B0%9C%EB%B0%9C-%ED%9B%84%EA%B8%B0-acc278d49980)

[온디맨드 이미지 리사이징 (Ondemand Image Resizing) 원리 및 예제](https://roka88.dev/102)

[김정환 블로그 이미지 업로드 - 1. multer 모듈로 파일 업로드](https://jeonghwan-kim.github.io/%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-1-multer-%EB%AA%A8%EB%93%88%EB%A1%9C-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C/)

[sharp를 활용한 image resizing + buffer 이해하기](https://darrengwon.tistory.com/565)

### 2021년 10월 9일

##### 웹 컴포넌트

[네이버 웹 컴포넌트](https://d2.naver.com/helloworld/188655)

## 1.3. 참조

> [Mark Down 문법](https://gist.github.com/ihoneymon/652be052a0727ad59601)  
> [MarkDown All In One](https://github.com/yzhang-gh/vscode-markdown)
