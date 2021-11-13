import bcrypt from "bcrypt";
import User from "../model/User.model";

//detail
export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const data = await User.findById(id)
      .populate("qt")
      .populate("notice")
      .populate("weekly");

    if (!data) {
      return res.status(404).render("root/404", {
        pageTitle: "회원 정보를 찾을 수 없습니다.",
        errorMessage: "회원 정보를 찾을 수 없습니다."
      });
    }
    const isHeroku = process.env.NODE_ENV === "production";
    return res.render("user/userDetail", {
      pageTitle: data.name,
      data,
      isHeroku
    });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "페이지를 찾을 수 없습니다.",
      errorMessage:
        "페이지를 찾을 수 없습니다. 오류가 계속된다면 관리자에게 문의하십시오"
    });
  }
};

//edit profile
export const getEditUser = async (req, res) => {
  const {
    params: { id: userId },
    session: {
      user: { _id }
    }
  } = req;

  if (String(userId) !== String(_id)) {
    return res.status(404).render("root/404", {
      pageTitle: "페이지를 수정할 권한이 없습니다.",
      errorMessage: "페이지를 수정할 권한이 없습니다"
    });
  }

  try {
    const data = await User.findById(_id);
    if (!data) {
      res.status(404).render("root/404", {
        pageTitle: "사용자를 찾을 수 없습니다.",
        errorMessage: "사용자를 찾을 수 없습니다."
      });
    }
    return res.render("user/userEditProfile", {
      pageTitle: `${data.name}정보 수정`,
      data
    });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "페이지를 찾을 수 없습니다.",
      errorMessage:
        "페이지를 찾을 수 없습니다. 오류가 계속된다면 관리자에게 문의하십시오"
    });
  }
};

export const postEditUser = async (req, res) => {
  const {
    body: { name, email, userName },
    file,
    params: { id: userId },
    session: {
      user: {
        _id,
        name: sessionName,
        userName: sessionUserName,
        email: sessionEmail
      }
    }
  } = req;

  if (String(userId) !== String(_id)) {
    return res.status(404).render("root/404", {
      pageTitle: "페이지를 수정할 권한이 없습니다.",
      errorMessage: "페이지를 수정할 권한이 없습니다"
    });
  }
  try {
    if (
      file !== undefined ||
      name !== sessionName ||
      userName !== sessionUserName ||
      email !== sessionEmail
    ) {
      const dataArray = [];
      if (email !== sessionEmail) dataArray.push({ email: email });
      if (userName !== sessionUserName)
        dataArray.push({ userName: userName });
      if (!dataArray) {
        const exists = await User.exists({
          $or: dataArray
        });
        if (exists) {
          return res.status(404).render("404", {
            pageTitle: "이메일, 닉네임이 이미 존재합니다.",
            errorMessage: "이메일, 닉네임이 이미 존재합니다."
          });
        }
      }
      const isHeroku = process.env.NODE_ENV === "production";
      let profileUrl = await User.findById(_id);
      let data = await User.findByIdAndUpdate(
        { _id: _id },
        {
          name,
          email,
          userName,
          profilePhotoUrl: file
            ? isHeroku
              ? file.location
              : file.path
            : profileUrl.profilePhotoUrl
        }
      );
      return res.redirect(`/user/${data._id}`);
    } else {
      return res.redirect(`/user/${_id}`);
    }
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "페이지를 찾을 수 없습니다.",
      errorMessage:
        "페이지를 찾을 수 없습니다. 문제가 지속된다면 관리자에게 문의하십시오."
    });
  }
};

// edit password
export const getEditPassword = (req, res) => {
  const {
    params: { id: userId },
    session: {
      user: { _id }
    }
  } = req;

  if (String(userId) !== String(_id)) {
    return res.status(404).render("root/404", {
      pageTitle: "잘못된 경로입니다.",
      errorMessage: "잘못된 경로입니다."
    });
  }

  try {
    return res.render("user/userEditPassword", {
      pageTitle: "비밀번호 변경"
    });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "페이지를 찾을 수 없습니다.",
      errorMessage:
        "페이지를 찾을 수 없습니다. 문제가 지속된다면 관리자에게 문의하십시오."
    });
  }
};

export const postEditPassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword2 },
    params: { id: userId },
    session: {
      user: { _id }
    }
  } = req;

  if (String(userId) !== String(_id)) {
    return res.status(404).render("root/404", {
      pageTitle: "잘못된 경로입니다.",
      errorMessage: "잘못된 경로입니다."
    });
  }

  try {
    const findUser = await User.findById(userId);
    const confirm = await bcrypt.compare(
      oldPassword,
      findUser.password
    );

    if (!confirm) {
      return res.status(400).render("user/changePassword", {
        pageTitle: "비민번호 변경",
        errorMessage: "기존의 비밀번호가 일치하지 않습니다."
      });
    }

    if (newPassword !== newPassword2) {
      return res.status(400).render("user/changePassword", {
        pageTitle: "비밀번호가 다릅니다.",
        errorMessage: "새로운 비밀번호가 서로 다릅니다."
      });
    }

    findUser.password = newPassword;
    await findUser.save();
    return res.render("user/text", { pageTitle: "test", findUser });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "페이지를 찾을 수 없습니다.",
      errorMessage:
        "페이지를 찾을 수 없습니다. 문제가 지속된다면 관리자에게 문의하십시오."
    });
  }
};
