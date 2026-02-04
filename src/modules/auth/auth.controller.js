import AuthService from "./auth.service.js";
import responseHandler from "./../../utils/responseHandler.js";
import { TokenBlacklist } from "../../models/index.js";

class AuthController {
  /**
   * Login Functionality
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const { token, user } = await AuthService.login(email, password);
      return responseHandler(
        res,
        "success",
        { token, user },
        "Login successful."
      );
    } catch (error) {
      return responseHandler(res, "fail", null, error.message);
    }
  }

  /**
   * Logout Functionality - Blacklists JWT Token
   */
  static async logout(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return responseHandler(res, "fail", null, "No token provided.");
      }
      console.log("came till logout method", token);
      // Add token to blacklist
      await TokenBlacklist.create({
        token,
        expired_at: new Date(), // Store the blacklist entry with an expiration date
      });

      return responseHandler(res, "success", null, "Logout successful.");
    } catch (error) {
      console.log(error);
      return responseHandler(res, "fail", null, "Error logging out.");
    }
  }
}

export default AuthController;
