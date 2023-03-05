import express from "express";
import BookController from "./book.controller";
import { Book } from "../endpoints";
import multer from "multer";
const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      const imageName = `${Date.now()}-${file.originalname}`;
      cb(null, imageName);
    }
  });
  
const upload = multer({ storage });
router.get(Book.getAll, BookController.getAll);
router.get(Book.get, BookController.get);
router.post(Book.create,upload.single('image'), BookController.create);
router.put(Book.update, BookController.update);

export default router;
