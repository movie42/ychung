import express from "express";
import {
  voteList,
  getVoteCreate,
  postVoteCreate,
} from "../controller/vote.controller";

const voteRouter = express.Router();

voteRouter.route("/").get(voteList);

// create
voteRouter.route("/create").get(getVoteCreate).post(postVoteCreate);

export default voteRouter;
