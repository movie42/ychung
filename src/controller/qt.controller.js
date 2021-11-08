import QT from "../model/QT.model";
import User from "../model/User.model";

// list
export const qtList = async (req, res) => {
  try {
    const data = await QT.find().sort({ updateAt: "desc" });
    return res.render("qt/qtList", {
      pageTitle: "묵상 에세이",
      data
    });
  } catch (error) {
    console.log(e);
    const errorMessage = "요청한 값을 찾을 수가 없습니다. ";
    return res.status(400).render("qt/qtUpload", {
      pageTitle: "묵상에세이",
      errorMessage
    });
  }
};

// create
export const getQtWrite = (req, res) => {
  return res.render("qt/qtUpload", { pageTitle: "묵상 에세이" });
};
export const postQtWrite = async (req, res) => {
  const {
    body: { title, word, paragraph },
    session: {
      user: { _id }
    }
  } = req;

  try {
    const data = await QT.create({
      title,
      word,
      paragraph,
      creator: _id
    });
    const user = await User.findById(_id);
    user.qt.push(data._id);
    await user.save();
    return res.redirect(`/qt/${data._id}`);
  } catch (e) {
    console.log(e);
    const errorMessage =
      "묵상 에세이를 쓰는 중에 오류가 발생했습니다. 지속적으로 문제가 발생할 시에 관리자에게 문의하십시오.";
    return res.status(400).render("qt/qtUpload", {
      pageTitle: "묵상에세이",
      errorMessage
    });
  }
};

// detail
export const qtDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const data = await QT.findById(id)
      .populate("comments")
      .populate("creator");

    let checkUserName;
    if (req.session.loggedIn) {
      checkUserName = req.session.user.email;
    } else {
      checkUserName = "Unknown";
    }

    return res
      .status(200)
      .render("qt/qtDetail", { pageTitle: data.title, data });
  } catch (e) {
    console.log(e);
    const errorMessage = "페이지를 표시할 수 없습니다.";
    return res
      .status(404)
      .render("root/404", { pageTitle: "묵상 에세이", errorMessage });
  }
};

// update
export const getQtUpdate = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id }
    }
  } = req;
  try {
    const data = await QT.findById(id);
    if (String(data.creator) !== String(_id)) {
      return res.status(404).render("root/404", {
        pageTitle: "수정 권한이 없습니다.",
        errorMessage: "수정 권한이 없습니다."
      });
    }
    return res.render("qt/qtEdit", {
      pageTitle: "묵상 에세이 수정",
      data
    });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "페이지를 찾을 수 없습니다.",
      errorMessage: "페이지를 찾을 수 없습니다."
    });
  }
};
export const postQtUpdate = async (req, res) => {
  const {
    body: { title, word, paragraph },
    params: { id }
  } = req;

  try {
    await QT.findByIdAndUpdate(
      { _id: id },
      {
        title,
        word,
        paragraph
      }
    );
    return res.redirect(`/qt/${id}`);
  } catch (e) {
    console.log(e);
    return res.status(400).render("404", {
      pageTitle: "수정할 수 없습니다.",
      errorMessage:
        "수정하는 과정에서 알 수 없는 오류가 발생했습니다."
    });
  }
};

// delete
export const qtDelete = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id }
    }
  } = req;
  try {
    const data = await QT.findById(id);

    if (String(_id) !== String(data.creator)) {
      return res.status(400).render("404", {
        pageTitle: "삭제 권한이 없습니다.",
        errorMessage: "삭제 권한이 없습니다."
      });
    }
    await QT.findByIdAndDelete(id);
    return res.redirect("/qt");
  } catch (e) {
    console.log(e);
    return res
      .status(404)
      .render("404", { pageTitle: "접근할 수 없습니다." });
  }
};
