import express from "express";
import {
  registerComments,
  deleteComment,
  getDB,
  getParagraph,
  postEditorImage,
  patchNoticeToWeekly
} from "../controller/api.controller";
import {
  onlyPrivate,
  preUrl,
  editorImage,
  isAuth,
  authorityHandler
} from "../middleWare";

const api = express.Router();

// comments
api
  .route("/:id([0-9a-f]{24})/comments")
  .all(preUrl, onlyPrivate)
  .post(registerComments)
  .delete(deleteComment);

// get notice data
api.route("/notice/:id([0-9a-f]{24})").get(getParagraph);

// check notice
api
  .route("/notice/is-weekly")
  .all((req, res, next) =>
    isAuth(req, res, next, authorityHandler, "master", "administrator")
  )
  .patch(patchNoticeToWeekly);

// get blog data
api.route("/blog/:id([0-9a-f]{24})").get(getParagraph);

// get blog data
api.route("/worship/:id([0-9a-f]{24})").get(getParagraph);

// get documents rules data
api.route("/documents/rules/:id([0-9a-f]{24})").get(getParagraph);

// get documents manuals data
api.route("/documents/manuals/:id([0-9a-f]{24})").get(getParagraph);

// get documents applications data
api.route("/documents/applications/:id([0-9a-f]{24})").get(getParagraph);

// post image data
api.route("/post-image").all(onlyPrivate).post(editorImage, postEditorImage);

// checked email, userName
api.route("/checked-db/:name=:value").get(getDB);

export default api;
