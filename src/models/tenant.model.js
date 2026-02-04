import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Tenant = sequelize.define(
    "Tenant",
    {
      tenant_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      school_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact_address: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      contact_phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contact_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin_full_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      admin_phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      admin_email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subscription_plan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      domain: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isUrl: true,
        },
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      caption: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "tenants",
      timestamps: false,
    }
  );

  return Tenant;
};
