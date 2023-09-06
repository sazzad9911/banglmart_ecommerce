import { StatusCodes } from "http-status-codes";
import multer from "multer";
import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadFiles = upload.array("images", 10); // limit to 10 images

export const uploadImages = (req, res, next) => {
  uploadFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        // Too many images exceeding the allowed limit
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Too many images exceeding the allowed limit" });
      }
    } else if (err) {
      return res
        .status(StatusCodes.EXPECTATION_FAILED)
        .json({ message: err.message });
    }
    next();
  });
};

export const resizeImages = async (req, res, next) => {
  if (!req.files) return next();

  req.body.images = [];
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.buffer)
        .resize({ width: 350, height: 400 })
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(path.join(__dirname, `../upload/${file.originalname}`));
      req.body.images.push(file.originalname);
    })
  );

  next();
};
export const getResult = async (req, res) => {
  if (req.body.images.length <= 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `You must select at least 1 image.` });
  }
  let img = [];

  req.body.images.map((image) => {
    img.push(`/upload/${image}`);
  });
  return res.status(StatusCodes.OK).json({ images: img });
};
