import { User } from "../models/index.js";

const authenticateCompany = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.user_type !== "company") {
      return res
        .status(403)
        .json({ message: "Access restricted to company users." });
    }

    // if (user.user_type !== "super_admin") {
    //   return res
    //     .status(403)
    //     .json({ message: "You are not authorised to do this operation" });
    // }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default authenticateCompany;
