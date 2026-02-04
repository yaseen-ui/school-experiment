import { Grade, Course } from "../../models/index.js";

class GradesService {
  async createGrade(data, tenantId) {
    if (!data.course_id) {
      throw new Error("course_id is required to create a grade.");
    }

    const duplicate = await Grade.findOne({
      where: {
        course_id: data.course_id,
        grade_name: data.grade_name,
        tenant_id: tenantId,
      },
    });

    if (duplicate) {
      const course = await Course.findOne({
        where: { course_id: data.course_id },
        attributes: ["course_name"],
      });

      throw new Error(
        `Grade with the name '${
          data.grade_name
        }' already exists for the course '${
          course ? course.course_name : "Unknown Course"
        }'.`
      );
    }

    const newGrade = await Grade.create({ ...data, tenant_id: tenantId });

    const createdGrade = await Grade.findOne({
      where: { grade_id: newGrade.grade_id },
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["course_name"],
        },
      ],
    });

    return {
      ...createdGrade.toJSON(),
      course_name: createdGrade.course ? createdGrade.course.course_name : null,
    };
  }

  async getGrades(tenant_id, course_id) {
    const whereClause = { tenant_id };
    if (course_id) {
      whereClause.course_id = course_id;
    }

    const grades = await Grade.findAll({
      where: whereClause,
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["course_name"],
        },
      ],
    });

    return grades.map((grade) => {
      const gradeJSON = grade.toJSON();
      gradeJSON.course_name = grade.course ? grade.course.course_name : null;
      return gradeJSON;
    });
  }

  async updateGrade(gradeId, data, tenantId) {
    const grade = await Grade.findOne({
      where: { grade_id: gradeId, tenant_id: tenantId },
    });

    if (!grade) throw new Error("Grade not found or unauthorized");

    if (data.grade_name && data.grade_name !== grade.grade_name) {
      const duplicate = await Grade.findOne({
        where: {
          course_id: grade.course_id,
          grade_name: data.grade_name,
          tenant_id: tenantId,
        },
      });

      if (duplicate) {
        throw new Error(
          "Grade with the same name already exists for this course."
        );
      }
    }

    await grade.update(data);

    const updatedGrade = await Grade.findOne({
      where: { grade_id: gradeId },
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["course_name"],
        },
      ],
    });

    return {
      ...updatedGrade.toJSON(),
      course_name: updatedGrade.course ? updatedGrade.course.course_name : null,
    };
  }

  async deleteGrade(gradeId, tenant_id) {
    const grade = await Grade.findOne({
      where: { grade_id: gradeId, tenant_id },
    });

    if (!grade) throw new Error("Grade not found or unauthorized");

    return await grade.destroy();
  }

  async getGradeById(gradeId, tenant_id) {
    const grade = await Grade.findOne({
      where: { grade_id: gradeId, tenant_id },
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["course_name"],
        },
      ],
    });

    if (!grade) {
      throw new Error("Grade not found or unauthorized");
    }

    return {
      ...grade.toJSON(),
      course_name: grade.course ? grade.course.course_name : null,
    };
  }
}

export default new GradesService();
