import Weekly from "../model/Weekly.model";
import User from "../model/User.model";

// list
export const list = async (req, res) => {
  try {
    const data = await (
      await Weekly.find().sort({ updateAt: "desc" })
    ).reverse();

    if (!data) {
      return res.status(404).render("weekly/weeklyList", {
        pageTitle: "주보",
        data: [],
        errorMessage: "주보 데이터를 찾을 수 없습니다. "
      });
    }

    return res.render("weekly/weeklyList", {
      pageTitle: "주보",
      data
    });
  } catch (error) {
    console.log(error);
    return res.status(404).render("root/404", {
      pageTitle: "페이지를 찾을 수 없습니다.",
      errorMessage: "페이지를 찾을 수 없습니다. "
    });
  }
};

// create
export const getWeeklyUpload = (req, res) =>
  res.render("weekly/weeklyCreate");

export const postWeeklyUpload = async (req, res) => {
  const {
    body: {
      title,
      word,
      chapter,
      verse,
      verse_end,
      pastor,
      worshipTeam,
      prayer,
      advertisement,
      reader,
      offering,
      benediction
    },
    session: {
      user: { _id }
    }
  } = req;

  // validation
  const formData = req.body;
  const sendValidationCheck = [];

  for (let i in formData) {
    if (formData[i] === "") {
      sendValidationCheck.push(i);
    }
  }

  try {
    const data = await Weekly.create({
      title,
      pastor,
      worshipTeam,
      word,
      chapter,
      verse,
      verse_end,
      prayer,
      advertisement,
      reader,
      offering,
      benediction,
      creator: _id
    });
    return res.status(302).json({ sendValidationCheck: 302 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ sendValidationCheck });
  }
};

// read
export const getWeeklyDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const data = await Weekly.findById(id);

    const dataSet = {
      gen: "창세기",
      exo: "출애굽기",
      lev: "레위기",
      num: "민수기",
      deu: "신명기",
      jos: "여호수아기",
      jdg: "사사기",
      rut: "룻기",
      "1sa": "사무엘기상",
      "2sa": "사무엘기하",
      "1ki": "열왕기상",
      "2ki": "열왕기하",
      "1ch": "역대상",
      "2ch": "역대하",
      ezr: "에스라기",
      neh: "느헤미야기",
      est: "에스더기",
      job: "욥기",
      psa: "시편",
      pro: "잠언",
      ecc: "전도서",
      sng: "아가",
      isa: "이사야서",
      jer: "예레미야서",
      lam: "예레미야 애가",
      ezk: "에스겔서",
      dan: "다니엘서",
      hos: "호세아서",
      jol: "요엘서",
      amo: "아모스서",
      oba: "오바댜서",
      jnh: "요나서",
      mic: "미가서",
      nam: "나훔서",
      hab: "하박국서",
      zep: "스바냐서",
      hag: "학개서",
      zec: "스가랴서",
      mal: "말라기서",
      mat: "마태복음서",
      mrk: "마가복음서",
      luk: "누가복음서",
      jhn: "요한복음서",
      act: "사도행전",
      rom: "로마서",
      "1co": "고린도전서",
      "2co": "고린도후서",
      gal: "갈라디아서",
      eph: "에베소서",
      php: "빌립보서",
      col: "골로새서",
      "1th": "데살로니가전서",
      "2th": "데살로니가후서",
      "1ti": "디모데전서",
      "2ti": "디모데후서",
      tit: "디도서",
      phm: "빌레몬서",
      heb: "히브리서",
      jas: "야고보서",
      "1pe": "베드로전서",
      "2pe": "베드로후서",
      "1jn": "요한1서",
      "2jn": "요한2서",
      "3jn": "요한3서",
      jud: "유다서",
      rev: "요한계시록"
    };

    const word = dataSet[data.word];

    return res.render("weekly/weeklyDetail", {
      pageTitle: data.title,
      id,
      data,
      word
    });
  } catch (error) {
    console.log(error);
    return res.status(404).render("404", {
      pageTitle: "404",
      errorMessage: "페이지를 찾을 수 없습니다."
    });
  }
};

// update
export const getWeeklyEdit = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const data = await Weekly.findById(id);
    return res.render("weekly/weeklyEdit", {
      pageTitle: "주보 수정",
      data
    });
  } catch (e) {
    console.log(error);
    return res.status(404).render("404", {
      pageTitle: "404",
      errorMessage: "페이지를 찾을 수 없습니다."
    });
  }
};
export const postWeeklyEdit = async (req, res) => {
  const {
    params: { id },
    body: {
      title,
      word,
      chapter,
      verse,
      verse_end,
      pastor,
      worshipTeam,
      prayer,
      advertisement,
      reader,
      offering,
      benediction
    }
  } = req;
  try {
    const data = await Weekly.findByIdAndUpdate(id, {
      title,
      word,
      chapter,
      verse,
      verse_end,
      pastor,
      worshipTeam,
      prayer,
      advertisement,
      reader,
      offering,
      benediction
    });
    return res.redirect(`/weekly/${data._id}`);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .render("weekly/weeklyEdit", { pageTitle: "주보 수정", data });
  }
};

// delete
export const weeklyDelete = async (req, res) => {
  const {
    session: {
      user: { _id: sessionUserId, authority }
    },
    params: { id }
  } = req;

  try {
    const userData = await User.findById(sessionUserId);

    if (!userData) {
      return res.status(404).render("root/404", {
        pageTitle: "사용자 정보를 찾을 수 없습니다.",
        errorMessage:
          "사용자 정보를 찾을 수 없습니다. 관리자에게 문의하세요."
      });
    }

    if (
      String(sessionUserId) === String(userData._id) &&
      authority === "admin"
    ) {
      await Weekly.findByIdAndDelete(id);
      return res.redirect("/weekly");
    }

    return res.status(404).render("root/404", {
      pageTitle: "삭제 권한이 없습니다.",
      errorMessage: "삭제 권한이 없습니다. 관리자에게 문의하세요."
    });
  } catch (e) {
    console.log(e);
    return res.status(404).render("root/404", {
      pageTitle: "해당 정보를 삭제할 수 없습니다.",
      errorMessage:
        "해당 정보를 삭제하는 과정에서 알 수 없는 오류를 발견했습니다."
    });
  }
};
