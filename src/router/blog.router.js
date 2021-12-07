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
import { onlyPrivate, preUrl, view } from "../middleWare";

const blogRouter = express.Router();

// List
blogRouter.route("/").get(blogList);

// Create
blogRouter
  .route("/upload")
  .all(preUrl, onlyPrivate)
  .get(getBlogWrite)
  .post(postBlogWrite);

// Read
blogRouter.route("/:id([0-9a-f]{24})").all(preUrl, view).get(blogDetail);

// Update
blogRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(onlyPrivate)
  .get(getBlogUpdate)
  .post(postBlogUpdate);

// Delete
blogRouter.route("/:id([0-9a-f]{24})/delete").all(onlyPrivate).get(blogDelete);

export default blogRouter;
