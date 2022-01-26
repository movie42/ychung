import express from "express";
import { accountingData } from "../controller/administration.controller";

const administrationRouter = express.Router();

administrationRouter.route("/accounting").get(accountingData);

export default administrationRouter;
