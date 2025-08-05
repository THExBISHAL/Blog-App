import Comment from "../models/comment.js";

export const newComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();

    return res.status(200).json({
      message: "Comment save successfully",
      comment,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Error while saving comment",
      error: e.message,
    });
  }
};

export const getAllComment = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });

    return res.status(200).json({
      comments,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Error while fetching comment",
      error: e.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Error while deleting comment",
      error: e.message,
    });
  }
};
