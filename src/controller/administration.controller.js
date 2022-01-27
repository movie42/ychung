import Admin from "../model/Accounting.model";

export const accountingMainView = async (req, res) => {
  try {
    const data = await Admin.find();

    const itemName = {
      income: "수입",
      expenses: "지출",
      carriedForward: "이월",
      administration: "행정",
      education: "교육",
      event: "행사",
      society: "교제",
      mission: "선교",
    };

    res.render("accounting/accounting", {
      pageTitle: "청년부 회계 장부",
      data,
      itemName,
    });
  } catch (e) {
    console.log(e);
  }
};

export const postAccountingValue = async (req, res) => {
  const {
    body: {
      date: { year, month, date },
      item,
      itemDetail,
      title,
      detail,
      value,
    },
    session: {
      user: { _id },
    },
  } = req;

  try {
    const accountingData = await Admin.create({
      date: { year, month, date },
      item,
      itemDetail,
      title,
      detail,
      value,
      creator: _id,
    });

    return res.status(200).json({ accountingData });
  } catch (e) {
    console.log(e);
  }
};
