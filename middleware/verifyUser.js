import jwt from "jsonwebtoken";

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, config.AUTH_TOKEN);
    req.user = decoded;
   // console.log(req.user)
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  return next();
};

export default verifyToken;
