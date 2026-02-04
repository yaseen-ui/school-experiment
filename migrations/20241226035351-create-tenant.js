"use strict";

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tenants", {
      tenant_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, // UUID as default value
      },
      school_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contact_address: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      contact_phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contact_email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      admin_email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      subscription_plan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      domain: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      logo: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      caption: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tenants");
  },
};
