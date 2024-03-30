import User from "../models/user.model.js";

export const follow = async (req, res) => {
  try {
    // GET THE CURRENT USER AND THE USER TO FOLLOW
    const currentUser = req.user;
    const userToFollowId = req.params.id;

    // CHECK THAT THE USERS ARE VAILD IN DB
    const userToFollow = await User.findById(userToFollowId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // CHECK THE TWO USERS ARE DIFFERENT
    if (currentUser._id.toString() === userToFollowId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    // CHECK THAT THE USER IS NOT ALREADY FOLLOWING THE OTHER USER
    if (currentUser.following.includes(userToFollowId)) {
      return res
        .status(400)
        .json({ message: "You are already following this user" });
    }

    // UPDATE THE FOLLOWING FIELD IN THE TWO USERS MODEL
    currentUser.following.push(userToFollowId);
    userToFollow.followers.push(currentUser._id);
    await Promise.all([currentUser.save(), userToFollow.save()]);

    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("user controller - follow error:", error.message);
  }
};

export const unfollow = async (req, res) => {
  try {
    // GET THE CURRENT USER AND THE USER TO UNFOLLOW
    const currentUser = req.user;
    const userToUnfollowId = req.params.id;

    // CHECK THAT THE USERS ARE VAILD IN DB
    const userToUnfollow = await User.findById(userToUnfollowId);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // CHECK THE TWO USERS ARE DIFFERENT
    if (currentUser._id.toString() === userToUnfollowId) {
      return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

    // CHECK THAT THE USER IS ALREADY FOLLOWING THE OTHER USER
    if (!currentUser.following.includes(userToUnfollowId)) {
      return res
        .status(400)
        .json({ message: "You are not following this user" });
    }

    // UPDATE THE FOLLOWING FIELD IN THE TWO USERS MODEL
    currentUser.following = currentUser.following.filter(
      (id) => id !== userToUnfollowId,
    );

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id !== currentUser._id.toString(),
    );

    await Promise.all([currentUser.save(), userToUnfollow.save()]);

    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("user controller - unfollow error:", error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { password, name, username, email, profilePic, bio } = req.body;
    const user = req.user;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("user controller - updateUser error:", error.message);
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("user controller - getUserProfile error:", error.message);
  }
};
