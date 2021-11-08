import "../scss/styles.scss";
import "../js/rules.js";

const formContainer = document.querySelector(".form_container form");
const menuBtn = document.getElementById("menu_button");
const closeBtn = document.querySelector(".close_button");
const menuBar = document.querySelector(".menu_block");
const searchBtn = document.querySelectorAll(".search");
const sendBtn = document.querySelector(".send_btn");
const youtubeVideo = document.querySelector(".youtube_live");
const date = new Date();
const day = date.getDay();
const getDayLocalStorageData = localStorage.getItem("day");
if (getDayLocalStorageData !== String(day)) {
  localStorage.setItem("day", day);
  localStorage.setItem("modal", true);
}
const getModalBool = localStorage.getItem("modal");

const handleOpenMenu = (e) => {
  if (e.key === "Enter" || e.type === "click")
    menuBar.classList.add("block");
};

const handleCloseMenu = (e) => {
  if (e.key === "Enter" || e.type === "click")
    menuBar.classList.remove("block");
};

function paintErrorHandler(checkList, form) {
  for (let i = 0; i < checkList.length; i++) {
    for (let j = 0; j < form.childNodes.length; j++) {
      if (form.childNodes[j].localName === "div") {
        for (
          let k = 0;
          k < form.childNodes[j].childNodes.length;
          k++
        ) {
          if (
            checkList[i] === form.childNodes[j].childNodes[k].name
          ) {
            if (
              !form.childNodes[j].childNodes[k].classList.contains(
                "errorMessage"
              )
            ) {
              const errorMessage = document.createElement("p");
              form.childNodes[j].childNodes[k].classList.add(
                "errorMessage"
              );
              errorMessage.className = "errorMessage";
              errorMessage.innerText = `${checkList[i]}를 입력해야해요!`;
              form.childNodes[j].after(errorMessage);
            }
            break;
          }
        }
      }
      if (checkList[i] === form.childNodes[j].name) {
        if (!form.childNodes[j].classList.contains("errorMessage")) {
          const errorMessage = document.createElement("p");
          form.childNodes[j].classList.add("errorMessage");
          errorMessage.innerText = `${checkList[i]}를 입력해야해요!`;
          errorMessage.className = "errorMessage";
          form.childNodes[j].after(errorMessage);
        }
        break;
      }
    }
  }
}

// function paintSuccessHandler(checkList, form) {
//   //console.log(checkList);
//   const formList = [];
//   for (let j = 0; j < form.childNodes.length; j++) {
//     if (form.childNodes[j].localName === "div") {
//       for (let k = 0; k < form.childNodes[j].childNodes.length; k++) {
//         formList.push(form.childNodes[j].childNodes[k]);
//       }
//     }
//     formList.push(form.childNodes[j]);
//   }
//   //console.log(formList);
//   for (let i = 0; i < formList.length; i++) {
//     let isTrue = true;

//     for (let j = 0; j < checkList.length; j++) {
//       if (formList[i].name === checkList[j]) {
//         isTrue = false;
//         break;
//       }
//     }
//   }
// }

function modal() {
  if (getDayLocalStorageData === "false") {
    return;
  }
  const body = document.querySelector("body");
  const modal_box = document.createElement("div");
  const h1 = document.createElement("h1");
  const closeBtn = document.createElement("span");
  closeBtn.classList.add("material-icons-outlined");
  closeBtn.classList.add("close_button");
  modal_box.classList.add("modal");
  modal_box.classList.add("on");
  closeBtn.innerText = "close";
  h1.innerText =
    "10월 3일부터\n 청년부 예배시간이\n 2시로 변경됩니다.";
  modal_box.append(closeBtn);
  modal_box.append(h1);
  body.append(modal_box);
  closeBtn.addEventListener("click", () => {
    modal_box.classList.remove("on");
    localStorage.setItem("modal", "false");
  });
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.querySelector(".form_container .form");

  const formData = new FormData(form);
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);

  const response = await fetch("/weekly/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: formDataJsonString
  });

  const { sendValidationCheck } = await response.json();

  if (sendValidationCheck == 302) {
    window.location.pathname = "/weekly";
  } else if (sendValidationCheck.length > 0) {
    paintErrorHandler(sendValidationCheck, form);
    paintSuccessHandler(sendValidationCheck, form);
  }
}

function handleSearch(e) {
  const form = document.querySelector(".search_form");
  if (form.classList.contains("on")) {
    form.classList.remove("on");
  } else {
    form.classList.add("on");
  }
  const closeBtn = form.querySelector(".close_button");
  closeBtn.addEventListener("click", () => {
    form.classList.remove("on");
  });
}

menuBtn.addEventListener("click", handleOpenMenu);
menuBtn.addEventListener("keydown", handleOpenMenu);
closeBtn.addEventListener("click", handleCloseMenu);
closeBtn.addEventListener("keydown", handleCloseMenu);
searchBtn.forEach((value) =>
  value.addEventListener("click", handleSearch)
);

if (sendBtn) {
  sendBtn.addEventListener("click", handleFormSubmit);
}

if (youtubeVideo) {
  const iframe = youtubeVideo.querySelector("iframe");
  function handleVideoSize(e) {
    window.requestAnimationFrame(function () {
      const youtubeFrameWidht = youtubeVideo.clientWidth;
      iframe.width = `${youtubeFrameWidht}`;
      iframe.height = `${youtubeFrameWidht * 0.58}`;
    });
  }
  window.addEventListener("resize", handleVideoSize);
  handleVideoSize();
}

if (getModalBool === null || getModalBool !== "false") {
  modal();
}
