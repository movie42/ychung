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
  deleteDocuments,
} from "../controller/documents.controller";

import { isAuth, authorityHandler } from "../middleWare";

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
  .route("/rules/create")
  .all((req, res, next) =>
    isAuth(req, res, next, authorityHandler, "master", "leader"),
  )
  .get(getCreateDocuments)
  .post(postCreateDocuments);

// read
documentsRouter.route("/rules/:id([0-9a-f]{24})").get(getDocuments);

// update
documentsRouter
  .route("/rules/update/:id([0-9a-f]{24})")
  .all((req, res, next) =>
    isAuth(req, res, next, authorityHandler, "master", "leader"),
  )
  .get(getUpdateDocuments)
  .patch(postUpdateDocuments);

// delete
documentsRouter
  .route("/rules/delete/:id([0-9a-f]{24})")
  .all((req, res, next) =>
    isAuth(req, res, next, authorityHandler, "master", "leader"),
  )
  .delete(deleteDocuments);

// documents manual
// list
documentsRouter.route("/manuals").get(getManualsList);

// create
documentsRouter
  .route("/manuals/create")
  .all((req, res, next) =>
    isAuth(req, res, next, authorityHandler, "master", "leader"),
  )
  .get(getCreateDocuments)
  .post(postCreateDocuments);

// read
documentsRouter.route("/manuals/:id([0-9a-f]{24})").get(getDocuments);

// update
documentsRouter
  .route("/manuals/update/:id([0-9a-f]{24})")
  .all((req, res, next) =>
    isAuth(req, res, next, authorityHandler, "master", "leader"),
  )
  .get(getUpdateDocuments)
  .patch(postUpdateDocuments);

// delete
documentsRouter
  .route("/manuals/delete/:id([0-9a-f]{24})")
  .all((req, res, next) =>
    isAuth(req, res, next, authorityHandler, "master", "leader"),
  )
  .delete(deleteDocuments);

// documents application
// list
documentsRouter.route("/applications").get(getApplicationsList);

// create
documentsRouter
  .route("/applications/create")
  .all((req, res, next) =>
    isAuth(req, res, next, authorityHandler, "master", "leader"),
  )
  .get(getCreateDocuments)
  .post(postCreateDocuments);

// read
documentsRouter.route("/applications/:id([0-9a-f]{24})").get(getDocuments);

// update
documentsRouter
  .route("/applications/update/:id([0-9a-f]{24})")
  .all((req, res, next) =>
    isAuth(req, res, next, authorityHandler, "master", "leader"),
  )
  .get(getUpdateDocuments)
  .patch(postUpdateDocuments);

// delete
documentsRouter
  .route("/applications/delete/:id([0-9a-f]{24})")
  .all((req, res, next) =>
    isAuth(req, res, next, authorityHandler, "master", "leader"),
  )
  .delete(deleteDocuments);

export default documentsRouter;
