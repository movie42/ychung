import express from "express";
import {
  home,
  getLogin,
  postLogin,
  getJoin,
  postJoin,
  logout,
  search,
  attendence,
  getRulesList,
  getRules,
  getCreateRules,
  postCreateRules,
  getUpdateRules,
  postUpdateRules
} from "../controller/root.controller";
import {
  onlyPrivate,
  onlyPublic,
  onlyAdministrator
} from "../middleWare";

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

// attendence
rootRouter.route("/attendence").post(attendence);

// rules
//list
rootRouter.route("/rules").get(getRulesList);
//read
rootRouter.route("/rules/:id([0-9a-f]{24})").get(getRules);
//create
rootRouter
  .route("/rules/upload")
  .all(onlyAdministrator)
  .get(getCreateRules)
  .post(postCreateRules);
//update
rootRouter
  .route("/rules/:id([0-9a-f]{24})/edit")
  .all(onlyAdministrator)
  .get(getUpdateRules)
  .post(postUpdateRules);

export default rootRouter;
