# 앞으로 해야 할 일 또는 하고 싶은 일

## 2021년 12월 15일

### 만들고 싶은 것들

#### 스크롤 애니메이션

간단한 애니메이션 구현하기
안에 들어가는 링크 잘 구현해보기

#### blog tag

블로그 게시판에 테그 기능을 넣어서 글을 작성 할 때마다 사용자가 태그를 설정해서 태그끼리 모아서 게시물을 보여주는 기능 넣어보기

#### sum nail image

블로그 뿐 아니라 모든 게시판에 들어간 첫 사진을 파싱해서 url만 따와서 섬네일로 활용할 수 있도록 하기
만약 이미지가 없다면 그냥 제목을 크게 넣기(음....)

#### 관리자가 페이지 디자인을 간단하게라도 변경 할 수 있도록...

매번 VSC를 열어서 하드 코딩 하는 게 시간 비용이 너무 많이 들어간다...
드래그 앤 드랍과 화면 내에서 이미지를 움직이는 것 까지는 구현 못하더라도 간단하게 섹션 별로 이미지를 추가하고 제목과 넣고 싶은 텍스트를 추가 할 수 있도록 할 수 없을까?

### 만들어야 할 것들

#### 1. join(완료)

- validation 한번 더 확인
- 회원 약관, 개인정보 수집 동의 절차
- 가입

#### 검색 고장남...

- 고치기

#### getUrl 함수 수정 및 api fetch 다시 설정하기(완료)

- url path가 총 3개일때는 관계 없지만 그 이상일 때 api 요청을 할 때 문제가 있음.
- 즉... 재사용이 어렵다는 이야기
- 함수를 더 쪼개보거나 재설계 해보기

path, id, method로 나눠서 fetch나 redirect에 값을 전달해 주도록 재설계 하였다.

#### documents design(완료)

##### document router and controller

1. landing page

   - [x] landing page : /documents
     - documents/rules
     - documents/manual
     - /documents/applications

2. rules

   - [x] documents/rules
   - [x] documents/rules/upload
   - [x] documents/rules/:id/edit
   - [x] documents/rules/:id/delete

3. manual

   - [x] documents/manual : 리스트
   - [x] documents/manual/upload
   - [x] documents/manual/:id/edit
   - [x] documents/manual/:id/delete

4. applications

   - [x] documents/applications : 리스트
   - [x] documents/applications/upload
   - [x] documents/applications/:id/edit
   - [x] documents/applications/:id/delete

## 2021년 12월 15일 이전

- [x] 게시판 사진 넣기
      [참고](https://kasumil.tistory.com/177)
      [issue](https://github.com/nhn/tui.editor/issues/57)
- debounc throttle?
- [x] 동영상 넣기
      [참고](https://github.com/nhn/tui.editor/blob/master/docs/ko/custom-block.md#html-%EB%85%B8%EB%93%9C)

- [x] 게시판 최적화하기

  - [x] 재사용 가능한 함수 만들기

- [ ] 검색 기능 수정 (통합 검색이 안됨)
- [x] 광고 (날짜 별로) 선택해서 넣기
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

- [x] MVC 모델 변경하기 (fetch 하면 프론트로 데이터를 뿌려주는 식으로 ???, 보안상 문제 없나?)

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

3. 게시판 스타일

- [x] 게시판 html style 적용할 수 있도록 게시판 스타일링 기능 만들기(image만... )

- Toast UI Editor를 활용

4. 회칙과 메뉴얼
   도큐멘트 계열의 페이지
   **삭제: 더이상 사용되지 않음**

   - [x] ~~회칙 목록 : /rule~~
   - [x] ~~회칙 C : /rule/upload~~
   - [x] ~~회칙 R : /rule/:id~~
   - [x] ~~회칙 U : /rule/:id/edit~~

   - [ ] ~~메뉴얼 : /menuel~~
   - [ ] ~~회칙 C : /menuel/upload~~
   - [ ] ~~회칙 R : /menuel/:id~~
   - [ ] ~~회칙 U : /menuel/:id/edit~~

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
