import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Course = sequelize.define(
    "Course",
    {
      course_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      tenant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      course_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      course_description: {
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
      tableName: "courses",
      timestamps: false,
    }
  );
  Course.associate = (models) => {
    Course.hasMany(models.Grade, { foreignKey: "course_id", as: "grades" });
    Course.hasMany(models.Subject, { foreignKey: "course_id", as: "subjects" });
    Course.hasMany(models.Student, { foreignKey: "course_id", as: "students" }); // Add this line
  };
  

  return Course;
};
