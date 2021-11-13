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
  postUpdateRules,
} from "../controller/root.controller";
import { onlyPrivate, onlyPublic, photoUpload } from "../middleWare";

const rootRouter = express.Router();

// home
rootRouter.route("/").get(home);

// login
rootRouter.route("/login").all(onlyPublic).get(getLogin).post(postLogin);

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
rootRouter.route("/rules/:id").get(getRules);
//create
rootRouter.route("/rules/upload").get(getCreateRules).post(postCreateRules);
//update
rootRouter.route("/rules/:id/edit").get(getUpdateRules).post(postUpdateRules);

export default rootRouter;
