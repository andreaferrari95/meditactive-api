import { body } from "express-validator";

const validateUser = [
  body("name").notEmpty().withMessage("Il nome è obbligatorio."),

  body("surname").notEmpty().withMessage("Il cognome è obbligatorio."),

  body("email").isEmail().withMessage("Email non valida.").normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("La password deve contenere almeno 6 caratteri."),
];

export default validateUser;
