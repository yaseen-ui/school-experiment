import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Role = sequelize.define(
    "Role",
    {
      role_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      tenant_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "tenants", // Ensure "tenants" model exists
          key: "tenant_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      role_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      permissions: {
        type: DataTypes.JSON,
        allowNull: false,
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
      tableName: "roles",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["tenant_id", "role_name"], // Composite unique constraint
        },
      ],
    }
  );

  // Define Associations within the associate function
  Role.associate = (models) => {
    Role.hasMany(models.User, { foreignKey: "role_id", as: "users" });
  };

  // Hook to enforce tenant-level constraints dynamically
  Role.addHook("beforeFind", (options) => {
    if (!options.where) {
      options.where = {};
    }

    if (options.tenant_id) {
      options.where.tenant_id = options.tenant_id;
    }
  });

  return Role;
};
