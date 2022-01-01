import express from "express";
import {
  getNoticeData,
  getNoticeCreate,
  postNoticeCreate,
  getNoticeDetail,
  getNoticeEdit,
  postNoticeEdit,
  noticeDelete
} from "../controller/notice.controller";
import { isAuth, authorityHandler, view, preUrl } from "../middleWare";

const noticeRouter = express.Router();

// list
noticeRouter.route("/").get(getNoticeData);

// Create
noticeRouter
  .route("/upload")
  .all(preUrl, (req, res, next) => isAuth(req, res, next, authorityHandler, "master", "leader"))
  .get(getNoticeCreate)
  .post(postNoticeCreate);

// read
noticeRouter.route("/:id([0-9a-f]{24})").all(preUrl, view).get(getNoticeDetail);

// update
noticeRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all((req, res, next) => isAuth(req, res, next, authorityHandler, "master", "leader"))
  .get(getNoticeEdit)
  .post(postNoticeEdit);

// delete
noticeRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all((req, res, next) => isAuth(req, res, next, authorityHandler, "master", "leader"))
  .get(noticeDelete);

export default noticeRouter;
