import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Necessario per usare __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads")); // oppure "uploads/" se sei sicuro del path
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = `user_${req.params.id}${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Solo JPEG e PNG sono permessi."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // max 2MB
});

export default upload;
