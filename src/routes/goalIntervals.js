import express from "express";
const router = express.Router();

import goalIntervalController from "../controllers/goalIntervalController.js";
import intervalGoalController from "../controllers/intervalGoalController.js";
import validateGoalInterval from "../middleware/goalIntervalValidation.js";
import handleValidation from "../middleware/handleValidation.js";

router.post(
  "/",
  validateGoalInterval,
  handleValidation,
  goalIntervalController.createInterval
);

router.get("/", goalIntervalController.getAllIntervals);
router.get("/:id", goalIntervalController.getIntervalById);

router.patch(
  "/:id",
  validateGoalInterval,
  handleValidation,
  goalIntervalController.updateInterval
);

router.delete("/:id", goalIntervalController.deleteInterval);

router.post("/:id/goals", intervalGoalController.addGoalToInterval);
router.get("/:id/goals", intervalGoalController.getGoalsByInterval);

export default router;
