import express from "express";
import { isAuth, authorityHandler, preUrl, view } from "../middleWare";
import {
  worshipWeeklylist,
  getCreateWorshipEditor,
  createWorshipWeekly,
  getWorshipWeeklyDetail,
  getUpdateWorshipEditor,
  updateWorshipWeekly,
  deleteWorshipWeekly
} from "../controller/worship.controller";

const worshipRouter = express.Router();

// list
worshipRouter.route("/").get(worshipWeeklylist);

// create
worshipRouter
  .route("/create-worship")
  .all(preUrl, (req, res, next) =>
    isAuth(req, res, next, authorityHandler, "master", "leader")
  )
  .get(getCreateWorshipEditor)
  .post(createWorshipWeekly);

// read
worshipRouter
  .route("/:id([0-9a-f]{24})")
  .all(preUrl, view)
  .get(getWorshipWeeklyDetail);

// update
worshipRouter
  .route("/update/:id([0-9a-f]{24})")
  .all((req, res, next) =>
    isAuth(req, res, next, authorityHandler, "master", "leader")
  )
  .get(getUpdateWorshipEditor)
  .patch(updateWorshipWeekly);

// delete
worshipRouter
  .route("/delete/:id([0-9a-f]{24})")
  .all((req, res, next) =>
    isAuth(req, res, next, authorityHandler, "master", "leader")
  )
  .delete(deleteWorshipWeekly);

export default worshipRouter;
