"use strict";

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("section_subjects", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      section_id: { type: Sequelize.UUID, allowNull: false },
      subject_id: { type: Sequelize.UUID, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("section_subjects");
  },
};
