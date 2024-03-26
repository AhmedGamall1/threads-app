// PACKAGES IMPORT
import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

// FILES IMPORT
import { connectToMongoDB } from "./utils/db/connectDB.js";

// DEFINING VARIABLES
const app = express();
const port = process.env.PORT || 5000;

// STARTING SERVER
app.listen(port, () => {
  connectToMongoDB();
  console.log(`server is running on port ${port}`);
});
