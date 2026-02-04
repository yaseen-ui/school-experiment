"use strict";

import { DataTypes } from "sequelize";

import { Model } from "sequelize";
export default (sequelize) => {
  class StockAdjustment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StockAdjustment.init(
    {
      itemId: DataTypes.UUID,
      adjustmentAmount: DataTypes.INTEGER,
      reason: DataTypes.STRING,
      borrowerName: DataTypes.STRING,
      borrowerId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "stock_adjustment",
    }
  );
  return StockAdjustment;
};
