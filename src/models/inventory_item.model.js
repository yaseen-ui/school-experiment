"use strict";
import { DataTypes } from "sequelize";

import { Model } from "sequelize";
export default (sequelize) => {
  class InventoryItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InventoryItem.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      categoryId: DataTypes.UUID,
      stockAvailable: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "inventory_item",
    }
  );
  return InventoryItem;
};
