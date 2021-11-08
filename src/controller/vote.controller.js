export const voteList = (req, res) => {
  return res.render("vote/voteList", { pageTitle: "투표 목록" });
};

export const getVoteCreate = (req, res) => {
  return res.render("vote/voteCreate", { pageTitle: "투표 만들기" });
};
export const postVoteCreate = (req, res) => {
  console.log(req.body);
  return res.send("투표 올리기 완료");
};
