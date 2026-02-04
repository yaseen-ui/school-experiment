import { Tenant } from "../../models/index.js";

class TenantService {
  static async createTenant(data) {
    // Automatically generate `tenant_id`
    const { tenant_id, ...otherData } = data; // Ignore tenant_id if provided by request
    return await Tenant.create(otherData);
  }

  static async getAllTenants() {
    return await Tenant.findAll();
  }

  static async getTenantById(tenantId) {
    return await Tenant.findByPk(tenantId);
  }

  static async updateTenant(tenantId, data) {
    return await Tenant.update(data, { where: { tenant_id: tenantId } });
  }

  static async deleteTenant(tenantId) {
    return await Tenant.destroy({ where: { tenant_id: tenantId } });
  }

  static getTenantByDomain = async (domain) => {
    try {
      return await Tenant.findOne({
        where: { domain },
      });
    } catch (error) {
      console.log(error);
      throw new Error("Database error while fetching tenant details");
    }
  };
}

export default TenantService;
