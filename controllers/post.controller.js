import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    const { text, img } = req.body;
    const { user } = req;
    if (!text && !img) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const maxLength = 500;
    if (text.length > maxLength) {
      return res
        .status(400)
        .json({ error: `Text must be less than ${maxLength} characters` });
    }

    const newPost = new Post({ postedBy: user._id.toString(), text, img });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("post controller - createPost error:", error.message);
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("post controller - getPost error:", error.message);
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Unauthorized To Remove The Post" });
    }

    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("post controller - deletePost error:", error.message);
  }
};
