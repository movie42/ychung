# 인터넷과 웹브라우저

웹 브라우저를 열고 주소창에 URL을 입력했을 때, 나는 요청 값을 서버에 보내기 전인데 홈 화면을 브라우저에서 볼 수 있다. 서버에 홈 화면을 보여달라는 요청을 보내기 전인데 어떻게 브라우저는 웹을 불러오게 될까? 이게 가장 궁금한 부분이었고 그동안 미뤄왔던 인터넷과 웹 브라우저에 대해서 공부를 하게 된 계기가 되었다.

## 이 글을 읽기전에

이 글은 MDN에 나와있는 [인터넷은 어떻게 동작하는가?](https://developer.mozilla.org/ko/docs/Learn/Common_questions/How_does_the_Internet_work)를 읽으면서 함께 딸려오는 주제들이나 개념을 이것 저것 모아 요약 또는 재구성 한 것이다. 배경 지식이 거의 없는 경우라면 도움이 될 수 도 있지만 조금 더 깊은 지식을 원한다면 참조 문서를 읽는 것을 추천한다.(게다가 이미지도 있어서 훨씬 더 이해가 좋다.)

## 인터넷은 어떻게 작동하지요?

### 인터넷은 컴퓨터간의 물리적인 연결이다?

그렇다. 두 개의 컴퓨터가 통신이 필요할 때, 물리적으로 연결되어야한다. 물리적 연결의 수는 제한되어있지 않다. 하지만 컴퓨터와 컴퓨터를 직접 연결하면 컴퓨터의 숫자가 늘어날 수록 필요한 전기 줄(랜선과 같은...)의 수가 많이 늘어나게 되고 이 연결은 매우 복잡해진다. 그래서 라우터라는 작은 컴퓨터가 수많은 연결을 중간에서 중계해준다. 라우터는 연결을 간소화 할 수 있도록 도와줄 뿐 아니라 컴퓨터에서 보낸 메시지가 올바른 컴퓨터에 도착하는지 확인하는 역할을 한다.

하지만 먼 거리에 있는 컴퓨터간의 연결을 허용하기 위해서 모뎀이 필요하다. 사실 따지고보면 라우터간의 연결도 컴퓨터와 컴퓨터간의 연결과 다를게 없다. 그러나 미국에 있는 컴퓨터를 한국에 있는 컴퓨터에 연결하기란 엄청난 시간과 자원이 들 수 있다. 게다가 인터넷이 두 대의 컴퓨터만을 위한 것이 아니기 때문에 서비스를 제공해야하는 입장에서 이렇게 연결하다간 지구상에 있는 자원이 랜선을 제작하는데 쓰느라 바닥날 수도 있다.(말이 그렇다는 거지 직접 해보지 않아서 모른다. 그리고 데이터 이동은 반드시 유선 연결로만 이루어지지 않는다.) 그래서 모뎀을 사용해 이러한 문제를 해결 할 수 있다. 모뎀은 전화 기반 시설이라고 생각할 수 있다. 우리가 원하는 서비스를 이용하기 위해서 모뎀을 ISP(internet Service Provider)에 연결한다. ISP는 모뎀과 모뎀을 연결하여 인터넷 서비스를 제공한다. 우리가 원하는 서비스 이용을 요청하기 위해 네트워크 메시지를 보내는데 ISP의 네트워크를 통해 서비스 네트워크로 메시지가 전달된다. 이러면 비교적 멀리 있는 거리의 인터넷 연결이 가능해진다.

### 어떻게 내가 원하는 서비스를 찾을 수 있을까?

그럼 내가 특정하는 서비스를 어떻게 찾을 수 있을까? 집 주소처럼 네트워크에 연결된 모든 컴퓨터는 IP(Internet Protocol)를 갖는다. IP는 192.000.000.000과 같이 네개의 숫자로 구성된 주소다. 하지만 사람들이 IP를 기억해서 구글이나 네이버를 찾아가기 어렵기 때문에 보통 도메인 이름을 가지고 찾는다. 도메인 이름은 google.com과 같은 말 그대로 서비스 IP를 특정하는 이름이다. DNS(Domain Name System Server) 서비스를 제공하는 업체를 통해 구매할 수 있다.

> 도메인 이름은 IP를 사람이 읽을 수 있는 언어로 바꾼 것이다. 도메인과 URL은 엄격하게 보면 다르다. URL은 https://www.exampl.com/search?name=internet이다. 아래 아티클을 보는 게 좋을 것 같다.
> [What is a domain name? : MDN](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_domain_name)  
> [What is a URL? : MDN](https://developer.mozilla.org/ko/docs/Learn/Common_questions/What_is_a_URL)

## 웹은 어떻게 동작하나요?

보통 웹에 연결된 컴퓨터는 클라이언트와 서버로 나뉜다. 클라이언트는 그냥 쉽게 생각해서 서비스를 이용하는 모든 사람이다.(으잉 갑자기 인터넷이 사람이 됐네?)

다시... 그러니까 사람의 컴퓨터다. 또는 웹에 연결된 컴퓨터나 핸드폰 그리고 웹에 접근을 가능하게 하는 브라우저 같은 소프트웨어다. 서버는 서비스를 저장한 컴퓨터다. 클라이언트는 서버에 요청을 보내서 이미지나 HTML 파일 등을 요청한다.

이 과정 순서를 설명해보려고한다.

1. 클라이언트는 컴퓨터에서 웹 브라우저(크롬, 사파리, 파이어폭스, 엣지 등)를 켜고 주소창에 도메인 네임을 입력한다.
2. 웹 브라우저는 DNS에서 IP를 찾는다.
3. 브라우저는 서버에게 HTTP 요청(HTML, JS, CSS, 이미지, 비디오 등 사본을 줄래?)메시지를 보낸다.
4. 이 메시지는 TCP/IP 연결을 통해서 전송된다.
5. 서버는 클라이언트의 메시지를 승인한다.(그렇지 않을 수도 있다.) 200 OK란 메시지를 클라이언트에게 보내고 서버는 데이터 패킷을 브라우저에 전송한다.
6. 브라우저가 받은 패킷을 조립해서 사용자에게 보여준다.

> 중간에 건너 뛴 지식
> HTTP, TCP/IP
> [HTTP 개요 : MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Overview)
> 동영상 [HTTP-2.소개 : 생활코딩](https://www.youtube.com/watch?v=vHhWcTyJoS0)  
> [[10분 테코톡] 🔮 수리의 TCP/IP](https://www.youtube.com/watch?v=BEK354TRgZ8&t=511s)

## 그럼 브라우저는 어떻게 동작하는가?

> 참조
> [인터넷은 어떻게 동작하는가?](https://developer.mozilla.org/ko/docs/Learn/Common_questions/How_does_the_Internet_work)  
> [웹의 동작 방식](https://developer.mozilla.org/ko/docs/Learn/Getting_started_with_the_web/How_the_Web_works)  
> [브라우저는 어떻게 동작하는가?](https://d2.naver.com/helloworld/59361)

https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Pages_sites_servers_and_search_engines

https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server

https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Upload_files_to_a_web_server

https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_much_does_it_cost
