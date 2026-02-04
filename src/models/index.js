import { sequelize } from "../utils/database.js";
import { Sequelize } from "sequelize";

// Import models manually
import GradeModel from "./grades.model.js";
import CourseModel from "./courses.model.js";
import SectionModel from "./sections.model.js";
import SubjectModel from "./subjects.model.js";
import StudentModel from "./students.model.js";
import UserModel from "./users.model.js";
import RoleModel from "./roles.model.js";
import UploadModel from "./uploads.model.js";
import TokenBlacklistModel from "./token_black_list.model.js";
import InventoryCategoryModel from "./inventory_category.model.js";
import InventoryItemModel from "./inventory_item.model.js";
import StockAdjustmentModel from "./stock_adjustment.model.js";
import TenantModel from "./tenant.model.js";

// Initialize models
const models = {
  Grade: GradeModel(sequelize),
  Course: CourseModel(sequelize),
  Section: SectionModel(sequelize),
  Subject: SubjectModel(sequelize),
  Student: StudentModel(sequelize),
  User: UserModel(sequelize),
  Role: RoleModel(sequelize),
  Upload: UploadModel(sequelize),
  TokenBlacklist: TokenBlacklistModel(sequelize),
  InventoryCategory: InventoryCategoryModel(sequelize),
  InventoryItem: InventoryItemModel(sequelize),
  StockAdjustment: StockAdjustmentModel(sequelize),
  Tenant: TenantModel(sequelize),
};

// Call `.associate(models)` to establish relationships dynamically
Object.keys(models).forEach((modelName) => {
  if (models[modelName]?.associate) {
    models[modelName].associate(models);
  }
});

// Attach Sequelize instance
models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
export const {
  Grade,
  Course,
  Section,
  Subject,
  SectionSubject,
  Student,
  User,
  Role,
  Upload,
  TokenBlacklist,
  InventoryCategory,
  InventoryItem,
  StockAdjustment,
  Tenant,
} = models;
