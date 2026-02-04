import { Section, Grade } from "../../models/index.js";

class SectionsService {
  async createSection(data, tenantId) {
    if (!data.grade_id) {
      throw new Error("grade_id is required to create a section.");
    }

    const duplicate = await Section.findOne({
      where: {
        grade_id: data.grade_id,
        section_name: data.section_name,
        tenant_id: tenantId,
      },
    });

    if (duplicate) {
      // Fetch grade details to provide a meaningful error message
      const grade = await Grade.findOne({
        where: { grade_id: data.grade_id },
        attributes: ["grade_name"],
      });

      throw new Error(
        `Section with the name '${
          data.section_name
        }' already exists for grade '${
          grade ? grade.grade_name : "Unknown Grade"
        }'.`
      );
    }

    // Create the section
    const newSection = await Section.create({ ...data, tenant_id: tenantId });

    // Fetch the newly created section with grade details
    const createdSection = await Section.findOne({
      where: { section_id: newSection.section_id },
      include: [
        {
          model: Grade,
          as: "grade",
          attributes: ["grade_name"],
        },
      ],
    });

    return {
      ...createdSection.toJSON(),
      grade_name: createdSection.grade ? createdSection.grade.grade_name : null,
    };
  }

  async getSections(tenantId, grade_id) {
    // Build query conditions
    const whereClause = { tenant_id: tenantId };
    if (grade_id) {
      whereClause.grade_id = grade_id;
    }

    // Fetch sections along with grade details
    const sections = await Section.findAll({
      where: whereClause,
      include: [
        {
          model: Grade,
          as: "grade",
          attributes: ["grade_name"],
        },
      ],
    });

    return sections.map((section) => {
      const sectionJSON = section.toJSON();
      sectionJSON.grade_name = section.grade ? section.grade.grade_name : null;
      return sectionJSON;
    });
  }

  async getSectionById(sectionId, tenantId) {
    const section = await Section.findOne({
      where: { section_id: sectionId, tenant_id: tenantId },
      include: [
        {
          model: Grade,
          as: "grade",
          attributes: ["grade_name"],
        },
      ],
    });

    if (!section) {
      throw new Error("Section not found or unauthorized");
    }

    return {
      ...section.toJSON(),
      grade_name: section.grade ? section.grade.grade_name : null,
    };
  }

  async updateSection(sectionId, data, tenantId) {
    const section = await Section.findOne({
      where: { section_id: sectionId, tenant_id: tenantId },
    });

    if (!section) throw new Error("Section not found or unauthorized");

    // Check for duplicate section name within the same grade (only if name is changing)
    if (data.section_name && data.section_name !== section.section_name) {
      const duplicate = await Section.findOne({
        where: {
          grade_id: section.grade_id, // Keep the existing grade_id
          section_name: data.section_name,
          tenant_id: tenantId,
        },
      });

      if (duplicate) {
        throw new Error(
          `Section with the name '${data.section_name}' already exists for this grade.`
        );
      }
    }

    // Proceed to update the section
    await section.update(data);

    // Fetch updated section with grade details
    const updatedSection = await Section.findOne({
      where: { section_id: sectionId },
      include: [
        {
          model: Grade,
          as: "grade",
          attributes: ["grade_name"],
        },
      ],
    });

    return {
      ...updatedSection.toJSON(),
      grade_name: updatedSection.grade ? updatedSection.grade.grade_name : null,
    };
  }

  async deleteSection(sectionId, tenantId) {
    const section = await Section.findOne({
      where: { section_id: sectionId, tenant_id: tenantId },
    });

    if (!section) throw new Error("Section not found or unauthorized");

    return await section.destroy();
  }
}

export default new SectionsService();
