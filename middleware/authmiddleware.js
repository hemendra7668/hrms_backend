import jwt from "jsonwebtoken";
import User from "../models/user.js"; // or correct model import

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, error: "Token not provided" });
    }

    const token = authHeader.split(" ")[1];

    // Decode token
    const decoded = jwt.verify(token, process.env.TOKEN_JWT);
    if (!decoded) {
      return res.status(401).json({ success: false, error: "Token not valid" });
    }

    // Find user by decoded _id
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not registered" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("VerifyUser Middleware Error:", error);
    return res.status(500).json({ success: false, error: "Server error during token verification" });
  }
};
const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, error: "Admin access required" });
  }
  next();
};

export default verifyUser;
