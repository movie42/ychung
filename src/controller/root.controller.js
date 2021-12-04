import User from "../model/User.model";
import QT from "../model/QT.model";
import Weekly from "../model/Worship.model";
import Notice from "../model/Notice.model";
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
