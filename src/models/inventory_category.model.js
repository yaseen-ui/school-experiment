"use strict";
import { DataTypes } from "sequelize";

import { Model } from "sequelize";

export default (sequelize) => {
  class InventoryCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InventoryCategory.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "inventory_category",
    }
  );
  return InventoryCategory;
};
