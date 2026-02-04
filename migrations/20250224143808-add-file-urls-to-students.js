export default {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn("students", "student_passport_photo", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("students", "mother_passport_photo", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("students", "guardian_passport_photo", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("students", "father_passport_photo", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("students", "student_aadhar_copy", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("students", "parents_aadhar_copy", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("students", "caste_certificate_copy", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("students", "birth_certificate_copy", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("students", "tc_copy", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("students", "conduct_certificate_copy", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("students", "previous_years_marksheet_copy", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("students", "income_certificate_copy", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("students", "student_passport_photo");
    await queryInterface.removeColumn("students", "mother_passport_photo");
    await queryInterface.removeColumn("students", "father_passport_photo");
    await queryInterface.removeColumn("students", "guardian_passport_photo");
    await queryInterface.removeColumn("students", "student_aadhar_copy");
    await queryInterface.removeColumn("students", "parents_aadhar_copy");
    await queryInterface.removeColumn("students", "caste_certificate_copy");
    await queryInterface.removeColumn("students", "birth_certificate_copy");
    await queryInterface.removeColumn("students", "tc_copy");
    await queryInterface.removeColumn("students", "conduct_certificate_copy");
    await queryInterface.removeColumn("students", "previous_years_marksheet_copy");
    await queryInterface.removeColumn("students", "income_certificate_copy");
  },
};
