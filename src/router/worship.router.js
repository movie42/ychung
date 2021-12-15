import express from "express";
import {
  onlyMaster,
  preUrl,
  view,
  onlyAdministrator
} from "../middleWare";
import {
  list,
  getWorshipUpload,
  postWorshipUpload,
  getWorshipDetail,
  getWorshipEdit,
  postWorshipEdit,
  worshipDelete
} from "../controller/worship.controller";

const worshipRouter = express.Router();

// list
worshipRouter.route("/").get(list);

// create
worshipRouter
  .route("/upload")
  .all(preUrl, onlyAdministrator)
  .get(getWorshipUpload)
  .post(postWorshipUpload);

// read
worshipRouter
  .route("/:id([0-9a-f]{24})")
  .all(preUrl, view)
  .get(getWorshipDetail);

// update
worshipRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(onlyAdministrator)
  .get(getWorshipEdit)
  .post(postWorshipEdit);

// delete
worshipRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(onlyMaster)
  .get(worshipDelete);

export default worshipRouter;
