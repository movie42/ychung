import Notice from "../model/Notice.model";

// list
export const getNoticeData = async (req, res) => {
  try {
    const data = (await Notice.find()).reverse();
    return res.render("notice/noticeList", {
      pageTitle: "광고",
      data
    });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "광고를 만들 수 없습니다.",
      errorMessage: "오류가 계속 발생하면 관리자에게 문의하십시오."
    });
  }
};

// Create
export const getCreateNoticeEditor = (req, res) => {
  return res.render("notice/noticeCreate", {
    pageTitle: "광고 쓰기"
  });
};

export const postNewNoticeData = async (req, res) => {
  const {
    body: { title, isWeekly, editorBody },
    session: {
      user: { _id }
    }
  } = req;

  try {
    const data = await Notice.create({
      title,
      isWeekly: isWeekly === "on" ? true : false,
      paragraph: editorBody,
      creator: _id
    });

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "광고를 만들 수 없습니다.",
      errorMessage: "오류가 계속 발생하면 관리자에게 문의하십시오."
    });
  }
};

// Read
export const getNoticeDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const data = await Notice.findById(id);

    if (!data) {
      return res.status(404).render("root/404", {
        pageTitle: "404",
        errorMessage: "오류가 계속 발생하면 관리자에게 문의하십시오."
      });
    }

    return res.render("notice/noticeDetail", {
      pageTitle: data.title,
      data
    });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "광고를 만들 수 없습니다.",
      errorMessage: "오류가 계속 발생하면 관리자에게 문의하십시오."
    });
  }
};

// Update
export const getNoticeUpdateEditor = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const data = await Notice.findById(id);

    return res.render("notice/noticeEdit", {
      pageTitle: `${data.title} 수정`,
      data
    });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "광고 수정 페이지를 알 수 없는 이유로 표시할 수 없습니다.",
      errorMessage:
        "광고 수정 페이지를 알 수 없는 이유로 표시할 수 없습니다. 오류가 계속 발생하면 관리자에게 문의하십시오."
    });
  }
};

export const patchNoticeData = async (req, res) => {
  const {
    body: { title, isWeekly, editorBody },
    params: { id }
  } = req;

  try {
    const data = await Notice.findByIdAndUpdate(
      { _id: id },
      {
        title,
        isWeekly: isWeekly === "on" ? true : false,
        paragraph: editorBody
      }
    );

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "광고를 수정할 수 없습니다.",
      errorMessage:
        "광고를 수정할 수 없습니다. 오류가 계속 발생하면 관리자에게 문의하십시오."
    });
  }
};

// Delete
export const deleteNotice = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    await Notice.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "광고를 수정할 수 없습니다.",
      errorMessage:
        "광고를 수정할 수 없습니다. 오류가 계속 발생하면 관리자에게 문의하십시오."
    });
  }
};
