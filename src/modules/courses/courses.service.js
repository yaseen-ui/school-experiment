import { Course, Grade } from "../../models/index.js";

class CourseService {
  static async createCourse(data) {
    return await Course.create(data, {
      include: [{ model: Grade, as: "grades" }],
    });
  }

  static async getAllCourses(tenant_id) {
    return await Course.findAll({ where: { tenant_id } });
  }

  static async getCourseById(course_id, tenant_id) {
    return await Course.findOne({ where: { course_id, tenant_id } });
  }

  static async updateCourse(course_id, updates, tenant_id) {
    return await Course.update(updates, {
      where: { course_id, tenant_id },
    });
  }

  static async deleteCourse(course_id, tenant_id) {
    return await Course.destroy({ where: { course_id, tenant_id } });
  }
}

export default CourseService;
