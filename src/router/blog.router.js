import express from "express";
import {
  blogList,
  getBlogWrite,
  postBlogWrite,
  blogDetail,
  getBlogUpdate,
  postBlogUpdate,
  blogDelete,
} from "../controller/blog.controller";
import {
  onlyPrivate,
  preUrl,
  view,
  authorityHandler,
  isAuth,
} from "../middleWare";

const blogRouter = express.Router();

// List
blogRouter.route("/").get(blogList);

// Create
blogRouter
  .route("/create")
  .all(preUrl, (req, res, next) =>
    isAuth(
      req,
      res,
      next,
      authorityHandler,
      "master",
      "blogger",
      "leader",
      "administrator",
    ),
  )
  .get(getBlogWrite)
  .post(postBlogWrite);

// Read
blogRouter.route("/:id([0-9a-f]{24})").all(preUrl, view).get(blogDetail);

// Update
blogRouter
  .route("/update/:id([0-9a-f]{24})")
  .all(onlyPrivate, preUrl, (req, res, next) =>
    isAuth(
      req,
      res,
      next,
      authorityHandler,
      "master",
      "blogger",
      "leader",
      "administrator",
    ),
  )
  .get(getBlogUpdate)
  .patch(postBlogUpdate);

// Delete
blogRouter
  .route("/delete/:id([0-9a-f]{24})")
  .all(onlyPrivate, preUrl, (req, res, next) =>
    isAuth(
      req,
      res,
      next,
      authorityHandler,
      "master",
      "blogger",
      "leader",
      "administrator",
    ),
  )
  .delete(blogDelete);

export default blogRouter;
