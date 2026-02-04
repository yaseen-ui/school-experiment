"use strict";

export default {
  up: async (queryInterface, Sequelize) => {
    // Add a unique constraint to the Roles table for tenant_id and role_name
    await queryInterface.addConstraint("roles", {
      fields: ["tenant_id", "role_name"], // Columns to enforce uniqueness
      type: "unique",
      name: "unique_role_per_tenant", // Custom name for the constraint
    });

    // Add a unique constraint to the Courses table for tenant_id and course_name
    await queryInterface.addConstraint("courses", {
      fields: ["tenant_id", "course_name"], // Columns to enforce uniqueness
      type: "unique",
      name: "unique_course_per_tenant", // Custom name for the constraint
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the unique constraint from the Roles table
    await queryInterface.removeConstraint("roles", "unique_role_per_tenant");

    // Remove the unique constraint from the Courses table
    await queryInterface.removeConstraint(
      "courses",
      "unique_course_per_tenant"
    );
  },
};
