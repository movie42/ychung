import Documents from "../model/Documents.model";

export const getDocumentsList = async (req, res) => {};

export const getDocuments = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const data = await Documents.findById(id);
    return res.render("documents/read", { pageTitle: data.title, data });
  } catch (e) {
    console.log(e);
  }
};

export const getCreateDocuments = (req, res) => {
  return res.render("documents/create", { pageTitle: "회칙 쓰기" });
};

export const postCreateDocuments = async (req, res) => {
  const {
    body: { headTitle, editorBody },
    session: {
      user: { _id },
    },
  } = req;

  try {
    const data = await Documents.create({
      title: headTitle,
      paragraph: editorBody,
      creator: _id,
    });

    return res.status(201).json({ data });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "회칙을 만들 수 없습니다.",
      errorMessage: "오류가 계속 발생하면 관리자에게 문의하십시오.",
    });
  }
};
export const getUpdateDocuments = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const data = await Documents.findById(id);
    return res.render("documents/update", { pageTitle: data.title, data });
  } catch (e) {
    console.log(e);
  }
};
export const postUpdateDocuments = async (req, res) => {
  const {
    body: { headTitle, editorBody },
    params: { id },
  } = req;

  try {
    const data = await Documents.findByIdAndUpdate(
      { _id: id },
      {
        title: headTitle,
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
