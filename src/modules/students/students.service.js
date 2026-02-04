import { Student, Course, Grade, Section } from "../../models/index.js";

class StudentService {
  async createStudent(data, tenant_id) {
    data.tenant_id = tenant_id;
    return await Student.create(data);
  }

  async deleteStudent(id, tenant_id) {
    const student = await Student.findOne({
      where: { id, tenant_id },
    });

    if (!student) return null;

    await Student.destroy({ where: { id, tenant_id } });
    return student;
  }

  async getStudentById(id, tenant_id) {
    return await Student.findOne({
      where: { id, tenant_id },
      include: [
        { model: Course, as: "course", attributes: ["course_id", "course_name"] }, // Fixed alias and correct column name
        { model: Grade, as: "grade", attributes: ["grade_id", "grade_name"] }, // Fixed alias and correct column name
        { model: Section, as: "section", attributes: ["section_id", "section_name"] }, // Fixed alias and correct column name
      ],
    });
  }
  
  async getAllStudents(tenant_id) {
    return await Student.findAll({
      where: { tenant_id },
      include: [
        { model: Course, as: "course", attributes: ["course_id", "course_name"] }, // Fixed alias and correct column name
        { model: Grade, as: "grade", attributes: ["grade_id", "grade_name"] }, // Fixed alias and correct column name
        { model: Section, as: "section", attributes: ["section_id", "section_name"] }, // Fixed alias and correct column name
      ],
    });
  }
  
}

export default new StudentService();
