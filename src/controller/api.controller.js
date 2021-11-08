import QT from "../model/QT.model";
import Notice from "../model/Notice.model";
import User from "../model/User.model";
import Comment from "../model/Comments.model";

export const getParagraph = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const notice = await Notice.findById(id);

    return res.status(303).json({ notice });
  } catch (e) {
    console.log(e);
  }
};

export const registerComments = async (req, res) => {
  const {
    body: { text, pathName },
    session: { user },
    params: { id }
  } = req;

  if (user === undefined) {
    return res.snedStatus(404);
  }
  const modelName = {
    qt: QT,
    notice: Notice
  };

  try {
    const modelData = await modelName[pathName].findById(id);
    if (!modelData) {
      return res.sendStatus(404);
    }
    const comment = await Comment.create({
      text,
      creator: user._id
    });
    comment[pathName] = modelData.id;
    comment.save();
    const userModel = await User.findById(user._id);
    modelData.comments.push(comment.id);
    await modelData.save();
    userModel.comments.push(comment.id);
    await userModel.save();
    return res
      .status(201)
      .json({ newComment: comment._id, userName: userModel.name });
  } catch (e) {
    return res.sendStatus(404);
  }
};

export const deleteComment = async (req, res) => {
  const {
    params: { id }
  } = req;
  console.log(id);
  console.log("hi");
  await Comment.findByIdAndDelete(id);
  return res.sendStatus(200);
};
