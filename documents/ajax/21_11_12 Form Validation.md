# Form Validation

폼을 검증하는 것은 사용자 경험에 좋은 영향을 준다. 회원가입이나 로그인을 할 때, 서식 쓰기를 거부하거나 회원 인증을 거부하면 왜 그런지 이유를 알려주어야한다. 그러지 않을 경우 사용자는 미궁속에 빠지게 될 것이다.

이전에 서식 검증 코드를 만들었지만 코드가 작동만 할 뿐이었다. 그래서 서식 검증 코드를 조금 손봐서 다시 작성하기로 했다.

기존의 서식 검증 코드는 프론트에서 글자수나 필수적으로 들어가야하는 문자에 대해서만 검증을 했다. 회원 가입 버튼을 눌렀을 때, 백앤드에서 아이디 중복이나 비밀번호 검증을 했다. 하지만 이 절차가 매우 불편했다. 왜냐하면 사용자가 이메일을 입력했을 때, 사용할 수 있다고 알려주었는데 회원 가입 버튼을 누르자 다시 이메일이 중복된다는 메시지를 프론트에 출력했기 때문에 사용자가 두 번 일을 해야했기 때문이다. 게다가 switch문을 사용해서 수많은 분기점이 있는데 나중에 어디에서 문제가 생기는건지 찾는것이 난감해졌다.

그래서 이메일, 아이디 등 중복 검사를 해야하는 경우에도 프론트에 입력을 하면 글자수나 특수 문자 입력 등을 검사하는 동시에 백앤드에서 사용 가능한 것인지도 알려주는 식으로 바꾸기로 했다.

검증은 입력이 이루어지기 전에는 하지 않고 입력 후에 이벤트 리스너를 통해서 포커스가 이동했을 때 이루어지도록 하였다. 코드를 다시 작성하면서 두 가지 원칙을 지키기로 했다.

1. 함수가 한번에 하나의 일만 하게 하기
2. 함수 역할 쪼거나, 하나로 합치기

## 프론트 코드 다시 작성하기

처음에는 기존 코드에서 각 역할별로 함수만 쪼개려고 했는데 작성을 하다보니 애초부터 검증 로직이 별로 좋지 않았다.

1. 회원이 회원 가입 양식을 입력한다.
2. 가입 양식을 전부 입력한 후에 클릭 버튼을 누르면 각 양식 조건에 맞지 않으면 그 부분에 오류 메시지를 던지고 조건에 맞게 입력하면 성공 메시지를 던진다.
3. 양식 조건에 맞게 입력했더라도 이메일, 사용자 이름이 중복되는 경우 다시 메시지를 던진다.

이 조건에 맞게 코드를 수정하는게 좋지 않았다. 코드를 작성하는 입장에서도 함수를 쪼개고 쪼갠 함수를 다른 함수에서 쓰는 방법이 점점 난해해졌다. 그래서 접근을 다시했다.

1. input에 사용자가 접근해서 가입 양식을 입력하고 텝이나 마우스로 포커스를 벗어나면 바로 가입 양식을 검증하고 오류 또는 성공 메시지를 던져준다.
2. 프론트에서 글자수나 기타 조건에 만족했다면 백앤드로 바로 데이터를 보내서 중복 체크 등을 한다.
3. 최종적으로 사용자는 조건에 맞는 오류나 성공 메시지만 보게 된다.

### inputRef 함수 만들기

```javascript
function inputRef() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("focusout", function (e) {
      return handleChecker(e.target);
    });
  }
}
```

먼저 form 안에 있는 input을 참조하는 함수를 만들었다. 그래서 포커스가 벗어났을 때, 입력한 값에 대해서 검증을 시도하도록 하였다.

이벤트 핸들러에서 이벤트를 보낼 때, 익명함수 안에 따로 handleChecker를 보낸 이유는 handleChecker 함수는 다른 곳에서도 재사용할 가능성이 있다고 판단해서 노드만 받도록 설계했기 때문이다.

나중에 click 이벤트를 등록해서 handleChecker를 다시 사용하게 되는데 node를 받도록 설계했기 때문에 굳이 이벤트 타겟에서 현재 노드가 무엇인지 다시 작성하지 않아도 되었다.

### handleChecker 작성과 역할 범위

```javascript
function handleChecker(node) {
  const name = node.name;
  const value = node.value;
  const checked = isTrue(name, value);
  if (checked) {
    return checkedDataBase(checked, node);
  }
  return paintMessage(checked, node);
}
```

handleChecker 함수는 각 서식을 isTrue함수에 넘겨서 프론트와 서버에서 입력 값을 검증하게 한다. 이후에 메시지를 그려주는 역할까지 해야하는지 다른 곳에서 처리해야하는지 고민이 됐다. 왜냐하면 백앤드에서 DB를 조회 한 다음에 paintMessage 함수를 다시 실행하기 때문이다. 그러면 handleChecker의 역할이 애매해진다.(이름이 애매하기 때문이기도 하다.) 하지만 프론트 검증시 paintMessage를 실행 시킬 곳을 정하는 것도 어려웠기 때문에 handleChecker에서 프론트에서 검증된 값의 성공 여부를 알려주기로 했다.

### isTrue 함수와 비밀번호 검증

```javascript
function isTrue(name, value) {
  if (value) {
    if (name === "password2") {
      const node = findNode(inputs, "name", "password");
      return node.value === value;
    }
    const obj = {
      email:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      name: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,6}$/,
      userName: /^[a-zA-Z0-9]{5,10}$/,
      password:
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/
    };
    return obj[name].exec(value) ? true : false;
  }
  return false;
}
```

정규 표현식을 사용해서 검증을 했다. 정규 표현식은 아직도 낮설고 어렵다. 일단 구글에서 검색해서 붙여넣기를 했다.

> 정규 표현식 참고
> [이메일 정규표현식](https://webisfree.com/2016-05-12/%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%A3%BC%EC%86%8C-%EA%B2%80%EC%A6%9D-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%A0%95%EA%B7%9C%ED%91%9C%ED%98%84%EC%8B%9D)  
> [비밀번호 정규 표현식](https://beagle-dev.tistory.com/114)

각 node의 이름을 객체에 넣어서 넘어온 이름에 해당하는 값을 정규표현식에서 검증한 다음에 true와 false를 리턴하게 하였다.

비밀번호를 검증할 때 고민이 많았다. 처음에는 pw로 묶어서 한번에 보내게 했는데 이렇게 하면 내가 생각한 로직에 맞지 않았다. 그래서 일단 password를 검증하고 포커스가 비밀번호 확인으로 넘어가면 password를 검증해서 성공 여부를 사용자에게 알려주고 password2는 password와 값이 같은지 여부만 검증해서 사용자에게 성공 여부를 알려주도록 설계했다.

## 백앤드에서는 어떻게 처리해야할까?

```javascript
async function checkedDataBase(bool, node) {
  const value = node.value;
  const name = node.name;

  if (name === "email" || name === "userName") {
    const response = await fetch(`/url/${name}=${value}`, {
      method: "GET"
    });

    const { exist } = await response.json();
    const checked = !exist;
    return paintMessage(checked, node, "exist");
  }

  return paintMessage(bool, node);
}
```

checkedDataBase 함수는 프론트에서 checked된 값이 true일 경우에만 값이 넘어가도록 하게 했다. 백앤드에서 검증해야하는 것은 이메일과 사용자 이름만 하면 되기 때문에 모든 값이 true일 경우 checkedDataBase함수가 실행된다. 하지만 이 함수 안에서 email과 userName일 경우에만 fetch 함수로 값을 던지도록 하였다.

fetch로 get을 할 때, body로 json 값이 넘어가지 않았는데 이유를 잘 모르겠다. 헤더를 설정기도 해보고 여러가지 시도를 해보았지만 되지 않아서 파라미터 값으로 넘겼다.

## 해당 함수는 재사용이 가능할까?

함수를 작성할 때, 함수를 export하여서 다른 곳에서도 재사용이 가능하도록 작성하려고 노력했다. 하지만 함수가 절차적로 실행되도록 설계되었기 때문에 재사용은 어렵다. 만약 함수를 재사용하고 싶다면 인수 값으로 함수를 받아 실행하도록 설계 해야만 한다.

그러나 그렇게 할 경우, 함수로 인수를 여러개 받아서 실행하는 식으로 설계하게될 것이고 두 방법의 차이가 없다. 아직 함수형 프로그래밍의 철학을 제대로 이해하지 못하고 있다.

일단 시도라도 해보았으니까 일단은 마무리하기로 했다. 조금 더 공부 후에 함수형 프로그래밍의 개념을 이곳에 적용하고 소개하면 좋겠다.

## 마무리

이번에 Form Validation을 하면서 역시 설계 로직이 가장 중요하다는 것을 알게 되었다. 그냥 검증 절차를 변경했을 뿐인데 코드를 수정하거나 함수를 재사용하는 등의 일이 훨씬 수월해졌다.

그럼 이렇게 한것으로 완성인가? 아직 불안하다. 왜냐하면 XSS 취약점 이슈가 남아있다. 누군가가 form에 script를 입력할 경우에 악성 코드가 심겨질 여지가 있기 때문이다. Toast UI Editor를 붙이면서 NHN 팀에서는 DomPurify라는 npm 패키지를 사용하여 이 문제를 해소한 것으로 보인다. SQL 인젝션을 시도할 경우 방어가 되는지 확실하지 않다. DB가 완전히 망가질수 있다. 최소한의 보안을 위해서 helmet을 씌웠지만 helmet이 만능은 아닐 것이다.

~~공부를 하면서 XSS 공격이나 SQL 인젝션을 시도하는 방법을 찾아봤는데 아직은 봐도 잘 모르겠다. 나 스스로 내 사이트를 테스트해보려고 한건데 아마 이 방법 외에 다른 방법이 있을지도 모른다.(더 찾아봐야지...)~~

유튜브에서 XSS를 검색하자마자 공격 방법에 대해서 똭 나왔다.

[7~8강 XSS 공격의 개요와 실습 - 동빈나 웹 해킹 강좌](https://youtube.com/playlist?list=PLRx0vPvlEmdDQxb41uc1G4ecjV-hklFDM)

마지막으로 공부를 하면서 찾아봤던 유튜브 자료를 공유한다. Form Validation을 공부하는 사람들에게 도움이 됐으면 좋겠다.

> [[10분 테코톡] 🍎 그루밍의 Form Validation](https://www.youtube.com/watch?v=Z2YJvBw3pPI)  
> [[병맛코딩만화] 웹 공격과 방어와 미친토끼 (보안, 파라미터 변조, XSS, SQL 인젝션, 비밀번호 암호화)](https://www.youtube.com/watch?v=dHcjwTvrxTk)

[전체 코드는 깃에서](https://github.com/movie42/tubeClone/blob/main/src/assets/js/validation.js)
