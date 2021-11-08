import express from "express";
import { registerComments, deleteComment } from "../controller/api.controller";
import { onlyPrivate, preUrl } from "../middleWare";

const api = express.Router();

api
  .route("/:id([0-9a-f]{24})/comments")
  .all(preUrl, onlyPrivate)
  .post(registerComments);
api
  .route("/:id([0-9a-f]{24})/comments/delete")
  .all(preUrl, onlyPrivate)
  .get(deleteComment);

export default api;
