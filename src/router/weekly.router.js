import express from "express";
import { onlyAdmin, preUrl, view } from "../middleWare";
import {
  list,
  getWeeklyUpload,
  postWeeklyUpload,
  getWeeklyDetail,
  getWeeklyEdit,
  postWeeklyEdit,
  weeklyDelete,
} from "../controller/weekly.controller";

const weeklyRouter = express.Router();

// list
weeklyRouter.route("/").get(list);

// create
weeklyRouter
  .route("/upload")
  .all(preUrl, onlyAdmin)
  .get(getWeeklyUpload)
  .post(postWeeklyUpload);

// read
weeklyRouter.route("/:id([0-9a-f]{24})").all(preUrl, view).get(getWeeklyDetail);

// update
weeklyRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(onlyAdmin)
  .get(getWeeklyEdit)
  .post(postWeeklyEdit);

// delete
weeklyRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(onlyAdmin)
  .get(weeklyDelete);

export default weeklyRouter;
