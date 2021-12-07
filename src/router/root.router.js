import express from "express";
import {
  home,
  getLogin,
  postLogin,
  getJoin,
  postJoin,
  logout,
  search,
  getVote,
  postVote
} from "../controller/root.controller";
import { onlyPrivate, onlyPublic } from "../middleWare";

const rootRouter = express.Router();

// home
rootRouter.route("/").get(home);

// login
rootRouter
  .route("/login")
  .all(onlyPublic)
  .get(getLogin)
  .post(postLogin);

// join
rootRouter.route("/join").all(onlyPublic).get(getJoin).post(postJoin);

// logout
rootRouter.route("/logout").all(onlyPrivate).get(logout);

// search
rootRouter.route("/search").get(search);

//vote
rootRouter.route("/vote").get(getVote).post(postVote);
export default rootRouter;
