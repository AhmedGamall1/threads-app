import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("auth middleware - isAuthenticated error:", error.message);
  }
};
