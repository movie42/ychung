// function modal() {
//   if (getDayLocalStorageData === "false") {
//     return;
//   }
//   const body = document.querySelector("body");
//   const modal_box = document.createElement("div");
//   const h1 = document.createElement("h1");
//   const closeBtn = document.createElement("span");
//   closeBtn.classList.add("material-icons-outlined");
//   closeBtn.classList.add("close_button");
//   modal_box.classList.add("modal");
//   modal_box.classList.add("on");
//   closeBtn.innerText = "close";
//   h1.innerText = "12월 5일\n 정기총회가 있습니다.";
//   modal_box.append(closeBtn);
//   modal_box.append(h1);
//   body.append(modal_box);
//   closeBtn.addEventListener("click", () => {
//     modal_box.classList.remove("on");
//     localStorage.setItem("modal", "false");
//   });
// }
