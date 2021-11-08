const form = document.querySelector(".form_container form");
const inputs = form.querySelectorAll("input");
const button = form.querySelector("button");

async function submitJoinForm(e) {
  e.preventDefault();
  const data = (makeDict = ionary());
  const checker = checkJoinData(data);
  if (checker) {
    postDataToServer(data);
  }
}

async function postDataToServer() {
  const file = new FormData(form);

  const response = await fetch("/join", {
    method: "POST",
    body: file
  });

  const fromServerMessage = await response.json();

  if (fromServerMessage.type === "success") {
    window.location.pathname = "/login";
  } else if (fromServerMessage.type === "isExistsError") {
    errorMessage("email", "입력한 이메일은 사용중입니다.");
    errorMessage("userName", "입력한 사용자 닉네임은 사용중입니다.");
  } else if (fromServerMessage.type === "isNotpasswordError;") {
    errorMessage("password", "비밀번호가 일치하지 않습니다.");
    errorMessage("password2", "비밀번호가 일치하지 않습니다.");
  }
}

function makeDictionary() {
  const inputDict = {};
  inputs.forEach((value) => {
    if (!inputDict[value.name]) {
      inputDict[value.name] = value.value.trim();
    }
  });
  return inputDict;
}

function checkJoinData(obj) {
  let result = [];

  for (let item in obj) {
    switch (item) {
      case obj[item] === "":
        errorMessage(item);
        break;
      case "email":
        if (!isEmail(obj["email"])) {
          errorMessage("email", "이메일을 입력하세요.");
          result.push(0);
          break;
        } else {
          successMessage("email");
          result.push(1);
          break;
        }
      case "userName":
        if (!isUserName(obj["userName"])) {
          errorMessage(
            "userName",
            "닉네임은 영문과 숫자 조합으로만 작성할 수 있습니다."
          );
          result.push(0);
          break;
        } else {
          successMessage("userName");
          result.push(1);
          break;
        }
      case "name":
        if (!isName(obj["name"])) {
          errorMessage(
            "name",
            "이름은 한글로만 작성할 수 있으며 2-6 글자만 입력할 수 있습니다."
          );
          result.push(0);
          break;
        } else {
          successMessage("name");
          result.push(1);
          break;
        }
      case "password":
        if (isPassword(obj["password"])) {
          successMessage("password");
          result.push(1);
          break;
        } else {
          errorMessage(
            "password",
            "비밀번호는 특수문자, 영문, 숫자, 8글자 이상으로 작성되어야합니다."
          );
          result.push(0);
          break;
        }
      case "password2":
        if (
          obj["password"] !== obj["password2"] ||
          obj["password"] === "" ||
          obj["password2"] === ""
        ) {
          errorMessage(
            "password2",
            "비밀번호가 앞에 입력한 비밀번호와 다릅니다."
          );
        } else {
          successMessage("password");
          successMessage("password2");
        }
    }
  }
  for (let i = 0; i < result.length; i++) {
    if (result[i] === 0) {
      return false;
    }
  }
  return true;
}

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
  const sucessMessageList =
    document.querySelectorAll(".sucessMessage");
  sucessMessageList.forEach((item) => {
    if (item.name === str) {
      item.nextElementSibling.remove();
    }
  });
}

function errorMessage(str, text) {
  inputs.forEach((value) => {
    const errorWarning = value.classList;
    if (errorWarning[0] === "errorWarning") {
      return;
    }
    if (value.name === str) {
      value.classList.add("errorWarning");
      value.classList.remove("sucessMessage");
      painTextMessage(str, text);
    }
  });
}

function successMessage(str) {
  inputs.forEach((value) => {
    const sucessMessage = value.classList;

    if (
      sucessMessage[0] === "sucessMessage" ||
      sucessMessage.length < 1
    ) {
      value.classList.add("sucessMessage");
      value.classList.remove("errorWarning");
    } else if (value.name === str) {
      value.classList.add("sucessMessage");
      value.classList.remove("errorWarning");
      deleteTextMessage(str);
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

if (form) {
  button.addEventListener("click", submitJoinForm);
}
