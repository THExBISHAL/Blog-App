import Post from "../models/post.js";

export const createPost = async (req, res) => {
  try {
    const newPost = new Post();

    newPost.title = req.body.title;
    newPost.description = req.body.description;
    newPost.picture = req.body.picture.result.secure_url;
    newPost.username = req.body.username;
    newPost.categories = req.body.categories;
    newPost.createdDate = req.body.createdDate;

    newPost.save();

    return res.status(200).json({
      message: "Post saved successfully",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to create post",
      error: e.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  let category = req.query.category;
  let posts;

  try {
    if (category) {
      category = category.toLowerCase();
      posts = await Post.find({ categories: { $in: [category] } });
    } else {
      posts = await Post.find({});
    }

    return res.status(200).json({
      posts,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    return res.status(200).json({
      message: "Got post",
      data: post,
    });
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await Post.findByIdAndUpdate(req.params.id, { $set: req.body });

    return res.status(200).json({
      message: "Post updated successfully",
    });
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found to delete",
      });
    }

    return res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};
