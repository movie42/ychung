import User from "../model/User.model";
import QT from "../model/QT.model";
import Weekly from "../model/Weekly.model";
import Notice from "../model/Notice.model";
import Attendence from "../model/Attendence.model";
import Rules from "../model/Rules.model";
import bcrypt from "bcrypt";

// home
export const home = (req, res) =>
  res.render("root/home", { pageTitle: "메인" });

// login
export const getLogin = (req, res) => {
  return res.render("root/login", { pageTitle: "로그인" });
};

export const postLogin = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).render("root/login", {
        pageTitle: "로그인",
        errorMessage: "회원 정보가 존재하지 않습니다.",
      });
    }

    const confirm = await bcrypt.compare(password, user.password);

    if (!confirm) {
      return res.status(400).render("root/login", {
        pageTitle: "로그인",
        errorMessage: "잘못된 비밀번호를 입력하였습니다.",
      });
    }

    req.session.loggedIn = true;
    req.session.user = user;

    // 로그인이 필요하면 로그인 한 다음에 다시 해당 페이지로 돌아가기
    if (req.session.preUrl === undefined) {
      return res.redirect(`/`);
    } else {
      return res.redirect(`${req.session.preUrl}`);
    }
  } catch (e) {
    console.log(e);
    return res.status(400).render("root/join", {
      pageTitle: "회원가입",
      errorMessage: "회원가입을 완료할 수 없습니다",
    });
  }
};

// join
export const getJoin = (req, res) => {
  return res.render("root/join", { pageTitle: "회원가입" });
};

export const postJoin = async (req, res) => {
  const {
    body: {
      body: { email, name, userName, password, password2 },
    },
  } = req;

  try {
    const exists = await User.exists({
      $or: [{ userName }, { email }],
    });

    if (exists) {
      return res.status(400).json({
        type: "isExistsError",
      });
    }

    if (password !== password2) {
      return res.status(400).json({
        type: "isNotpasswordError",
      });
    }

    await User.create({
      email,
      userName,
      name,
      password,
    });

    return res.status(201).json({
      type: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ type: "isError" });
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let data = [];
  try {
    if (keyword) {
      const qtData = await QT.find({
        title: new RegExp(keyword, "ig"),
      });
      const weeklyData = await Weekly.find({
        title: new RegExp(keyword, "ig"),
      });
      const noticeData = await Notice.find({
        title: new RegExp(keyword, "ig"),
      });
      data.push(qtData);
      data.push(weeklyData);
      data.push(noticeData);
    }
    return res.render("root/search", {
      pageTitle: keyword,
      keyword,
      data,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).render("root/join", {
      pageTitle: "회원가입",
      errorMessage: "회원가입을 완료할 수 없습니다",
    });
  }
};

export const attendence = async (req, res) => {
  const {
    session: { user },
  } = req;

  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth();

  if (user === undefined) {
    return res.redirect("/login");
  }

  try {
    const data = await Attendence.findOne({
      name: `${month}월 ${date}일`,
    });

    if (!data) {
      await Attendence.create({
        name: `${month}월 ${date}일`,
        user: user._id,
      });
      return res.status(201).json({ exists: true });
    }

    const exists = data.user;

    if (exists.indexOf(user._id) !== -1) {
      return res.status(404).json({ exists });
    }

    data.user.push(user._id);
    localStorage.setItem("출석 체크", "true");
    await data.save();
    return res.status(201).json({ exists: true });
  } catch (e) {
    console.log(e);
    return res.sendStatus(404);
  }
};

//rules
export const getRulesList = async (req, res) => {
  try {
    const data = await Rules.find({});
    return res.render("root/rules/list", { pageTitle: "회칙", data });
  } catch (e) {
    console.log(e);
  }
};

export const getRules = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const data = await Rules.findById(id);
    return res.render("root/rules/read", { pageTitle: data.title, data });
  } catch (e) {
    console.log(e);
  }
};

export const getCreateRules = (req, res) => {
  return res.render("root/rules/create", { pageTitle: "회칙 쓰기" });
};

export const postCreateRules = async (req, res) => {
  const {
    body: { headTitle, editorBody },
    session: {
      user: { _id },
    },
  } = req;

  try {
    const data = await Rules.create({
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
export const getUpdateRules = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const data = await Rules.findById(id);
    return res.render("root/rules/update", { pageTitle: data.title, data });
  } catch (e) {
    console.log(e);
  }
};
export const postUpdateRules = async (req, res) => {
  const {
    body: { headTitle, editorBody },
    params: { id },
  } = req;

  try {
    const data = await Rules.findByIdAndUpdate(
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
