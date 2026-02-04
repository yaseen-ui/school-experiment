import { Role, Tenant } from "../../models/index.js";

class RoleService {
  static async createRole(req) {
    try {
      const { role_name, permissions } = req;
      const tenant_id = req.tenant_id;

      // Validate required fields
      if (!tenant_id || !role_name || !permissions) {
        throw new Error(
          "Missing required fields: tenant_id, role_name, or permissions."
        );
      }

      // Check if the tenant exists
      const tenantExists = await Tenant.findByPk(tenant_id);
      if (!tenantExists) {
        throw new Error("Invalid tenant_id. No such tenant exists.");
      }

      // Check if the role already exists for the tenant
      const existingRole = await Role.findOne({
        where: { tenant_id, role_name },
      });
      if (existingRole) {
        throw new Error(
          `Role name '${role_name}' already exists for the tenant.`
        );
      }

      // Prepare the data for the new role
      const data = {
        tenant_id,
        role_name,
        permissions,
      };

      // Create the role
      return await Role.create(data);
    } catch (error) {
      console.error(`Error creating role: ${error.message}`);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  static async getAllRoles(req) {
    return await Role.findAll({ where: { tenant_id: req.tenant_id } });
  }

  static async getRoleById(role_id, tenant_id) {
    return await Role.findByPk(role_id, { where: { tenant_id } });
  }

  static async updateRole(role_id, data, tenant_id) {
    return await Role.update(data, {
      where: { role_id, tenant_id },
    });
  }

  static async deleteRole(role_id, tenant_id) {
    return await Role.destroy({ where: { role_id, tenant_id } });
  }
}

export default RoleService;
