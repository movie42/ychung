import { accountingForm, gridWrapper } from "./selectors";

function handleKeyDown(event) {
  const data = {};

  const valueList = gridWrapper
    .querySelector(".grid_table")
    .querySelector(".grid_value");

  if (event.key === "Enter") {
    const input = accountingForm.querySelectorAll("input");
    const date = new Date();

    for (let i = 0; i < input.length; i++) {
      if (!data[date]) {
        data[date] = {};
        data[date][input[i].id] = input[i].value;
      } else {
        data[date][input[i].id] = input[i].value;
      }
      input[i].value = "";
    }

    const value = document.createElement("tr");
    value.innerHTML = `
    <td>${date}</td>
    <td>${data[date]["title"]}</td>
    <td>${data[date]["detail"]}</td>
    <td>${data[date]["value"]}</td>
    `;

    valueList.appendChild(value);

    input[0].focus();
  }
}

accountingForm.addEventListener("keydown", handleKeyDown);
