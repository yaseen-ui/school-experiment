import { Subject } from "../../models/index.js";

class SubjectsService {
  async createSubject(data, tenantId) {
    return await Subject.create({ ...data, tenant_id: tenantId });
  }

  async getSubjects(tenantId, course_id) {
    if (course_id) {
      return await Subject.findAll({
        where: { tenant_id: tenantId, course_id },
      });
    }
    return await Subject.findAll({ where: { tenant_id: tenantId } });
  }

  async getSubjectById(id, tenantId) {
    const subject = await Subject.findOne({
      where: { subject_id: id, tenant_id: tenantId },
    });

    if (!subject) {
      throw new Error("Subject not found");
    }

    return subject;
  }

  async getSubjectsByCourse(courseId, tenantId) {
    const subjects = await Subject.findAll({
      where: {
        course_id: courseId,
        tenant_id: tenantId,
      },
    });

    if (!subjects || subjects.length === 0) {
      throw new Error("No subjects found for this course");
    }

    return subjects;
  }

  async updateSubject(id, data, tenantId) {
    const subject = await Subject.findOne({
      where: { subject_id: id, tenant_id: tenantId },
    });
    if (!subject) throw new Error("Subject not found");
    return await subject.update(data);
  }

  async deleteSubject(id, tenantId) {
    const subject = await Subject.findOne({
      where: { subject_id: id, tenant_id: tenantId },
    });
    if (!subject) throw new Error("Subject not found");
    return await subject.destroy();
  }

  async getCommonSubjects(tenantId) {
    return await Subject.findAll({
      where: {
        tenant_id: tenantId,
        is_common: true,
      },
    });
  }
}

export default new SubjectsService();
