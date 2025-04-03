const express = require("express");
const router = express.Router();
const goalIntervalController = require("../controllers/goalIntervalController");
const intervalGoalController = require("../controllers/intervalGoalController");

router.post("/", goalIntervalController.createInterval);
router.get("/", goalIntervalController.getAllIntervals);
router.get("/:id", goalIntervalController.getIntervalById);
router.patch("/:id", goalIntervalController.updateInterval);
router.delete("/:id", goalIntervalController.deleteInterval);

router.post("/:id/goals", intervalGoalController.addGoalToInterval);
router.get("/:id/goals", intervalGoalController.getGoalsByInterval);

module.exports = router;
