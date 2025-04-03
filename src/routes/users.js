const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middleware/upload");
const userModel = require("../models/userModel");

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

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

module.exports = router;
