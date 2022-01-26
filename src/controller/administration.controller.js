import Admin from "../model/Accounting.model";

export const accountingMainView = (req, res) => {
  res.render("accounting/accounting", { pageTitle: "청년부 회계 장부" });
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
