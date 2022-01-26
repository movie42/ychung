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
    method: "POST",
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
