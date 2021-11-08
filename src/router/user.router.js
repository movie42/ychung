import express from "express";
import {
  userDetail,
  getEditUser,
  postEditUser,
  getEditPassword,
  postEditPassword
} from "../controller/user.controller";
import { onlyPrivate, preUrl, photoUpload } from "../middleWare";

const userRouter = express.Router();

// userDetail
userRouter.route("/:id([0-9a-f]{24})").get(preUrl, userDetail);

// edit user profile
userRouter
  .route("/:id([0-9a-f]{24})/edit-profile")
  .all(onlyPrivate)
  .get(getEditUser)
  .post(photoUpload, postEditUser);

// edit password
userRouter
  .route("/:id([0-9a-f]{24})/edit-password")
  .all(onlyPrivate)
  .get(getEditPassword)
  .post(postEditPassword);

export default userRouter;
