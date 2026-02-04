import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Student = sequelize.define(
    "Student",
    {
      student_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      tenant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      // Basic Required Fields
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middle_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        allowNull: false,
      },

      // Optional Fields for Update
      aadhaar_number: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      caste_category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sub_caste: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      religion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mother_tongue: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      blood_group: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nationality: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Indian",
      },
      identification_marks: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      // Admission Details
      class_applying_for: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      medium_of_instruction: {
        type: DataTypes.STRING,
        allowNull: true,
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
      section_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "sections",
          key: "section_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      previous_school_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      previous_class_attended: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      transfer_certificate_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date_of_issue_tc: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      mode_of_transport: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // Parent/Guardian Details
      father_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      father_occupation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      father_phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      father_aadhaar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mother_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mother_occupation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mother_phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mother_aadhaar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      guardian_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      guardian_relation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      guardian_contact: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // Fee & Scholarship Details
      fee_payment_mode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bank_account_details: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      mid_day_meal_eligibility: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      // Address
      permanent_address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pincode: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // Existing fields...
      student_passport_photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mother_passport_photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      father_guardian_passport_photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      student_aadhar_copy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      parents_aadhar_copy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      caste_certificate_copy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birth_certificate_copy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tc_copy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      conduct_certificate_copy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      previous_years_marksheet_copy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      income_certificate_copy: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // Metadata
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
      tableName: "students",
      timestamps: false,
    }
  );

  // Define Associations within the associate function
  Student.associate = (models) => {
    Student.belongsTo(models.Section, {
      foreignKey: "section_id",
      as: "section",
    });

    Student.belongsTo(models.Course, {
      foreignKey: "course_id",
      as: "course",
    });

    Student.belongsTo(models.Grade, {
      foreignKey: "grade_id",
      as: "grade",
    });
  };

  return Student;
};
