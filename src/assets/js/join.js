const form = document.querySelector(".form_container form");
const inputs = form.querySelectorAll("input");
const button = form.querySelector("button");

const message = {
  email: "이메일을 입력하세요.",
  userName: "사용자 이름은 영문과 숫자 조합으로만 작성할 수 있습니다.",
  name: "이름은 한글로만 작성할 수 있으며 2-6 글자만 입력할 수 있습니다.",
  password: "비밀번호는 특수문자, 영문, 숫자, 8글자 이상으로 작성되어야합니다.",
  password2: "비밀번호가 앞에 입력한 비밀번호와 다릅니다.",
};

// async function postDataToServer() {
//   const file = new FormData(form);

//   const response = await fetch("/join", {
//     method: "POST",
//     body: file,
//   });

//   const fromServerMessage = await response.json();

//   if (fromServerMessage.type === "success") {
//     window.location.pathname = "/login";
//   } else if (fromServerMessage.type === "isExistsError") {
//     errorMessage("email", "입력한 이메일은 사용중입니다.");
//     errorMessage("userName", "입력한 사용자 닉네임은 사용중입니다.");
//   } else if (fromServerMessage.type === "isNotpasswordError;") {
//     errorMessage("password", "비밀번호가 일치하지 않습니다.");
//     errorMessage("password2", "비밀번호가 일치하지 않습니다.");
//   }
// }

// 입력한 데이터가 가입 조건에 맞는지 체킹하기
// 클릭했을 때가 아니라 입력하고 포커스가 이동하면 체크하도록 바꾸기

// 회원가입 양식 객체로 만들기
// 화원가입 양식을 데이터로 만들어서 체크할께 아니라 차라리 함수별로 포커스가 위치한 인풋마다 체크를 하는 식으로 바꾸자.
// function makeDictionary() {
//   const inputDict = { pw: {} };

//   for (let i = 0, n = inputs.length; i < n; i++) {
//     let data = inputs[i];

//     if (data.name !== "profilePhotoUrl") {
//       if (data.name === "password" || data.name === "password2") {
//         inputDict["pw"][data.name] = data.value.trim();
//       } else {
//         inputDict[data.name] = data.value.trim();
//       }
//     }
//   }

//   return inputDict;
// }

// 서버로 회원가입 양식 보내기
async function submitJoinForm(e) {
  e.preventDefault();
  // const data = makeDictionary();
  // const checker = checkJoinData(data);

  // if (checker) {
  //   postDataToServer(data);
  // }
}

function checkedMessageNode(name) {
  const pTagList = document.querySelectorAll("p");
  let isNode = findNode(pTagList, "data-name", name);
  return isNode;
}

function paintMessage(bool, node) {
  // same
  const nodeName = node.name;
  const messageContainer = document.createElement("p");
  messageContainer.dataset.name = nodeName;
  const messageNode = checkedMessageNode(nodeName);
  // success
  if (bool) {
    node.className = "successMessage";
    messageContainer.className = "successMessage";
    messageContainer.innerText = "참 잘했어요! :)";
  } else {
    node.className = "errorMessage";
    messageContainer.className = "errorMessage";
    messageContainer.innerText = message[nodeName];
  }

  if (!messageNode) {
    node.after(messageContainer);
  } else {
    messageNode.remove();
    node.after(messageContainer);
  }
}

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
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
    };

    return obj[name].exec(value) ? true : false;
  }

  return false;
}

function findNode(array, attr, name) {
  for (let i = 0, n = array.length; i < n; i++) {
    if (array[i].getAttribute(attr) === name) return array[i];
  }
}

function handlefocus(e) {
  const node = e.target;
  const name = node.name;
  const value = node.value;
  const checked = isTrue(name, value);
  paintMessage(checked, node);
}

function inputRef() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("focusout", handlefocus);
  }
}

if (form) {
  inputRef();
  button.addEventListener("click", submitJoinForm);
}
