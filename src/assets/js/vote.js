const main = document.querySelector("body main");
const submitBtn = document.querySelector(".submitBtn");

const selectorAddBtn = document.querySelector(".vote_selector_add_btn");
const formWrapper = document.createElement("div");

formWrapper.id = "formWrapper";
main.appendChild(formWrapper);
let selectNum = 0;
const random = () => {
  const randomStore = [];
  const string = "afeignrignsldkfj1230SXVSKDnsdjfe356SZN";
  for (let i = 0; i < 10; i++) {
    let num = 0;
    do {
      num = Math.floor(Math.random() * 100);
    } while (num > 40);
    randomStore.push(string[num]);
  }
  const data = randomStore.join("");
  return data;
};

function handleMakeForm(e) {
  e.preventDefault();
  const textareaWrapper = document.createElement("div");
  const textarea = document.createElement("textarea");
  const deleteBtn = document.createElement("button");
  textareaWrapper.className = `select-wrapper`;
  textareaWrapper.id = `select-${random()}`;
  deleteBtn.innerText = "삭제";
  textarea.id = selectNum;
  textarea.name = `select${selectNum}`;
  selectNum++;
  textareaWrapper.append(textarea);
  textareaWrapper.append(deleteBtn);
  formWrapper.append(textareaWrapper);
}

async function handleSubmit() {
  const textarea = document.querySelector("form textarea").value;
  console.log(textarea);
  await fetch("/vote/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ textarea }),
  });
}

selectorAddBtn.addEventListener("click", handleMakeForm);
submitBtn.addEventListener("click", handleSubmit);
