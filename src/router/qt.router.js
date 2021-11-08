import express from "express";
import {
  qtList,
  getQtWrite,
  postQtWrite,
  qtDetail,
  getQtUpdate,
  postQtUpdate,
  qtDelete,
} from "../controller/qt.controller";
import { onlyPrivate, preUrl, view } from "../middleWare";

const qtRouter = express.Router();

// List
qtRouter.route("/").get(qtList);

// Create
qtRouter
  .route("/write")
  .all(preUrl, onlyPrivate)
  .get(getQtWrite)
  .post(postQtWrite);

// Read
qtRouter.route("/:id([0-9a-f]{24})").all(preUrl, view).get(qtDetail);

// Update
qtRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(onlyPrivate)
  .get(getQtUpdate)
  .post(postQtUpdate);

// Delete
qtRouter.route("/:id([0-9a-f]{24})/delete").all(onlyPrivate).get(qtDelete);

export default qtRouter;
