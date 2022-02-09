import express from "express";
import {
  getNoticeData,
  getCreateNoticeEditor,
  postNewNoticeData,
  getNoticeDetail,
  getNoticeUpdateEditor,
  patchNoticeData,
  deleteNotice
} from "../controller/notice.controller";
import { isAuth, authorityHandler, view, preUrl } from "../middleWare";

const noticeRouter = express.Router();

// list
noticeRouter.route("/").get(getNoticeData);

// Create
noticeRouter
  .route("/create")
  .all(preUrl, (req, res, next) =>
    isAuth(req, res, next, authorityHandler, "master", "administrator")
  )
  .get(getCreateNoticeEditor)
  .post(postNewNoticeData);

// read
noticeRouter.route("/:id([0-9a-f]{24})").all(preUrl, view).get(getNoticeDetail);

// delete
noticeRouter
  .route("/delete/:id([0-9a-f]{24})")
  .all((req, res, next) =>
    isAuth(req, res, next, authorityHandler, "master", "administrator")
  )
  .delete(deleteNotice);

// update
noticeRouter
  .route("/update/:id([0-9a-f]{24})")
  .all((req, res, next) =>
    isAuth(req, res, next, authorityHandler, "master", "administrator")
  )
  .get(getNoticeUpdateEditor)
  .patch(patchNoticeData);

export default noticeRouter;
