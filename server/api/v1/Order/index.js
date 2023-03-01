import express from "express";
import OrderController from "./order.controller";
import { Order } from "../endpoints";

const router = express.Router();

router.get(Order.getAll, OrderController.getAll);
router.get(Order.get, OrderController.get);
router.post(Order.create, OrderController.create);

export default router;
