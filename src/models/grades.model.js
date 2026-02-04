import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Grade = sequelize.define(
    "Grade",
    {
      grade_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      tenant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      course_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      grade_name: {
        type: DataTypes.STRING,
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
      tableName: "grades",
      timestamps: false,
    }
  );

  // Define Associations
  Grade.associate = (models) => {
    Grade.belongsTo(models.Course, { foreignKey: "course_id", as: "course" });
    Grade.hasMany(models.Section, { foreignKey: "grade_id", as: "sections" });
    Grade.hasMany(models.Subject, { foreignKey: "grade_id", as: "subjects" });
  };

  return Grade;
};
