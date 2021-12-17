import Documents from "../model/Documents.model";

const tagName = {
  rules: "회칙",
  manuals: "메뉴얼",
  applications: "지원서"
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
    const pageName = tagName[pathName];
    const data = (
      await Documents.find({ tag: "rules" }).sort({
        updateAt: "desc"
      })
    ).reverse();

    return res.status(200).render("documents/rules/list", {
      pageTitle: "문서",
      data,
      pageName
    });
  } catch (error) {
    console.log(error);
    return res.status(400).render("root/404", {
      pageTitle: 404,
      errorMessage: "페이지를 찾을 수 없습니다."
    });
  }
};

// manuals
export const getManualsList = async (req, res) => {
  const pathName = req.path.split("/")[1];

  try {
    const pageName = tagName[pathName];
    const data = (
      await Documents.find({ tag: "manuals" }).sort({
        updateAt: "desc"
      })
    ).reverse();

    return res.status(200).render("documents/manuals/list", {
      pageTitle: "문서",
      data,
      pageName
    });
  } catch (error) {
    console.log(error);
    return res.status(400).render("root/404", {
      pageTitle: 404,
      errorMessage: "페이지를 찾을 수 없습니다."
    });
  }
};

// applications
export const getApplicationsList = async (req, res) => {
  const pathName = req.path.split("/")[1];

  try {
    const pageName = tagName[pathName];
    const data = (
      await Documents.find({ tag: "applications" }).sort({
        updateAt: "desc"
      })
    ).reverse();

    return res.status(200).render("documents/applications/list", {
      pageTitle: "문서",
      data,
      pageName
    });
  } catch (error) {
    console.log(error);
    return res.status(400).render("root/404", {
      pageTitle: 404,
      errorMessage: "페이지를 찾을 수 없습니다."
    });
  }
};

// create

export const getCreateDocuments = (req, res) => {
  const pathName = req.path.split("/")[1];

  const pageName = tagName[pathName];
  return res.render("documents/create", {
    pageTitle: `${pageName} 쓰기`,
    pageName
  });
};

export const postCreateDocuments = async (req, res) => {
  const {
    body: {
      formData: { title },
      editorBody
    },
    path,
    session: {
      user: { _id }
    }
  } = req;

  try {
    const pathName = path.split("/")[1];

    const data = await Documents.create({
      title,
      tag: pathName,
      paragraph: editorBody,
      creator: _id
    });

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "회칙을 만들 수 없습니다.",
      errorMessage: "오류가 계속 발생하면 관리자에게 문의하십시오."
    });
  }
};

// update

export const getUpdateDocuments = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const data = await Documents.findById(id);
    return res.render("documents/update", {
      pageTitle: data.title,
      data
    });
  } catch (e) {
    console.log(e);
  }
};

export const postUpdateDocuments = async (req, res) => {
  const {
    body: { headTitle, editorBody },
    params: { id }
  } = req;

  try {
    const data = await Documents.findByIdAndUpdate(
      { _id: id },
      {
        title: headTitle,
        paragraph: editorBody
      }
    );

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "회칙을 수정할 수 없습니다.",
      errorMessage:
        "회칙을 수정할 수 없습니다. 오류가 계속 발생하면 관리자에게 문의하십시오."
    });
  }
};

//detail

export const getDocuments = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const data = await Documents.findById(id);
    return res.render("documents/read", {
      pageTitle: data.title,
      data
    });
  } catch (e) {
    console.log(e);
  }
};

// delete

export const deleteDocuments = (req, res) => {};
