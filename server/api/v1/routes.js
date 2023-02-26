import express from "express";
import order from "./Order";
import user from "./User";
import { Order, User } from "./endpoints";
const router = express.Router();

router.use(Order.prefix, order);
router.use(User.prefix, user);

export default router;
