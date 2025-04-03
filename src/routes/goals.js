import express from "express";
const router = express.Router();

import goalController from "../controllers/goalController.js";
import validateGoal from "../middleware/goalValidation.js";
import handleValidation from "../middleware/handleValidation.js";
import verifyToken from "../middleware/authMiddleware.js";

router.get("/", goalController.getAllGoals);
router.get("/:id", goalController.getGoalById);
router.post(
  "/",
  verifyToken,
  validateGoal,
  handleValidation,
  goalController.createGoal
);

router.patch(
  "/:id",
  verifyToken,
  validateGoal,
  handleValidation,
  goalController.updateGoal
);

router.delete("/:id", verifyToken, goalController.deleteGoal);

export default router;
