// PACKAGES IMPORT
import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";

// FILES IMPORT
import { connectToMongoDB } from "./utils/db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

// DEFINING VARIABLES
const app = express();
const port = process.env.PORT || 5000;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("server is running");
});

// STARTING SERVER
app.listen(port, () => {
  connectToMongoDB();
  console.log(`server is running on port ${port}`);
});
