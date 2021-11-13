const form = document.querySelector(".form_container form");
const inputs = form.querySelectorAll("input");
const button = form.querySelector("button");

const message = {
  email: "이메일을 입력하세요.",
  userName: "사용자 이름은 영문과 숫자 조합으로만 작성할 수 있습니다.",
  name: "이름은 한글로만 작성할 수 있으며 2-6 글자만 입력할 수 있습니다.",
  password: "비밀번호는 특수문자, 영문, 숫자, 8글자 이상으로 작성되어야합니다.",
  password2: "비밀번호가 앞에 입력한 비밀번호와 다릅니다.",
  exist: "이미 다른 사람이 사용하는 중이에요!",
};

function checkedMessageNode(name) {
  const pTagList = document.querySelectorAll("p");
  let isNode = findNode(pTagList, "data-name", name);
  return isNode;
}

function paintMessage(bool, node, name = null) {
  const nodeName = node.name;
  const messageContainer = document.createElement("p");
  messageContainer.dataset.name = nodeName;
  const messageNode = checkedMessageNode(nodeName);

  if (bool) {
    node.className = "successMessage";
    node.dataset.istrue = "true";
    messageContainer.className = "successMessage";
    messageContainer.innerText = "참 잘했어요! : )";
  } else {
    if (name === "exist") {
      messageContainer.innerText = message[name];
    } else {
      messageContainer.innerText = message[nodeName];
    }

    node.className = "errorMessage";
    node.dataset.istrue = "false";
    messageContainer.className = "errorMessage";
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
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/,
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

async function checkedDataBase(bool, node) {
  const value = node.value;
  const name = node.name;

  if (name === "email" || name === "userName") {
    const response = await fetch(`/api/checked-db/${name}=${value}`, {
      method: "GET",
    });

    const { exist } = await response.json();
    const checked = !exist;
    return paintMessage(checked, node, "exist");
  }

  return paintMessage(bool, node);
}

function handleChecker(node) {
  const name = node.name;
  const value = node.value;
  const checked = isTrue(name, value);
  if (checked) {
    return checkedDataBase(checked, node);
  }
  return paintMessage(checked, node);
}

function inputRef() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("focusout", function (e) {
      return handleChecker(e.target);
    });
  }
}

async function handleSubmit(e) {
  e.preventDefault();

  for (let i = 0; i < inputs.length; i++) {
    handleChecker(inputs[i]);
  }

  for (let i = 0; i < inputs.length; i++) {
    const isTure = inputs[i].getAttribute("data-istrue");
    if (isTure === "false") {
      return;
    }
  }
  const formData = new FormData(form);

  const body = {};
  for (let [name, value] of formData) {
    body[name] = value;
  }

  const response = await fetch("/join", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body }),
  });

  if (response.status === 201) {
    window.location.pathname = "/login";
  }
}

if (form) {
  inputRef();
  button.addEventListener("click", handleSubmit);
}
