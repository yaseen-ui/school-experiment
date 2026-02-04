import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Subject = sequelize.define(
    "Subject",
    {
      subject_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      tenant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      subject_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      course_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "courses",
          key: "course_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      is_common: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "subjects",
      timestamps: true,
    }
  );

  // Define Associations within the associate function
  Subject.associate = (models) => {
    Subject.belongsTo(models.Course, {
      foreignKey: "course_id",
      as: "course",
    });
  };

  return Subject;
};
