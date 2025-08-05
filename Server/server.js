import express from "express";
import mongoose from "mongoose";
import Router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);

mongoose
  .connect("mongodb+srv://ABCD1234:ABCD1234@blog-app.h9fltqg.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("Error while connecting database", error));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
