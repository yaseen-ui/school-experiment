import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import { TokenBlacklist } from "../models/index.js";
import { Op } from "sequelize";

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from `Authorization: Bearer <token>`
  if (!token) {
    return res
      .status(401)
      .json({ status: "fail", message: "Unauthorized: No token provided." });
  }

  try {
    // Check if token is blacklisted
    const blacklistedToken = await TokenBlacklist.findOne({
      where: { token },
    });

    if (blacklistedToken) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized: Token has expired. Please log in again.",
      });
    }

    // Verify the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );

    if (!decoded.user_id || !decoded.user_type) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid token: Missing required fields.",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    logger.error(error);
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized: Invalid or expired token.",
    });
  }
};

// Cleanup expired tokens periodically
const cleanupExpiredTokens = async () => {
  try {
    await TokenBlacklist.destroy({
      where: {
        expiredAt: { [Op.lt]: new Date() }, // Delete expired tokens
      },
    });
    console.log("✅ Expired tokens cleaned up.");
  } catch (error) {
    logger.error("❌ Error while cleaning up tokens:", error);
  }
};

// Run cleanup every 24 hours
setInterval(cleanupExpiredTokens, 24 * 60 * 60 * 1000);

export default authenticate;
