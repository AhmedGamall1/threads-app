import express from "express";
import {
  createPost,
  deletePost,
  getPost,
} from "../controllers/post.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const postRouter = express.Router();

postRouter.post("/create", isAuthenticated, createPost);
postRouter.get("/:id", getPost);
postRouter.delete("/delete/:id", isAuthenticated, deletePost);

export default postRouter;
