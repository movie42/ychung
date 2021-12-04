import express from "express";
import {
  getDocumentsList,
  getDocuments,
  getCreateDocuments,
  postCreateDocuments,
  getUpdateDocuments,
  postUpdateDocuments,
} from "../controller/documents.controller";
import { onlyAdministrator } from "../middleWare";

const documentsRouter = express.Router();
// rules
//list
documentsRouter.route("/documents").get(getDocumentsList);
//read
documentsRouter.route("/documents/:id([0-9a-f]{24})").get(getDocuments);
//create
documentsRouter
  .route("/documents/upload")
  .all(onlyAdministrator)
  .get(getCreateDocuments)
  .post(postCreateDocuments);
//update
documentsRouter
  .route("/documents/:id([0-9a-f]{24})/edit")
  .all(onlyAdministrator)
  .get(getUpdateDocuments)
  .post(postUpdateDocuments);

export default documentsRouter;
