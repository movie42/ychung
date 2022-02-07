import Blog from "../model/Blog.model";
import Notice from "../model/Notice.model";
import User from "../model/User.model";
import Vote from "../model/Vote.model";
import Documents from "../model/Documents.model";
import Worship from "../model/Worship.model";
import Comment from "../model/Comments.model";

export const getDB = async (req, res) => {
  const {
    params: { name, value }
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
    path,
    params: { id }
  } = req;
  try {
    const rootPathName = path.split("/")[1];
    const DATA = {
      blog: Blog,
      notice: Notice,
      documents: Documents,
      worship: Worship
    };

    const data = await DATA[rootPathName].findById(id);

    return res.status(200).json({ data });
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
    blog: Blog,
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

  await Comment.findByIdAndDelete(id);
  return res.sendStatus(200);
};

// vote

export const getVoteData = async (req, res) => {
  const data = await Vote.find({});

  res.status(200).json({ data });
};

export const patchNoticeToWeekly = async (req, res) => {
  const {
    body: { dataId }
  } = req;

  try {
    const notice = await Notice.findById(dataId);
    notice.isWeekly = !notice.isWeekly;
    await notice.save();
    let data = notice.isWeekly;
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};
