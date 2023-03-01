import express from "express";
import order from "./Order";
import user from "./User";
import book from "./Book";
import { Order, User,Book } from "./endpoints";
const router = express.Router();

router.use(Order.prefix, order);
router.use(User.prefix, user);
router.use(Book.prefix,book);

export default router;
