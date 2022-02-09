import Documents from "../model/Documents.model";

const TAG_NAME = {
  rules: "회칙",
  manuals: "메뉴얼",
  applications: "지원서",
};

// landing page
export const getLandingPage = async (req, res) => {
  res.render("documents/landingPage", { pageTitle: "도큐먼트" });
};

// list

// rules
export const getRulesList = async (req, res) => {
  const pathName = req.path.split("/")[1];

  try {
    const pageName = TAG_NAME[pathName];
    const data = (
      await Documents.find({ tag: "rules" }).sort({
        updateAt: "desc",
      })
    ).reverse();

    return res.status(200).render("documents/rules/list", {
      pageTitle: pageName,
      data,
      pageName,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).render("root/404", {
      pageTitle: 404,
      errorMessage: "페이지를 찾을 수 없습니다.",
    });
  }
};

// manuals
export const getManualsList = async (req, res) => {
  const pathName = req.path.split("/")[1];

  try {
    const pageName = TAG_NAME[pathName];
    const data = (
      await Documents.find({ tag: "manuals" }).sort({
        updateAt: "desc",
      })
    ).reverse();

    return res.status(200).render("documents/manuals/list", {
      pageTitle: pageName,
      data,
      pageName,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).render("root/404", {
      pageTitle: 404,
      errorMessage: "페이지를 찾을 수 없습니다.",
    });
  }
};

// applications
export const getApplicationsList = async (req, res) => {
  const pathName = req.path.split("/")[1];

  try {
    const pageName = TAG_NAME[pathName];
    const data = (
      await Documents.find({ tag: "applications" }).sort({
        updateAt: "desc",
      })
    ).reverse();

    return res.status(200).render("documents/applications/list", {
      pageTitle: pageName,
      data,
      pageName,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).render("root/404", {
      pageTitle: 404,
      errorMessage: "페이지를 찾을 수 없습니다.",
    });
  }
};

// create

export const getCreateDocuments = (req, res) => {
  const pathName = req.path.split("/")[1];

  const pageName = TAG_NAME[pathName];
  return res.render("documents/create", {
    pageTitle: `${pageName} 쓰기`,
    pathName,
    pageName,
  });
};

export const postCreateDocuments = async (req, res) => {
  const {
    body: { title, editorBody },
    path,
    session: {
      user: { _id },
    },
  } = req;

  try {
    const pathName = path.split("/")[1];

    const data = await Documents.create({
      title,
      tag: pathName,
      paragraph: editorBody,
      creator: _id,
    });

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "회칙을 만들 수 없습니다.",
      errorMessage: "오류가 계속 발생하면 관리자에게 문의하십시오.",
    });
  }
};

// update

export const getUpdateDocuments = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const data = await Documents.findById(id);
    return res.render("documents/update", {
      pageTitle: data.title,
      data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const postUpdateDocuments = async (req, res) => {
  const {
    body: { title, editorBody },
    params: { id },
  } = req;

  try {
    const data = await Documents.findByIdAndUpdate(
      { _id: id },
      {
        title,
        paragraph: editorBody,
      },
    );

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "회칙을 수정할 수 없습니다.",
      errorMessage:
        "회칙을 수정할 수 없습니다. 오류가 계속 발생하면 관리자에게 문의하십시오.",
    });
  }
};

//detail

export const getDocuments = async (req, res) => {
  const {
    url,
    params: { id },
  } = req;

  const path = req.originalUrl.split("/").slice(1, 3).join("/");

  try {
    const data = await Documents.findById(id);
    return res.render("documents/read", {
      pageTitle: data.title,
      path,
      data,
    });
  } catch (e) {
    console.log(e);
  }
};

// delete

export const deleteDocuments = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    await Documents.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
  }
};
