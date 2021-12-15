import Blog from "../model/Blog.model";
import User from "../model/User.model";

// list
export const blogList = async (req, res) => {
  try {
    const data = (
      await Blog.find().sort({ updateAt: "desc" })
    ).reverse();
    return res.render("blog/blogList", {
      pageTitle: "블로그",
      data
    });
  } catch (error) {
    console.log(e);
    const errorMessage = "요청한 값을 찾을 수가 없습니다. ";
    return res.status(400).render("blog/blogUpload", {
      pageTitle: "블로그",
      errorMessage
    });
  }
};

// create
export const getBlogWrite = (req, res) => {
  return res.render("blog/blogUpload", { pageTitle: "블로깅" });
};

export const postBlogWrite = async (req, res) => {
  const {
    body: {
      formData: { title },
      editorBody
    },
    session: {
      user: { _id }
    }
  } = req;

  try {
    const data = await Blog.create({
      title,
      paragraph: editorBody,
      creator: _id
    });
    const user = await User.findById(_id);

    user.blog.push(data._id);
    await user.save();

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    const errorMessage =
      "블로그를 쓰는 중에 오류가 발생했습니다. 지속적으로 문제가 발생할 시에 관리자에게 문의하십시오.";
    return res.status(400).render("blog/blogUpload", {
      pageTitle: "블로그",
      errorMessage
    });
  }
};

// detail
export const blogDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const data = await Blog.findById(id)
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
      .render("blog/blogDetail", { pageTitle: data.title, data });
  } catch (e) {
    console.log(e);
    const errorMessage = "페이지를 표시할 수 없습니다.";
    return res
      .status(404)
      .render("root/404", { pageTitle: "블로그", errorMessage });
  }
};

// update
export const getBlogUpdate = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id }
    }
  } = req;
  try {
    const data = await Blog.findById(id);

    if (String(data.creator) !== String(_id)) {
      return res.status(404).render("root/404", {
        pageTitle: "수정 권한이 없습니다.",
        errorMessage: "수정 권한이 없습니다."
      });
    }

    return res.render("blog/blogEdit", {
      pageTitle: "블로그 수정",
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

export const postBlogUpdate = async (req, res) => {
  const {
    body: { headTitle, editorBody },
    params: { id }
  } = req;

  try {
    const data = await Blog.findByIdAndUpdate(
      { _id: id },
      {
        title: headTitle,
        paragraph: editorBody
      }
    );
    return res.status(200).json({ data });
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
export const blogDelete = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id }
    }
  } = req;

  try {
    const data = await Blog.findById(id);

    if (String(_id) !== String(data.creator)) {
      return res.status(400).render("404", {
        pageTitle: "삭제 권한이 없습니다.",
        errorMessage: "삭제 권한이 없습니다."
      });
    }

    await Blog.findByIdAndDelete(id);
    return res.redirect("/blog");
  } catch (e) {
    console.log(e);
    return res
      .status(404)
      .render("404", { pageTitle: "접근할 수 없습니다." });
  }
};
