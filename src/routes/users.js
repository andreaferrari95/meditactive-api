import express from "express";
const router = express.Router();

import userController from "../controllers/userController.js";
import upload from "../middleware/upload.js";
import userModel from "../models/userModel.js";
import validateUser from "../middleware/userValidation.js";
import handleValidation from "../middleware/handleValidation.js";
import verifyToken from "../middleware/authMiddleware.js";

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.patch("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, userController.deleteUser);
router.post("/", validateUser, handleValidation, userController.createUser);

router.post("/:id/avatar", upload.single("avatar"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Nessun file caricato." });
  }

  const filePath = `/uploads/${req.file.filename}`;

  try {
    await userModel.updateAvatarUrl(req.params.id, filePath);
    res.status(200).json({
      message: "Avatar caricato e salvato.",
      file: filePath,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore nel salvataggio dell'avatar." });
  }
});

export default router;
