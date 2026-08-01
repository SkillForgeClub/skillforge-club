import { Router } from "express";
import { getOverview, getAssignments, completeAssignment, getProgress, getProfile, updateProfile, changePassword } from "../controllers/studentController.js";
import { protect, studentOnly } from "../middleware/auth.js";
import { validateChangePassword } from "../middleware/validation.js";

const router = Router();
router.use(protect, studentOnly);
router.get("/overview", getOverview);
router.get("/assignments", getAssignments);
router.patch("/assignments/:id", completeAssignment);
router.get("/progress", getProgress);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.put("/change-password", validateChangePassword, changePassword);
export default router;
