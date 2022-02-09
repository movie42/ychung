import express from "express";
import {
  registerComments,
  deleteComment,
  getDB,
  getParagraph,
  postEditorImage,
  patchNoticeToWeekly,
} from "../controller/api.controller";
import {
  onlyPrivate,
  preUrl,
  editorImage,
  isAuth,
  authorityHandler,
} from "../middleWare";

const api = express.Router();

api
  .route("/:id([0-9a-f]{24})/comments")
  .all(preUrl, onlyPrivate)
  .post(registerComments)
  .delete(deleteComment);

api.route("/notice/:id([0-9a-f]{24})").get(getParagraph);

api
  .route("/notice/is-weekly")
  .all((req, res, next) =>
    isAuth(req, res, next, authorityHandler, "master", "administrator"),
  )
  .patch(patchNoticeToWeekly);

api.route("/blog/:id([0-9a-f]{24})").get(getParagraph);

api.route("/worship/:id([0-9a-f]{24})").get(getParagraph);

api.route("/documents/rules/:id([0-9a-f]{24})").get(getParagraph);

api.route("/documents/manuals/:id([0-9a-f]{24})").get(getParagraph);

api.route("/documents/applications/:id([0-9a-f]{24})").get(getParagraph);

api.route("/post-image").all(onlyPrivate).post(editorImage, postEditorImage);

api.route("/checked-db/:name=:value").get(getDB);

export default api;
