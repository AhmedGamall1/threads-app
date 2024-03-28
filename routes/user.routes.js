import express from "express";
import { follow, unfollow } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/follow/:id", isAuthenticated, follow);
userRouter.post("/unfollow/:id", isAuthenticated, unfollow);

export default userRouter;
