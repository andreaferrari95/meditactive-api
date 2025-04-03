import { body } from "express-validator";

const validateGoalInterval = [
  body("user_id")
    .isInt({ min: 1 })
    .withMessage("user_id deve essere un intero valido."),
  body("start_date")
    .isISO8601()
    .withMessage("start_date deve essere una data valida."),
  body("end_date")
    .isISO8601()
    .withMessage("end_date deve essere una data valida."),
];

export default validateGoalInterval;
