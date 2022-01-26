import express from "express";
import {
  accountingMainView,
  postAccountingValue,
} from "../controller/administration.controller";

const administrationRouter = express.Router();

// 테스트 끝나면 auth validation function 반드시 추가하기
administrationRouter
  .route("/accounting")
  .get(accountingMainView)
  .post(postAccountingValue);

export default administrationRouter;
