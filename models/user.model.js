import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6, select: false },
  profilePic: { type: String, default: "" },
  followers: { type: [String], default: [] },
  following: { type: [String], default: [] },
  bio: { type: String, default: "" },
});

const User = mongoose.model("User", userSchema);
export default User;
