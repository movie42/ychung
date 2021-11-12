중간 과정

```javascript
const form = document.querySelector(".form_container form");
const inputs = form.querySelectorAll("input");
const button = form.querySelector("button");

// async function postDataToServer() {
// const file = new FormData(form);

// const response = await fetch("/join", {
// method: "POST",
// body: file,
// });

// const fromServerMessage = await response.json();

// if (fromServerMessage.type === "success") {
// window.location.pathname = "/login";
// } else if (fromServerMessage.type === "isExistsError") {
// errorMessage("email", "입력한 이메일은 사용중입니다.");
// errorMessage("userName", "입력한 사용자 닉네임은 사용중입니다.");
// } else if (fromServerMessage.type === "isNotpasswordError;") {
// errorMessage("password", "비밀번호가 일치하지 않습니다.");
// errorMessage("password2", "비밀번호가 일치하지 않습니다.");
// }
// }

function painTextMessage(str, text) {
  const p = document.createElement("p");
  p.innerHTML = text;
  p.className = "errorMessage";
  const errorWarningList = document.querySelectorAll(".errorWarning");
  errorWarningList.forEach((item) => {
    if (item.name === str) {
      item.after(p);
    }
  });
}

function deleteTextMessage(str) {
  const sucessMessageList = document.querySelectorAll(".sucessMessage");
  sucessMessageList.forEach((item) => {
    if (item.name === str) {
      item.nextElementSibling.remove();
    }
  });
}

// 실패 메시지

// 성공 메시지
function successMessage(message) {
  inputs.forEach((value) => {
    const sucessMessage = value.classList;

    if (sucessMessage[0] === "sucessMessage" || sucessMessage.length < 1) {
      value.classList.add("sucessMessage");
      value.classList.remove("errorWarning");
    } else if (value.name === message) {
      value.classList.add("sucessMessage");
      value.classList.remove("errorWarning");
      deleteTextMessage(message);
    }
  });
}

function failMessage(node) {
  console.log(node);
  const message = {
    email: "이메일을 입력하세요.",
    userName: "사용자 이름은 영문과 숫자 조합으로만 작성할 수 있습니다.",
    name: "이름은 한글로만 작성할 수 있으며 2-6 글자만 입력할 수 있습니다.",
    password:
      "비밀번호는 특수문자, 영문, 숫자, 8글자 이상으로 작성되어야합니다.",
    password2: "비밀번호가 앞에 입력한 비밀번호와 다릅니다.",
  };
  inputs.forEach((value) => {
    const errorWarning = value.classList;
    if (errorWarning[0] === "errorWarning") {
      return;
    }
    if (value.name === message) {
      value.classList.add("errorWarning");
      value.classList.remove("sucessMessage");
      painTextMessage(message, text);
    }
  });
}

function message(bool, itemName) {
  const findInputValue = function (name) {
    for (let i = 0, n = inputs.length; i < n; i++) {
      if (inputs[i].name === itemName) {
        return inputs[i];
      }
      if (itemName === "pw") {
        return [inputs[i].name === "password" && inputs[i]];
      }
    }
  };

  const node = findInputValue(itemName);

  return bool ? successMessage(node) : failMessage(node);
}

function isTrue(name, value) {
  const obj = {
    email:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)_)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    name: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,6}$/,
    userName: /^[a-zA-Z0-9]{5,10}$/,
    password:
      /^(?=._[A-Za-z])(?=._\d)(?=._[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
  };

  if (name === "pw" && value["password"] !== "") {
    const isPassword = obj["password"].exec(value["password"]);
    return isPassword ? value["password"] === value["password2"] : false;
  }

  return obj[name].exec(value) ? true : false;
}

// 입력한 데이터가 가입 조건에 맞는지 체킹하기
// 클릭했을 때가 아니라 입력하고 포커스가 이동하면 체크하도록 바꾸기
function checkJoinData(data) {
  for (let name in data) {
    const bool = isTrue(name, data[name]);
    message(bool, name);
  }
}

// 회원가입 양식 객체로 만들기

// 개똥같다.... 바꿔야한다.
function makeDictionary() {
  const inputDict = { pw: {} };

  for (let i = 0, n = inputs.length; i < n; i++) {
    let data = inputs[i];

    if (data.name !== "profilePhotoUrl") {
      if (data.name === "password" || data.name === "password2") {
        inputDict["pw"][data.name] = data.value.trim();
      } else {
        inputDict[data.name] = data.value.trim();
      }
    }
  }

  return inputDict;
}

// 개똥

// function successMessage(node, name) {
//   const nodeName = node.name;

//   if (node.className === "errorMessage") {
//     node.className = "successMessage";
//     const errorTagList = document.querySelectorAll(".errorMessage");
//     const isNode = findNode(errorTagList, "data-name", nodeName);
//     isNode.className = "successMessage";
//     isNode.dataset.name = nodeName;
//     isNode.innerText = "참 잘했어요! :)";
//   }

//   node.className = "successMessage";
//   const successTagList = document.querySelectorAll(".successMessage");
//   const isNode = findNode(successTagList, "data-name", nodeName);
//   if (!isNode) {
//     const messageContainer = document.createElement("p");
//     messageContainer.className = "successMessage";
//     messageContainer.dataset.name = nodeName;
//     messageContainer.innerText = "참 잘했어요! :)";
//     node.after(messageContainer);
//   }
// }
// // fail
// function failMessage(node) {
//   const nodeName = node.name;

//   if (node.className === "successMessage") {
//     node.className = "errorMessage";
//     const errorTagList = document.querySelectorAll(".successMessage");
//     const isNode = findNode(errorTagList, "data-name", nodeName);
//     isNode.className = "errorMessage";
//     isNode.dataset.name = nodeName;
//     isNode.innerText = message[nodeName];
//   }

//   node.className = "errorMessage";
//   const errorTagList = document.querySelectorAll(".errorMessage");
//   const isNode = findNode(errorTagList, "data-name", nodeName);
//   if (!isNode) {
//     const messageContainer = document.createElement("p");
//     messageContainer.className = "errorMessage";
//     messageContainer.dataset.name = nodeName;
//     messageContainer.innerText = message[nodeName];
//     node.after(messageContainer);
//   }
// }

// 서버로 회원가입 양식 보내기
async function submitJoinForm(e) {
  e.preventDefault();
  const data = makeDictionary();
  const checker = checkJoinData(data);

  // if (checker) {
  // postDataToServer(data);
  // }
}

if (form) {
  button.addEventListener("click", submitJoinForm);
}
```
