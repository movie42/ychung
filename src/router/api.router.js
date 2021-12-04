import express from "express";
import {
  registerComments,
  deleteComment,
  getParagraph,
  getDocumentsParagraph,
  getDB,
  postEditorImage,
} from "../controller/api.controller";
import { onlyMaster, onlyPrivate, preUrl, editorImage } from "../middleWare";

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
api.route("/:id([0-9a-f]{24})/notice-data").get(getParagraph);

// post image data
api.route("/post-image").post(editorImage, postEditorImage);

//rules
api.route("/:id([0-9a-f]{24})/rules-data").get(getDocumentsParagraph);

// checked email, userName
api.route("/checked-db/:name=:value").get(getDB);

export default api;
