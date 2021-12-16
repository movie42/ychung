import express from "express";
import {
  registerComments,
  deleteComment,
  getDB,
  getParagraph,
  postEditorImage
} from "../controller/api.controller";
import { onlyPrivate, preUrl, editorImage } from "../middleWare";

const api = express.Router();

// comments
api
  .route("/:id([0-9a-f]{24})/comments")
  .all(preUrl, onlyPrivate)
  .post(registerComments);

api
  .route("/:id([0-9a-f]{24})/comments/delete")
  .all(preUrl, onlyPrivate)
  .get(deleteComment);

// get notice data
api.route("/notice/:id([0-9a-f]{24})").get(getParagraph);

// get blog data
api.route("/blog/:id([0-9a-f]{24})").get(getParagraph);

// get rules data
api.route("/rules/:id([0-9a-f]{24})").get(getParagraph);

// get blog data
api.route("/worship/:id([0-9a-f]{24})").get(getParagraph);

// post image data
api.route("/post-image").post(editorImage, postEditorImage);

// checked email, userName
api.route("/checked-db/:name=:value").get(getDB);

export default api;
