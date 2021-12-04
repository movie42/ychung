import QT from "../model/QT.model";
import Notice from "../model/Notice.model";
import User from "../model/User.model";
import Documents from "../model/Documents.model";
import Comment from "../model/Comments.model";

export const getDB = async (req, res) => {
  const {
    params: { name, value },
  } = req;
  let exist;
  try {
    if (name === "email") {
      exist = await User.exists({ email: value });
    } else if (name === "userName") {
      exist = await User.exists({ userName: value });
    }

    return res.status(200).json({ exist });
  } catch (e) {
    console.log(e);
  }
};

export const getParagraph = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const data = await Notice.findById(id);

    return res.status(303).json({ data });
  } catch (e) {
    console.log(e);
  }
};

export const postEditorImage = async (req, res) => {
  const { files } = req;

  try {
    const data =
      process.env.NODE_ENV === "production"
        ? files[0].transforms[0].location
        : `/${files[0].path}`;
    return res.status(201).json({ data });
  } catch (e) {
    console.log(e);
  }
};

export const getDocumentsParagraph = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const data = await Documents.findById(id);

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
  }
};

export const registerComments = async (req, res) => {
  const {
    body: { text, pathName },
    session: { user },
    params: { id },
  } = req;

  if (user === undefined) {
    return res.snedStatus(404);
  }
  const modelName = {
    qt: QT,
    notice: Notice,
  };

  try {
    const modelData = await modelName[pathName].findById(id);
    if (!modelData) {
      return res.sendStatus(404);
    }
    const comment = await Comment.create({
      text,
      creator: user._id,
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
    params: { id },
  } = req;

  await Comment.findByIdAndDelete(id);
  return res.sendStatus(200);
};
