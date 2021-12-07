import express from "express";
import {
  registerComments,
  deleteComment,
  getParagraph,
  getDB,
  postEditorImage,
  getVoteData
} from "../controller/api.controller";
import {
  onlyMaster,
  onlyPrivate,
  preUrl,
  editorImage
} from "../middleWare";

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

// get blog data
api.route("/:id([0-9a-f]{24})/blog-data").get(getParagraph);

// get rules data
api.route("/:id([0-9a-f]{24})/rules-data").get(getParagraph);

// post image data
api.route("/post-image").post(editorImage, postEditorImage);

// checked email, userName
api.route("/checked-db/:name=:value").get(getDB);

// get Vote DB

api.route("/get-vote-db").get(getVoteData);
export default api;
