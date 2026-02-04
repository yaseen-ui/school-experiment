import express from "express";
import SubjectsController from "./subjects.controller.js";
import authenticate from "../../middlewares/authenticate.js";
import authenticateTenant from "../../middlewares/authenticateTenant.js";

const router = express.Router();

// Apply middlewares to all routes in this router
router.use(authenticate);
router.use(authenticateTenant);

router.post("/", SubjectsController.createSubject);
router.get("/", SubjectsController.getSubjects);
router.put("/:id", SubjectsController.updateSubject);
router.get("/:id", SubjectsController.getSubjectById);
router.delete("/:id", SubjectsController.deleteSubject);
router.get("/course/:courseId", SubjectsController.getSubjectsByCourse);

export default router;
