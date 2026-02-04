"use strict";

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("students", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      tenant_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      // Basic Required Fields for Initial Student Creation
      first_name: { type: Sequelize.STRING, allowNull: false },
      last_name: { type: Sequelize.STRING, allowNull: false },
      date_of_birth: { type: Sequelize.DATEONLY, allowNull: false },
      gender: {
        type: Sequelize.ENUM("Male", "Female", "Other"),
        allowNull: false,
      },

      // Other Fields (Can be updated later)
      aadhaar_number: { type: Sequelize.STRING, allowNull: true, unique: true },
      caste_category: { type: Sequelize.STRING, allowNull: true },
      sub_caste: { type: Sequelize.STRING, allowNull: true },
      religion: { type: Sequelize.STRING, allowNull: true },
      mother_tongue: { type: Sequelize.STRING, allowNull: true },
      blood_group: { type: Sequelize.STRING, allowNull: true },
      nationality: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Indian",
      },
      identification_marks: { type: Sequelize.TEXT, allowNull: true },

      // Admission Details (Will be updated later)
      class_applying_for: { type: Sequelize.STRING, allowNull: true },
      medium_of_instruction: { type: Sequelize.STRING, allowNull: true },
      previous_school_name: { type: Sequelize.STRING, allowNull: true },
      previous_class_attended: { type: Sequelize.STRING, allowNull: true },
      transfer_certificate_number: { type: Sequelize.STRING, allowNull: true },
      date_of_issue_tc: { type: Sequelize.DATEONLY, allowNull: true },
      mode_of_transport: { type: Sequelize.STRING, allowNull: true },

      // Parent/Guardian Details (Will be updated later)
      father_name: { type: Sequelize.STRING, allowNull: true },
      father_phone: { type: Sequelize.STRING, allowNull: true },
      mother_name: { type: Sequelize.STRING, allowNull: true },
      mother_phone: { type: Sequelize.STRING, allowNull: true },

      // Address (Will be updated later)
      permanent_address: { type: Sequelize.TEXT, allowNull: true },
      state: { type: Sequelize.STRING, allowNull: true },
      pincode: { type: Sequelize.STRING, allowNull: true },

      // Fee & Scholarship Details
      fee_payment_mode: { type: Sequelize.STRING, allowNull: true },
      bank_account_details: { type: Sequelize.TEXT, allowNull: true },
      mid_day_meal_eligibility: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      grade_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "grades", key: "grade_id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      section_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "sections", key: "section_id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      // Metadata
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addIndex("students", ["tenant_id"]);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("students");
  },
};
