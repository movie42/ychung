import { accountingForm, gridWrapper } from "./selectors";

async function handleKeyDown(event) {
  let data = {};

  const valueList = gridWrapper
    .querySelector(".grid_table")
    .querySelector(".grid_body_wrapper");

  const inputs = accountingForm.querySelectorAll("input");
  const selects = accountingForm.querySelectorAll("select");
  if (event.key === "Enter") {
    const date = new Date();

    data["date"] = {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    };

    for (let i = 0; i < inputs.length; i++) {
      data[inputs[i].id] = inputs[i].value;
    }
    for (let i = 0; i < selects.length; i++) {
      data[selects[i].id] = selects[i].value;
    }

    const request = await fetch("/administration/accounting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']")[
          "content"
        ],
      },
      body: JSON.stringify({ ...data }),
    });

    if (request.status === 200) {
      const { accountingData } = await request.json();

      const value = document.createElement("tr");
      const itemName = {
        income: "수입",
        expenses: "지출",
        carriedForward: "이월",
        administration: "행정",
        education: "교육",
        event: "행사",
        society: "교제",
        mission: "선교",
      };
      value.innerHTML = `
        <td>${accountingData.date.month + 1}월 ${
        accountingData.date.date
      }일</td>
        <td>${itemName[accountingData.item]}</td>
        <td>${itemName[accountingData.itemDetail]}</td>
        <td>${accountingData.title}</td>
        <td>${accountingData.value}</td>
        <td><td>
        <td>${accountingData._id.slice(0, 5)}...</td>
    `;

      valueList.appendChild(value);

      inputs.forEach((input) => (input.value = ""));
      inputs[0].focus();
    }
  }
}

accountingForm.addEventListener("keydown", handleKeyDown);
