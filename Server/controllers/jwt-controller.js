import jwt from "jsonwebtoken";

const ACCESS_KEY =
  "a5cc94770d3d59a16cdd6eb77dbec8e52ec64377c24c5ae3657d3a451113c97d307813fdd797be6ab8f37fbf2782c6db1ca4e33bf65f542b80350b292c47df20";
const REFRESH_KEY =
  "042aceaa53dc17a969810f35e4fa2dc168f8d4e79826f2c5ff3cbbf34d3125d7d65e2cf3feb3e8215c4f6ebed3259753fc07b58c97c922b48f9342dab858f286";

export const authenticateToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return response.status(401).json({ msg: "token is missing" });
  }

  jwt.verify(token, ACCESS_KEY, (error, user) => {
    if (error) {
      return response.status(403).json({ msg: "invalid token" });
    }

    request.user = user;
    next();
  });
};
