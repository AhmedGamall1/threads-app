// PACKAGES IMPORT
import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";

// FILES IMPORT
import { connectToMongoDB } from "./utils/db/connectDB.js";
import userRoutes from "./routes/user.routes.js";

// DEFINING VARIABLES
const app = express();
const port = process.env.PORT || 5000;

// MIDDLEWARES
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); // for parsing cookies

// ROUTES
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("server is running");
});

// STARTING SERVER
app.listen(port, () => {
  connectToMongoDB();
  console.log(`server is running on port ${port}`);
});
