import { DataTypes } from "sequelize";

export default (sequelize) => {
  const InventoryCategory = sequelize.define(
    "InventoryCategory",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      tenant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "inventory_category",
      timestamps: true,
    }
  );

  const InventoryItem = sequelize.define(
    "InventoryItem",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      tenant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      stockAvailable: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "inventory_item",
      timestamps: true,
    }
  );

  const StockAdjustment = sequelize.define(
    "StockAdjustment",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      tenant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      itemId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      adjustmentAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      borrowerName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      borrowerId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "stock_adjustment",
      timestamps: true,
    }
  );

  // Define Associations within the associate function
  InventoryCategory.associate = (models) => {
    InventoryCategory.hasMany(models.InventoryItem, {
      foreignKey: "categoryId",
      as: "items",
    });
  };

  InventoryItem.associate = (models) => {
    InventoryItem.belongsTo(models.InventoryCategory, {
      foreignKey: "categoryId",
      as: "category",
    });
    InventoryItem.hasMany(models.StockAdjustment, {
      foreignKey: "itemId",
      as: "adjustments",
    });
  };

  StockAdjustment.associate = (models) => {
    StockAdjustment.belongsTo(models.InventoryItem, {
      foreignKey: "itemId",
      as: "item",
    });
  };

  return { InventoryCategory, InventoryItem, StockAdjustment };
};
