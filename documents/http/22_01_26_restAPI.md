# REST API

## REST?

### 정의와 개념

REST는 REpresentational State Transfer의 약자로 용어에서 나온 것처럼 표현의 상태를 전달을 뜻한다.

어떤 자원에 대해서 CRUD 연산을 수행하기 위해서 URI로 GET, POST, PUT, PETCH, DELETE 등의 method를 요청을 보낸다.

요청은 json이나 xml등의 형태로 요청 자원을 보낼 수 있다.

### REST의 구성 요소

Resource(URI), Method(행위), 표현(Representation of Resource)가 있다.

1. 자원(resource)

   - 모든 자원에는 고유한 id가 존재한다. 이 자원은 server에 존재한다.
   - 자원을 구별하는 id는 http url이다.
   - 클라이언트는 URI를 이용해 자원을 지정하고, 자원의 상태에 대한 조작을 server에 요청한다.

2. 행위(method)

- http 프로토콜의 method를 사용한다.
- get : read. 정보 요청
- post : create. 클라이언트에서 서버로 전달하려는 정보를 보내 데이터를 입력한다.
- put : update. 정보 업데이트. 데이터 전체를 바꿀 때 사용한다.
- patch : update. 정보 업데이트. 내용을 갱신하기 위해 사용한다.
- delete : delete. 정보를 삭제 한다. 안전상의 문제로 서버에서 비활성화 한다.

3. 표현(representation of resource)

- 클라이언트와 서버가 데이터를 주고받는 형태.
- JSON, XML, TEXT, RSS 등이 있다.
- JSON, XML을 통해 데이터를 주고 받는 것이 일반적이다.

## REST API란?

### API(Application Programming Interface)

운영 체제나 프로그래밍 언어가 제공하는 기능을 제어할 수 있게 만든 인터페이스를 뜻한다.

### REST API

REST의 특징을 기반으로 서비스 API를 구현한 것.

### 특징

각 요청이 어떤 동작이나 정보를 위한 것인지를 그 요청의 모습 자체로 추론이 가능한 것이다.

## expressJS에서 적용하기

express에서 route를 제공한다.

```javascript
const blogRouter = express.Router();

blogRouter
  .route("/upload")
  .all(preUrl, (req, res, next) =>
    isAuth(
      req,
      res,
      next,
      authorityHandler,
      "master",
      "blogger",
      "leader",
      "administrator",
    ),
  )
  .get(getBlogWrite)
  .post(postBlogWrite);
```

Express Router 메소드를 사용하여서 REST API를 보다 쉽게 작성할 수 있다. 클라이언트에서 정보를 요청할 때 사용하는 URI를 적고 그 다음 미들웨어를 추가한다. 미들웨어는 해당 URI에 접근 할 때, 권한을 제어하거나 정보를 제어하는(파일 크기를 줄인다던가) 등의 함수를 넣는다. .all()은 해당 URI를 통해 get과 post를 요청할 때, 모두에게 적용되는 미들웨어를 넣을 때 사용한다.

만일 get이나 post에만 미들웨어를 적용해야할 경우에는 controller에서 최종적으로 실행되는 함수 이전에 함수를 포함하면 된다.

REST API가 유용한 경우는 회원 가입 서식에서 form validation을 할 때나 관리자가 특정 게시물을 보여줄지 감출지 여부를 정할 때, 버튼을 통해서 서버에 요청을 보내 DB를 조작하게 한 경우였다.

### 대표적인 예시 toggle button

관리자가 특정 게시물을 다른 게시물에 보이게 하도록 요청하는 버튼을 만들었다. 하지만 버튼을 누를 때마다 페이지가 새로고침 되지 않아야했다. 그래서 REST API를 사용해 사용자가 POST 요청을 보내 DB에 특정 데이터를 수정하게 하였다.

#### data-set

조회를 위해서 ID값이 필요했다. HTML에서 data-set 값을 지정해서 id를 넣었다.

```pug
div.isWeeklyButton
    input(type="checkbox" name="isWeekly" id="isWeekly")
    label(for="isWeekly" data-id=notice.id)
```

#### toggle button 조작

```javascript
function handleChecker() {
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
}
```

```javascript
api
  .route("/notice/isWeekly")
  .all((req, res, next) =>
    isAuth(req, res, next, authorityHandler, "master", "administrator"),
  )
  .post(postNoticeToWeekly);
```

버튼을 누르면 fetch 함수가 api에 POST 요청을 보낸다. 이 기능을 수행할 수 있는 권한은 관리자로 제한 되어야한다. 관리자는 수정하고자 하는 데이터를 JSON으로 서버에 보낸다. 서버에서는 validation을 거치고 수행한 결과를 클라이언트에게 보낸다. 클라이언트는 status값이 200인 경우에 toggle button을 변경한다.

## REST API의 장점과 설계시 주의해야할 점

expressJS를 통해서 REST API를 작성해보았다. 지금까지 내가 경험한 REST API의 장점은 클라이언트와 서버간의 소통을 비동기로 할 수 있게 되고, 페이지의 새로고침을 요구하지 않을 수 있다.
REST API를 사용하면 SPA 어플리케이션을 간략하게 만들 수 있다. 보통 페이지 정보를 요청할 때, URI를 입력하면 URI를 통해 controller가 결과 값을 클라이언트에 던지면서 새로고침이 발생한다.
하지만 window 객체를 사용하여 fetch로 요청한 값을 페이지에 그려 넣어주고 URI 정보는 브라우저에 밀어넣을 수 있다. 이렇게 하면 변경 되는 부분만 사용자에게 보여줄 수 있고 URI를 통해 정보의 위치를 제공할 수 있게 된다.

주의해야할 점은 POST, PUT, PETCH, DELETE와 같은 요청을 보낼 때, 반드시 서버에서 요청을 보내는 사람이 누구인지 검증 로직이 필요하다. 그렇지 않으면 악의적인 의도를 가진 누군가가 DB 자원을 마음대로 변경하고 삭제가 가능해지고 그러면 재앙이 발생할 수 있다.

## 마무리

REST API를 활용해서 어플리케이션을 보다 더 넓게 확장할 수 있는 것 같다. 외부 어플리케이션과 특정 데이터를 공유해 CRUD를 진행할 수도 있고, 내부적으로 사용자가 보다 더 인터렉티브하게 어플리케이션을 사용할 수 있도록 도움을 준다. 하지만 REST API는 내부 자원이 외부와 공유되는 것이기 때문에 validation을 여러 겹으로 수행해서 DB가 악의적인 의도를 가진 사용자로부터 보호되도록 해야한다.

공부를 하고나니 REST API 디자인 가이드를 조금 더 살펴보고 설계를 할 때, 가이드에 맞춰서 설계해야겠다.

> 참조
> [REST API가 뭔가요?](https://www.youtube.com/watch?v=iOueE9AXDQQ&t=270s)  
> [[Node.JS] 강좌 10-2편: Express 프레임워크 응용하기 – RESTful API 편 : vleopert](https://velopert.com/332)  
> [REST(REpresentational State Transfer)란? : 슬기로운 개발생활](https://dev-coco.tistory.com/97)
