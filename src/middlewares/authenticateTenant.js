import { User } from "../models/index.js";
import { getTenantIdFromRequest } from "../utils/requestHelper.js";

export const authenticateTenant = async (req, res, next) => {
  try {
    const tenantIdFromHeader = getTenantIdFromRequest(req);
    if (!tenantIdFromHeader) {
      return res
        .status(400)
        .json({ message: "Tenant ID is required in headers." });
    }

    const user = await User.findByPk(req.user.user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.user_type !== "tenant" || user.tenant_id !== tenantIdFromHeader) {
      return res.status(403).json({
        message: "Access restricted to tenant users or invalid tenant ID.",
      });
    }

    req.tenant_id = user.tenant_id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default authenticateTenant;
