import {
  accountingForm,
  getSelector,
  getSelectorAll,
  gridWrapper
} from "./selectors";

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

      const value = document.createElement("tr");
      const itemName = {
        income: "수입",
        expenses: "지출",
        carriedForward: "이월",
        administration: "행정",
        education: "교육",
        event: "행사",
        society: "교제",
        mission: "선교"
      };
      value.innerHTML = `
        <td>${accountingData.date.month + 1}월 ${
        accountingData.date.date
      }일</td>
        <td>${itemName[accountingData.item]}</td>
        <td>${itemName[accountingData.itemDetail]}</td>
        <td>${accountingData.title}</td>
        <td>${accountingData.detail}</td>
        <td>${accountingData.value}</td>
        <td><td>
        <td>${accountingData._id.slice(0, 5)}...</td>
    `;

      valueList.appendChild(value);

      inputs.forEach((input) => (input.value = ""));
      inputs[0].focus();
      paintBalance();
    }
  }
}

function paintBalance() {
  const itemNodes = getSelectorAll(".item");
  const valueNodes = getSelectorAll(".value");
  const balanceNode = getSelectorAll(".balance");

  const dataList = [];

  for (let i = 0; i < itemNodes.length; i++) {
    dataList.push({
      item: itemNodes[i].textContent,
      value: +valueNodes[i].textContent
    });
  }

  for (let i = 0; i < dataList.length; i++) {
    console.log(dataList[i]);

    if (i === 0) {
      balanceNode[i].textContent = dataList[i].value;
    } else if (dataList[i].item === "수입") {
      balanceNode[i].textContent =
        +balanceNode[i - 1].textContent + dataList[i].value;
    } else if (dataList[i].item === "지출") {
      balanceNode[i].textContent =
        +balanceNode[i - 1].textContent - dataList[i].value;
    } else if (dataList[i].item === "이월") {
      balanceNode[i].textContent =
        balanceNode[i - 1].textContent;
    }
  }

  // const items = Array.prototype.map.call(
  //   itemNodes,
  //   (list) => list.textContent
  // );

  // const values = Array.prototype.map.call(
  //   valueNodes,
  //   (list) => +list.textContent
  // );

  // for (let i = 0; i < values.length; i++) {
  //   if (i === 0) {
  //     balanceNode[i].textContent = values[i];
  //   } else if (items[i] === "수입") {
  //     balanceNode[i].textContent =
  //       values[i - 1] + values[i];
  //   } else if (items[i] === "지출") {
  //     balanceNode[i].textContent =
  //       values[i - 1] - values[i];
  //   } else {
  //     balanceNode[i].textContent = values[i];
  //   }
  // }
}
paintBalance();
accountingForm.addEventListener("keydown", handleKeyDown);
