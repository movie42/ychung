import express from "express";
import {
  home,
  getLogin,
  postLogin,
  getJoin,
  postJoin,
  logout,
  search,
  attendence
} from "../controller/root.controller";
import { onlyPrivate, onlyPublic, photoUpload } from "../middleWare";

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
rootRouter
  .route("/join")
  .all(onlyPublic)
  .get(getJoin)
  .post(photoUpload, postJoin);

// logout
rootRouter.route("/logout").all(onlyPrivate).get(logout);

// search
rootRouter.route("/search").get(search);

// attendence
rootRouter.route("/attendence").post(attendence);

export default rootRouter;
