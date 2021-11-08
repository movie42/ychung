import express from "express";
import {
  getNoticeData,
  getNoticeCreate,
  postNoticeCreate,
  getNoticeDetail,
  getNoticeEdit,
  postNoticeEdit,
  noticeDelete,
} from "../controller/notice.controller";
import { onlyAdministrator, onlyAdmin, view, preUrl } from "../middleWare";

const noticeRouter = express.Router();

// list
noticeRouter.route("/").get(getNoticeData);

// Create
noticeRouter
  .route("/upload")
  .all(preUrl, onlyAdministrator)
  .get(getNoticeCreate)
  .post(postNoticeCreate);

// read
noticeRouter.route("/:id([0-9a-f]{24})").all(preUrl, view).get(getNoticeDetail);

// update
noticeRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(onlyAdministrator)
  .get(getNoticeEdit)
  .post(postNoticeEdit);

// delete
noticeRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(onlyAdministrator)
  .get(noticeDelete);

export default noticeRouter;
