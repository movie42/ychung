import express from "express";
import {
  voteList,
  getVoteCreate,
  postVoteCreate,
} from "../controller/vote.controller";
import { onlyMaster } from "../middleWare";

const voteRouter = express.Router();

voteRouter.route("/").all(onlyMaster).get(voteList);

// create
voteRouter.route("/create").get(getVoteCreate).post(postVoteCreate);

export default voteRouter;
