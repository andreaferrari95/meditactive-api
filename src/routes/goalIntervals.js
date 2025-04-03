import express from "express";
const router = express.Router();

import goalIntervalController from "../controllers/goalIntervalController.js";
import intervalGoalController from "../controllers/intervalGoalController.js";
import validateGoalInterval from "../middleware/goalIntervalValidation.js";
import handleValidation from "../middleware/handleValidation.js";
import verifyToken from "../middleware/authMiddleware.js";

router.post(
  "/",
  verifyToken,
  validateGoalInterval,
  handleValidation,
  goalIntervalController.createInterval
);

router.get("/", goalIntervalController.getAllIntervals);
router.get("/:id", goalIntervalController.getIntervalById);

router.patch(
  "/:id",
  verifyToken,
  validateGoalInterval,
  handleValidation,
  goalIntervalController.updateInterval
);

router.delete("/:id", verifyToken, goalIntervalController.deleteInterval);

router.post(
  "/:id/goals",
  verifyToken,
  intervalGoalController.addGoalToInterval
);

router.get("/:id/goals", intervalGoalController.getGoalsByInterval);

export default router;
