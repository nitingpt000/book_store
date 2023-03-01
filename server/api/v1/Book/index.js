import express from "express";
import BookController from "./book.controller";
import { Book } from "../endpoints";

const router = express.Router();

router.get(Book.getAll, BookController.getAll);
router.get(Book.get, BookController.get);
router.post(Book.create, BookController.create);
router.put(Book.update, BookController.update);

export default router;
