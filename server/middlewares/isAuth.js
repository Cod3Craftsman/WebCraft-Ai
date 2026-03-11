import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: `Token not found` });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedToken.id);
    next();
  } catch (error) {
    return res.status(500).json({ message: `isAuth middleware error , invalid token` });
  }
};


export default isAuth