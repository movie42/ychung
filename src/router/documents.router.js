import express from "express";
import {
  getLandingPage,
  getRulesList,
  getManualsList,
  getApplicationsList,
  getCreateDocuments,
  postCreateDocuments,
  getDocuments,
  getUpdateDocuments,
  postUpdateDocuments,
  deleteDocuments
} from "../controller/documents.controller";

import { onlyMaster } from "../middleWare";

const documentsRouter = express.Router();

// documents landing page

// list
documentsRouter.route("/").get(getLandingPage);
// create

// documents rules
// list
documentsRouter.route("/rules").get(getRulesList);

// create
documentsRouter
  .route("/rules/upload")
  .all(onlyMaster)
  .get(getCreateDocuments)
  .post(postCreateDocuments);

// read
documentsRouter.route("/rules/:id([0-9a-f]{24})").get(getDocuments);

// update
documentsRouter
  .route("/rules/:id([0-9a-f]{24})/edit")
  .all(onlyMaster)
  .get(getUpdateDocuments)
  .post(postUpdateDocuments);

// delete
documentsRouter
  .route("/rules/:id([0-9a-f]{24})/delete")
  .all(onlyMaster)
  .get(deleteDocuments);

// documents manual
// list
documentsRouter.route("/manuals").get(getManualsList);

// create
documentsRouter
  .route("/manuals/upload")
  .all(onlyMaster)
  .get(getCreateDocuments)
  .post(postCreateDocuments);

// read
documentsRouter.route("/manuals/:id([0-9a-f]{24})").get(getDocuments);

// update
documentsRouter
  .route("/manuals/:id([0-9a-f]{24})/edit")
  .all(onlyMaster)
  .get(getUpdateDocuments)
  .post(postUpdateDocuments);

// delete
documentsRouter
  .route("/manuals/:id([0-9a-f]{24})/delete")
  .all(onlyMaster)
  .get(deleteDocuments);

// documents application
// list
documentsRouter.route("/applications").get(getApplicationsList);

// create
documentsRouter
  .route("/applications/upload")
  .all(onlyMaster)
  .get(getCreateDocuments)
  .post(postCreateDocuments);

// read
documentsRouter
  .route("/applications/:id([0-9a-f]{24})")
  .get(getDocuments);

// update
documentsRouter
  .route("/applications/:id([0-9a-f]{24})/edit")
  .all(onlyMaster)
  .get(getUpdateDocuments)
  .post(postUpdateDocuments);

// delete
documentsRouter
  .route("/applications/:id([0-9a-f]{24})/delete")
  .all(onlyMaster)
  .get(deleteDocuments);

export default documentsRouter;
