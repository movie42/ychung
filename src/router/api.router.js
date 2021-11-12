import express from "express";
import {
  registerComments,
  deleteComment,
  getParagraph,
  getDB
} from "../controller/api.controller";
import { onlyPrivate, preUrl } from "../middleWare";

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
api
  .route("/:id([0-9a-f]{24})/notice-data")
  .all(onlyPrivate)
  .get(getParagraph);

// checked email, userName
api.route("/checked-db/:name=:value").get(getDB);

export default api;
