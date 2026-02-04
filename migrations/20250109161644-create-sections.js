"use strict";

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sections", {
      section_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      tenant_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      grade_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "grades",
          key: "grade_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      section_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("sections");
  },
};
