import { User } from "../../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
class AuthService {
  static async login(email, password) {
    try {
      const user = await User.scope("withPassword").findOne({
        where: { email },
      });
      if (!user) {
        throw new Error("Invalid email or password.");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid email or password.");
      }

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
      }

      const userInfo = {
        user_id: user.user_id,
        user_type: user.user_type,
        tenant_id: user.tenant_id,
        role: user.role,
      };

      const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
        expiresIn: "24400h", // Token expiration time
      });

      const sanitizedUser = {
        user_id: user.user_id,
        email: user.email,
        user_type: user.user_type,
        tenant_id: user.tenant_id,
        role: user.role,
      };

      return { token, user: sanitizedUser };
    } catch (error) {
      console.error("Error during login:", error.message);
      throw error;
    }
  }
}

export default AuthService;
