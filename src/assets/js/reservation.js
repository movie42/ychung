// const getDayLocalStorageData = localStorage.getItem("day");
// if (getDayLocalStorageData !== String(day)) {
//   localStorage.setItem("day", day);
//   localStorage.setItem("modal", true);
// }
// const getModalBool = localStorage.getItem("modal");

// const date = new Date();
// const day = date.getDay();
// const hour = date.getHours();

// const handleAttendence = async () => {
//   const response = await fetch("/attendence", { method: "POST" });
//   if (response.redirected === true) {
//     window.location.href = response.url;
//   }
//   const { exists } = await response.json();

//   if (exists === true) {
//     const button = document.querySelector(".edit_button");
//     button.innerText = "출책!";
//   }
// };

// const reservation = () => {
//   const inform = document.querySelector("body main .inform_wrapper");
//   const buttonWrapper = document.createElement("div");
//   const button = document.createElement("button");
//   button.classList = "edit_button";
//   button.innerText = "출석 체크";
//   buttonWrapper.classList = "button_wrapper";
//   buttonWrapper.appendChild(button);
//   inform.appendChild(buttonWrapper);
//   button.addEventListener("click", handleAttendence);
// };

// const getLocalStorageData = localStorage.getItem("출석 체크");

// // build전에 시간 조건 추가하기 && hour>13 && hour<16
// if (day === 0 && hour > 13 && hour < 16 && !getLocalStorageData) {
//   reservation();
// }

// if (day !== 0) {
//   localStorage.clear();
// }
