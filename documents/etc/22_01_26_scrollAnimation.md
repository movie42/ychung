# 스크롤 애니메이션으로 velog 메뉴 흉내내기

스크롤 애니메이션은 말 그대로 인터넷 브라우저의 스크롤을 사용하여 타이밍을 설계해서 유저에게 컨텐츠를 보여주는 애니메이션이다. 스크롤 애니메이션은 사용자에게 시각적으로 보다 더 다양한 경험을 제공할 수 있다. 화면이 로딩 됨과 동시에 컨텐츠가 보여지는 것이 아니고 동영상 플레이어를 재생할 때, 타임 라인을 탐색 하는 듯한 경험을 제공할 수 있다. 나는 [애플 클론 수업](https://www.inflearn.com/course/%EC%95%A0%ED%94%8C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8-%EC%9D%B8%ED%84%B0%EB%9E%99%EC%85%98-%ED%81%B4%EB%A1%A0/dashboard)을 수강하면서 배운 스크롤 애니메이션을 메뉴바에 적용하기로 했다.

## UX

스크롤 애니메이션은 사용자 경험 측면에서 바라볼 때, 사용자가 마우스 휠 하나로 모든 것을 통제할 수 있다고 믿게 하는데 그 장점이 있는 것 같다. 그래서 스크롤 애니메이션을 설계할 때는 컨텐츠가 정확한 타이밍에 의도한대로 보이도록 설계해야하며 스크롤의 방향에 따라서 컨텐츠가 재시작하는 것이 아니라 빨리감기와 되감기처럼 동작하도록 하는 것이 중요하다.

나는 사용자 경험에서 스크롤 애니메이션을 적용할 만한 요소가 무엇이 있을지 고민해보았다. 아직 컨텐츠가 없기 때문에 스크롤 애니메이션으로 제공할 수 있는 콘텐츠는 제한되어있다. 하지만 가장 간단하면서도 좋은 사용자 경험을 제공할 수 있는 것은 스크롤 방향에 따라 메뉴가 나타나도록 메뉴에 스크롤 애니메이션을 추가하기로 하여 게시글을 다 읽은 뒤 다른 메뉴로 갈 수 있는 방법이 제공하기로 했다.

## 레퍼런스

상단 메뉴를 추가할 때, 대부분의 레퍼런스는 일정 높이의 스크롤이 진행되면 상단에 메뉴가 고정되었다. 또 다른 레퍼런스는 사용자가 게시글을 전부 읽고 스크롤을 위로 올릴 때, 메뉴가 나타나도록 설계되어 있었다. 설계 방법은 정말 여러가지가 있다. 대강 몇가지로 추려보았다.

1. display
   스크롤의 위치에 따라 css의 display 속성을 none, block으로 바꾸는 방법을 사용한다.
   장점 : 스크롤에 위치에 따라 자바스크립트로 class 속성을 추가하는 방법으로 애니메이션을 컨트롤 할 수 있기 떄문에 구현하기 매우 쉽다.
   단점 : transfomr 속성이 적용되지 않아서 뜬금없이 '뙇'하고 메뉴가 튀어나온다. opacity를 컨트롤 할 수 없다.

2. visiable
   transform을 통해 부드러운 애니메이션을 제공할 수 있다.
   장점 : 스크롤 위치에 따라 class 속성을 추가하여 visialbe을 조정할 수 있다 position을 fixed로 하여 메뉴를 보이게 할 수 있다.
   단점 : 스크롤에 따라 세부적으로 조정할 수 없다.

3. opacity와 margin
   html에 미리 header를 하나 더 만들어서 애니메이션을 제공할 수 있다.
   장점 : 스크롤의 위치와 값의 양에 따라 opacity와 margin을 조정하여 스크롤 애니메이션을 제공할 수 있다.
   단점 : 스크롤 이벤트가 발생할 때마다 동작하기 때문에 성능 이슈가 발생할 수 있다.

나는 3가지 방법을 섞어서 사용하기로 했다. [velog](https://velog.io)의 코드를 정확하게 알수 없지만 크롬 개발자 도구로 분석해본 결과 스크롤의 방향에 따라 상단 메뉴가 내려오고 올라오는 것이 동작하고 화면의 위치에 따라 opacity값으로 메뉴를 보이고 안보이는 것을 동작하게 한다. 하지만 나는 opacity를 조정하는 대신에 visialbe을 hidden으로 설정하게 끔하였다.

## css

```scss
#fixed_header {
  padding: 8px 10px;
  display: none;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: -76px;
  left: 0;
  right: 0;
  z-index: 1;
  margin: 0 auto;
  max-width: 1024px;
  background-color: #fff;
  opacity: 1;
  &.active {
    display: flex;
  }
  &.hidden {
    display: flex;
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }
}
```

### #fixed_header에 display :none 을 추가한 이유

display none을 추가한 이유는 모바일에서 상단으로 pull up을 할 경우 상단에 숨겨져있는 메뉴가 보이기 때문이었다. 내가 의도하지 않았기 때문에 display :none을 추가하여서 pull up을 하더라도 상단 메뉴가 보이지 않게 하였다.

### .hidden

hidden 클레스에 display : flex가 있는데 display를 추가하지 않으면 메뉴가 부드럽게 사라지지 않기 때문에 추가하였다.

## javascript

```javascript
let prevHeight = 0;
let top = hideMenuContainer.style.top;

export function handleHiddenMenu() {
  let scrollHeight = window.scrollY;
  let remain = prevHeight - scrollHeight;

  if (scrollHeight < 60) {
    hideMenuContainer.classList.add("hidden");
    hideMenuContainer.classList.remove("active");
  }

  // up
  if (remain >= 0 && top < 0) {
    top += remain;
    if (top > 0) {
      top = 0;
    }
    hideMenuContainer.classList.remove("hidden");
    hideMenuContainer.classList.add("active");
    hideMenuContainer.style.top = `${top}px`;
  }

  // down
  if (remain <= 0 && top > -76 && scrollHeight > 80) {
    top -= -remain;
    if (top < -76) {
      top = -76;
    }
    hideMenuContainer.classList.remove("hidden");
    hideMenuContainer.style.top = `${top}px`;
  } else if (top < -76) {
    top = -76;
  }
  prevHeight = scrollHeight;
}
```

scroll의 높이를 scrollY 객체로 부터 불러오면 scroll의 양을 알수가 있다. 메뉴는 스크롤이 어느 위치에 있다는 것은 중요하지 않았다. 그저 사용자가 화면을 위로 올릴 때, 상단 메뉴가 스크롤의 양에 따라 위에서 아래로 내려오도록 하는 것이 중요했다.

preveHeight와 top 변수가 전역으로 선언되어있는데 ES6 module을 사용하고 있기 때문에 전역 오염은 걱정하지 않았다. 스크롤 이벤트를 수행하는 함수를 외부 함수로 감싸서 클로저 함수로 만들 수 있다. 하지만 event를 캡슐화해서 관리하고 있기 때문에 내부에서 동작하는 함수를 꺼내서 전달하거나 이벤트를 함수 안에 포함시켜야하는데 그렇게 하고 싶지 않았다.

### 스크롤 방향

브라우저 화면은 좌표 평면으로 따지면 +,+에 속해있다. 일반적인 좌표 평면과 방향이 180도 뒤집혀있다. 그래서 스크롤을 아래로 내리면 scrollY의 값은 점차 커진다. 그래서 스크롤을 아래로 내릴 때는 prevHeight - scrollY값이 prevHeight보다 scrollY 값이 더 커지기 때문에 -가 된다. 위로 올릴 때는 반대로 +가 된다. 이것으로 스크롤이 위로 올라가고 내려가는 것을 알 수 있게 된다. 방향에 따라 보여주고자 하는 header의 top 값을 자바스크립트로 제어할 수 있다.

> 참조
> [[자바스크립트] 스크롤 이벤트에서 스크롤 방향 알아내는 방법](https://webisfree.com/2019-12-16/[%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8]-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EC%9D%B4%EB%B2%A4%ED%8A%B8%EC%97%90%EC%84%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EB%B0%A9%ED%96%A5-%EC%95%8C%EC%95%84%EB%82%B4%EB%8A%94-%EB%B0%A9%EB%B2%95)

### 한번에 많은 양의 스크롤 제어하기

하지만 모든 사용자가 스크롤을 천천히 하지 않는다. 휠을 사용하는 경우는 그나마 덜하지만 모바일이나 터치 패드 또는 트릭 패드를 쓰는 경우에는 스크롤의 값이 갑자기 크게 변한다. 그래서 이러한 사용자의 행동을 제어할 필요가 있다. 사용자에게 어떤 행동을 요구하는 것이 아니라 일정양 이상의 값이 top에 더해지면 더이상 동작하지 못하도록 하였다. header의 높이가 76px 이기 때문에 만약에 header의 top 값이 76되면 항상 76px을 유지하게 하였다. 이렇게 하면 사용자가 스크롤을 갑자기 확 내리거나 올려도 header는 상단을 유지하게 된다.

## debounce나 throttle을 쓰지 않은 이유

스크롤 애니메이션은 스크롤 값이 1 증가하거나 감소할 때마다 이벤트 핸들러 함수를 동작시키기 때문에 성능 이슈가 발생할 수 있다. 그래서 보통 debounce나 throttle 함수를 사용하여서 개발자가 원하는 시간 안에 동작이 발생하지 않도록 제어하거나 마지막에 수행한 동작만 실행하도록 제어할 수 있다. 그러나 내가 의도한 스크롤 애니메이션은 1 프레임(단위가 프레임은 아니지만)당 한번씩 동작이 발생해야 했다. 그래서 debounce를 쓸 경우에는 의도한대로 메뉴가 제어되지 않았다. throttle은 사용자가 버튼이나 스크롤, 화면 등을 제어하면서 여러번 요청한 값 중 마지막 값만 수행하도록 제어하는 함수이기 때문에 사용하지 않았다.

스크롤 애니메이션을 효과적으로 제어하는 방법은 어느 부분에서 스크롤 애니메이션을 수행하는 함수를 동작시킬 것인지 정해서 보여지는 화면내에서 쓸모없는 연산이 일어나지 않도록 제어하는 방법이 debounce 함수를 사용하는 것보다 더 효과적이라고 생각한다.

## 고민... 그리고 마무리

정말 작은 부분에 애니메이션을 적용한 사례를 정리해보았다. 애플 사이트처럼 사진이나 동영상이 여럿 나오는 스크롤 애니메이션은 성능 문제가 가장 중요한 것 같다. 현재 콘텐츠를 기획하고 있지만 어떤 식으로 콘텐츠를 스토리지에 저장하고 불러와 사용자에게 제공해야하는지 잘 모르겠다.

양청 어플리케이션에서 가장 중요한 것은 비용 문제다. 영리 목적으로 운영되는 사이트가 아니기 때문에 내가 배운 것을 바탕으로 스크롤 애니메이션을 기획해서 사용자에게 제공하기 어렵다. 보통 동영상처럼 재생되는 스크롤 애니메이션은 사진이 200-300장이 기본이다. 사용자가 아무리 적다고 해도 서버에서 사용자에게 사진을 반복해서 제공하는데 비용이 만만치 않을 꺼라고 생각한다.

스크롤 애니메이션은 사용자에게 콘텐츠를 직관적으로 보여주고 사용자에게 좋은 경험을 제공할 수 있기 때문에 매우 강력한 도구다. 하지만 성능, 제한된 자원을 생각할 때 적용하기가 망설여진다.

> 참조
>
> [[자바스크립트] 스크롤 이벤트에서 스크롤 방향 알아내는 방법](https://webisfree.com/2019-12-16/[%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8]-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EC%9D%B4%EB%B2%A4%ED%8A%B8%EC%97%90%EC%84%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EB%B0%A9%ED%96%A5-%EC%95%8C%EC%95%84%EB%82%B4%EB%8A%94-%EB%B0%A9%EB%B2%95)  
> [애플 클론 수업](https://www.inflearn.com/course/%EC%95%A0%ED%94%8C-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8-%EC%9D%B8%ED%84%B0%EB%9E%99%EC%85%98-%ED%81%B4%EB%A1%A0/dashboard)
