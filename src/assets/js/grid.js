import { accountingForm, gridWrapper } from "./selectors";

async function handleKeyDown(event) {
  let data = {};

  const valueList = gridWrapper
    .querySelector(".grid_table")
    .querySelector(".grid_value");

  const inputs = accountingForm.querySelectorAll("input");
  const selects = accountingForm.querySelectorAll("select");
  if (event.key === "Enter") {
    const date = new Date();

    data["date"] = {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate()
    };

    for (let i = 0; i < inputs.length; i++) {
      data[inputs[i].id] = inputs[i].value;
    }
    for (let i = 0; i < selects.length; i++) {
      data[selects[i].id] = selects[i].value;
    }

    const request = await fetch(
      "/administration/accounting",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector(
            "meta[name='csrf-token']"
          )["content"]
        },
        body: JSON.stringify({ ...data })
      }
    );

    if (request.status === 200) {
      const { accountingData } = await request.json();

      const value = document.createElement("li");
      value.innerHTML = `
    <span>${accountingData._id}</span>
    <span>${accountingData.date.year}년 ${
        accountingData.date.month + 1
      }월 ${accountingData.date.date}일</span>
    <span>${accountingData.item}</span>
    <span>${accountingData.itemDetail}</span>
    <span>${accountingData.title}</span>
    <span>${accountingData.value}</span>
    `;

      valueList.appendChild(value);

      inputs.forEach((input) => (input.value = ""));
      inputs[0].focus();
    }
  }
}

accountingForm.addEventListener("keydown", handleKeyDown);
