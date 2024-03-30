import express from "express";
import {
  follow,
  getUserProfile,
  unfollow,
  updateUser,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/follow/:id", isAuthenticated, follow);
userRouter.post("/unfollow/:id", isAuthenticated, unfollow);
userRouter.put("/update-user", isAuthenticated, updateUser);
userRouter.get("/profile/:id", getUserProfile);

export default userRouter;
