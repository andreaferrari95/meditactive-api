import { body } from "express-validator";

const validateGoal = [
  body("title").notEmpty().withMessage("Il titolo è obbligatorio."),

  body("type")
    .notEmpty()
    .withMessage("Il tipo è obbligatorio.")
    .isIn(["daily", "monthly", "yearly"])
    .withMessage("Tipo non valido. Deve essere daily, monthly o yearly."),

  body("description")
    .optional()
    .isLength({ max: 255 })
    .withMessage("La descrizione non può superare i 255 caratteri."),
];

export default validateGoal;
