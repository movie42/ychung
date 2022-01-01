// if (sendButton) {
//   sendButton.addEventListener("click", handleFormSubmit);
// }

// async function handleFormSubmit(e) {
//   e.preventDefault();
//   const form = document.querySelector(".form_container .form");
//   const formData = new FormData(form);

//   const body = {};

//   for (let [name, value] of formData) {
//     body[name] = value;
//   }

//   const response = await fetch("/worship/upload", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "X-XSRF-TOKEN": document
//         .querySelector("meta[name='csrf-token']")
//         .getAttribute("content"),
//     },
//     body: JSON.stringify({ body }),
//   });

//   if (response.status === 200) {
//     const {
//       data: { _id },
//     } = await response.json();

//     window.location.pathname = `/worship/${_id}`;
//   } else {
//   }
// }

// // ????
// function paintErrorHandler(checkList, form) {
//   for (let i = 0; i < checkList.length; i++) {
//     for (let j = 0; j < form.childNodes.length; j++) {
//       if (form.childNodes[j].localName === "div") {
//         for (let k = 0; k < form.childNodes[j].childNodes.length; k++) {
//           if (checkList[i] === form.childNodes[j].childNodes[k].name) {
//             if (
//               !form.childNodes[j].childNodes[k].classList.contains(
//                 "errorMessage",
//               )
//             ) {
//               const errorMessage = document.createElement("p");
//               form.childNodes[j].childNodes[k].classList.add("errorMessage");
//               errorMessage.className = "errorMessage";
//               errorMessage.innerText = `${checkList[i]}를 입력해야해요!`;
//               form.childNodes[j].after(errorMessage);
//             }
//             break;
//           }
//         }
//       }
//       if (checkList[i] === form.childNodes[j].name) {
//         if (!form.childNodes[j].classList.contains("errorMessage")) {
//           const errorMessage = document.createElement("p");
//           form.childNodes[j].classList.add("errorMessage");
//           errorMessage.innerText = `${checkList[i]}를 입력해야해요!`;
//           errorMessage.className = "errorMessage";
//           form.childNodes[j].after(errorMessage);
//         }
//         break;
//       }
//     }
//   }
// }

// // 임시

// const youtubeVideo = document.querySelector(".youtube_live");

// if (youtubeVideo) {
//   const iframe = youtubeVideo.querySelector("iframe");
//   function handleVideoSize(e) {
//     window.requestAnimationFrame(function () {
//       const youtubeFrameWidht = youtubeVideo.clientWidth;
//       iframe.width = `${youtubeFrameWidht}`;
//       iframe.height = `${youtubeFrameWidht * 0.58}`;
//     });
//   }
//   window.addEventListener("resize", handleVideoSize);
//   handleVideoSize();
// }

// const formContainer = document.querySelector(".form_container form");
// const searchBtn = document.querySelectorAll(".search");
// function handleSearch(e) {
//   const form = document.querySelector(".search_form");
//   if (form.classList.contains("on")) {
//     form.classList.remove("on");
//   } else {
//     form.classList.add("on");
//   }
//   const closeButton = form.querySelector(".close_button");
//   closeButton.addEventListener("click", () => {
//     form.classList.remove("on");
//   });
// }

// searchBtn.forEach((value) => value.addEventListener("click", handleSearch));