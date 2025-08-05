import express from "express";
import { loginUser, signupUser } from "../controllers/user-controller.js";
import { uploadImage, getImage } from "../controllers/image-controller.js";
import upload from "../utils/upload.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/post-controller.js";
import { authenticateToken } from "../controllers/jwt-controller.js";
import {
  deleteComment,
  getAllComment,
  newComment,
} from "../controllers/comment-controller.js";
import { contact } from "../controllers/contact-controller.js";

const Router = express.Router();

Router.post("/signup", signupUser);
Router.post("/login", loginUser);
Router.post("/file/upload", upload.single("file"), uploadImage);
Router.get("file/:filename", getImage);
Router.post("/create", authenticateToken, createPost);
Router.get("/posts", authenticateToken, getAllPosts);
Router.get("/post/:id", authenticateToken, getPost);
Router.put("/update/:id", authenticateToken, updatePost);
Router.delete("/delete/:id", authenticateToken, deletePost);
Router.post("/comment/new", authenticateToken, newComment);
Router.get("/comments/:id", authenticateToken, getAllComment);
Router.delete("/comment/delete/:id", authenticateToken, deleteComment);
Router.post("/contact/new", authenticateToken, contact);

export default Router;
