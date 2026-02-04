import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Section = sequelize.define(
    "Section",
    {
      section_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      tenant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      grade_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "grades",
          key: "grade_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      section_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 60, 
      },
      occupied_seats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, 
      },
    },
    {
      tableName: "sections",
      timestamps: false,
    }
  );

  // Define Associations within the associate function
  Section.associate = (models) => {
    Section.belongsTo(models.Grade, { foreignKey: "grade_id", as: "grade" });
    Section.hasMany(models.Student, {
      foreignKey: "section_id",
      as: "students",
    });
  };

  return Section;
};
