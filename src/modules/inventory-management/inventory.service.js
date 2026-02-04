import {
  InventoryCategory,
  InventoryItem,
  StockAdjustment,
} from "../../models/index.js";

export const createCategory = async (data, tenantId) => {
  return await InventoryCategory.create({ ...data, tenant_id: tenantId });
};

export const getCategories = async (tenantId) => {
  return await InventoryCategory.findAll({
    where: { tenant_id: tenantId },
  });
};

export const createItem = async (data, tenantId) => {
  const category = await InventoryCategory.findOne({
    where: { id: data.categoryId, tenant_id: tenantId },
  });
  if (!category) throw new Error("Invalid category for this tenant");

  return await InventoryItem.create({ ...data, tenant_id: tenantId });
};

export const getItems = async (tenantId) => {
  return await InventoryItem.findAll({
    where: { tenant_id: tenantId },
    include: [{ model: InventoryCategory }],
  });
};

export const adjustStock = async (itemId, data, tenantId) => {
  const item = await InventoryItem.findOne({
    where: { id: itemId, tenant_id: tenantId },
  });
  if (!item) throw new Error("Item not found for this tenant");

  const newStock = item.stockAvailable + data.adjustmentAmount;
  if (newStock < 0) throw new Error("Insufficient stock");

  await item.update({ stockAvailable: newStock });
  return await StockAdjustment.create({ ...data, itemId, tenant_id: tenantId });
};
