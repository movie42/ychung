const container = document.querySelector(".vote_container");
const listContainer = document.querySelector(".vote_list_container");
const form = container.querySelector("form");
const input = container.querySelector("input");
const button = container.querySelector("button");
const voteListContainer = document.createElement("ul");

function paintData(data) {
  const voteList = document.createElement("li");
  const title = document.createElement("h3");
  const agree = document.createElement("p");
  const disagree = document.createElement("p");
  const agreeBtn = document.createElement("button");
  const disagreeBtn = document.createElement("button");

  agreeBtn.className = "agreeBtn";
  disagreeBtn.className = "disagreeBtn";

  agreeBtn.innerText = "찬성";
  disagreeBtn.innerText = "반대";

  title.innerText = data.voteName;
  agree.innerText = data.agree;
  disagree.innerText = data.disagree;

  voteList.append(title);
  voteList.append(agree);
  voteList.append(agreeBtn);
  voteList.append(disagree);
  voteList.append(disagreeBtn);
  voteListContainer.append(voteList);
}

async function getVoteData() {
  listContainer.append(voteListContainer);
  const request = await fetch("/api/get-vote-db", {
    method: "GET"
  });
  const { data } = await request.json();
  for (let i = 0; i < data.length; i++) {
    paintData(data[i]);
  }
}

async function handleVoteName(e) {
  e.preventDefault();
  const voteName = input.value;
  const request = await fetch("/vote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ voteName })
  });
  const { data } = await request.json();
  paintData(data);
}

function handleNumberData(e) {
  e.preventDefault();
  console.log(e.target);
}

if (container) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
  });
  button.addEventListener("click", handleVoteName);
}
getVoteData();
