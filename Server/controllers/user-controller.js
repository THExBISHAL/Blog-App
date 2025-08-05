import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Token from "../models/token.js";

const ACCESS_KEY =
  "a5cc94770d3d59a16cdd6eb77dbec8e52ec64377c24c5ae3657d3a451113c97d307813fdd797be6ab8f37fbf2782c6db1ca4e33bf65f542b80350b292c47df20";

const REFRESH_KEY =
  "042aceaa53dc17a969810f35e4fa2dc168f8d4e79826f2c5ff3cbbf34d3125d7d65e2cf3feb3e8215c4f6ebed3259753fc07b58c97c922b48f9342dab858f286";

export const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "Account created successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({
      message: "User does not exist",
    });
  }

  try {
    let match = await bcrypt.compare(req.body.password, user.password);

    if (match) {
      const accessToken = jwt.sign(user.toJSON(), ACCESS_KEY, {
        expiresIn: "15m",
      });
      const refrestToken = jwt.sign(user.toJSON(), REFRESH_KEY);

      const newToken = new Token({ token: refrestToken });

      await newToken.save();

      return res.status(200).json({
        accessToken,
        refrestToken,
        name: user.username,
        message: "Login Successful",
      });
    } else {
      return res.status(400).json({ message: "Invalid password" });
    }
  } catch (e) {
    return res.status(500).json({
      message: "Error while login",
    });
  }
};
