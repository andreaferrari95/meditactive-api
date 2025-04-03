import express from "express";
const router = express.Router();

import goalController from "../controllers/goalController.js";
import validateGoal from "../middleware/goalValidation.js";
import handleValidation from "../middleware/handleValidation.js";

router.get("/", goalController.getAllGoals);
router.get("/:id", goalController.getGoalById);
router.post("/", validateGoal, handleValidation, goalController.createGoal);
router.patch("/:id", validateGoal, handleValidation, goalController.updateGoal);
router.delete("/:id", goalController.deleteGoal);

export default router;
